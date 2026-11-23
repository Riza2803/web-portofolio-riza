/**
 * Portfolio Interactive Engine (Refined & Bug-Free)
 * Features:
 * - Buttery-smooth page transitions (native View Transitions API with robust CSS fallback)
 * - Safe event delegation for project detail modal (no duplicate listeners)
 * - Smooth category filter animation without breaking card hover effects
 * - Interactive copy-to-clipboard toast notification
 * - Smart hover prefetching
 */

(function () {
    'use strict';

    const pageCache = new Map();
    let isNavigating = false;

    /**
     * Normalize URL path to standard route identifier
     */
    function normalizePath(urlStr) {
        try {
            const url = new URL(urlStr, window.location.href);
            let path = url.pathname;
            if (path.endsWith('/') && path.length > 1) path = path.slice(0, -1);
            if (path.endsWith('/index.html')) path = path.replace('/index.html', '') || '/';
            if (path.endsWith('.html')) path = path.slice(0, -5);
            return path || '/';
        } catch (e) {
            return urlStr;
        }
    }

    /**
     * Check if link is internal navigation
     */
    function isInternalLink(a) {
        if (!a || !a.href) return false;
        if (a.target && a.target !== '_self') return false;
        if (a.hasAttribute('download')) return false;
        try {
            const u = new URL(a.href, window.location.href);
            return u.origin === window.location.origin;
        } catch (e) {
            return false;
        }
    }

    /**
     * Prefetch page HTML on link hover
     */
    function prefetchPage(url) {
        if (pageCache.has(url)) return;
        fetch(url, { credentials: 'same-origin' })
            .then(res => {
                if (res.ok) return res.text();
            })
            .then(html => {
                if (html) pageCache.set(url, html);
            })
            .catch(() => {});
    }

    /**
     * Update active nav link classes without re-rendering sidebar
     */
    function updateActiveNav(urlStr) {
        const targetPath = normalizePath(urlStr);

        document.querySelectorAll('.side-nav .nav-item').forEach(item => {
            const itemPath = normalizePath(item.href);
            const isActive = (itemPath === targetPath) ||
                (targetPath === '/' && (itemPath === '/' || itemPath === 'index')) ||
                (targetPath.includes('about') && itemPath.includes('about')) ||
                (targetPath.includes('experience') && itemPath.includes('experience')) ||
                (targetPath.includes('project') && itemPath.includes('project')) ||
                (targetPath.includes('contact') && itemPath.includes('contact'));

            if (isActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        document.querySelectorAll('.quick-dock a').forEach(dockLink => {
            const dockPath = normalizePath(dockLink.href);
            const isActive = (dockPath === targetPath) ||
                (targetPath === '/' && (dockPath === '/' || dockPath === 'index')) ||
                (targetPath.includes('about') && dockPath.includes('about')) ||
                (targetPath.includes('experience') && dockPath.includes('experience')) ||
                (targetPath.includes('project') && dockPath.includes('project')) ||
                (targetPath.includes('contact') && dockPath.includes('contact'));

            if (isActive) {
                dockLink.classList.add('active');
            } else {
                dockLink.classList.remove('active');
            }
        });
    }

    /**
     * Apply new page DOM content cleanly
     */
    function applyNewPageDOM(doc, url) {
        document.title = doc.title;

        const currentCanvas = document.querySelector('.canvas-container');
        const targetCanvas = doc.querySelector('.canvas-container');

        // Case 1: Inner page to Inner page (sidebar stays locked and seamless)
        if (currentCanvas && targetCanvas) {
            currentCanvas.innerHTML = targetCanvas.innerHTML;
            updateActiveNav(url);
            return;
        }

        // Case 2: Between Home and Inner Page
        const currentHero = document.querySelector('.hero-view-container');
        const targetHero = doc.querySelector('.hero-view-container');
        const currentShell = document.querySelector('.app-shell');
        const targetShell = doc.querySelector('.app-shell');

        if (targetHero && currentShell) {
            currentShell.replaceWith(targetHero);
        } else if (targetShell && currentHero) {
            currentHero.replaceWith(targetShell);
        } else {
            document.body.innerHTML = doc.body.innerHTML;
        }

        updateActiveNav(url);
    }

    /**
     * Smooth page transition engine
     */
    async function navigateTo(url, push = true) {
        if (isNavigating) return;
        isNavigating = true;

        try {
            let html = pageCache.get(url);
            if (!html) {
                const res = await fetch(url);
                if (!res.ok) throw new Error('Fetch failed');
                html = await res.text();
                pageCache.set(url, html);
            }

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Native View Transitions API (Modern Browsers)
            if (document.startViewTransition) {
                const transition = document.startViewTransition(() => {
                    applyNewPageDOM(doc, url);
                });
                await transition.finished;
            } else {
                // Fallback Smooth Fade
                const container = document.querySelector('.canvas-container') ||
                                  document.querySelector('.hero-view-container') ||
                                  document.querySelector('.app-shell');

                if (container) {
                    container.classList.add('page-transitioning-out');
                    await new Promise(r => setTimeout(r, 160));
                }

                applyNewPageDOM(doc, url);

                const newContainer = document.querySelector('.canvas-container') ||
                                     document.querySelector('.hero-view-container') ||
                                     document.querySelector('.app-shell');
                if (newContainer) {
                    newContainer.classList.add('page-transitioning-in');
                    void newContainer.offsetWidth; // Force synchronous reflow
                    requestAnimationFrame(() => {
                        newContainer.classList.remove('page-transitioning-in');
                    });
                }
            }

            if (push) {
                const cleanDisplayUrl = url.replace(/\.html(\?|#|$)/, '$1');
                history.pushState({ url: cleanDisplayUrl }, '', cleanDisplayUrl);
            }
            window.scrollTo({ top: 0, behavior: 'instant' });

        } catch (err) {
            window.location.href = url;
        } finally {
            isNavigating = false;
        }
    }

    /**
     * Portfolio Category Filtering (Smooth, class-based, no hover disruption)
     */
    window.filterProjects = function (cat, btn) {
        document.querySelectorAll('.portfolio-filters .filter-btn').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');

        const cards = document.querySelectorAll('.portfolio-grid .project-card');
        cards.forEach(card => {
            const match = cat === 'all' || card.getAttribute('data-category') === cat;

            if (card._filterTimer) clearTimeout(card._filterTimer);

            if (match) {
                card.classList.remove('is-filtered-out', 'is-filtering-out');
                card.classList.add('is-filtering-in');
                card.style.display = 'flex';
                card._filterTimer = setTimeout(() => {
                    card.classList.remove('is-filtering-in');
                }, 260);
            } else {
                card.classList.remove('is-filtering-in');
                card.classList.add('is-filtering-out');
                card._filterTimer = setTimeout(() => {
                    card.classList.remove('is-filtering-out');
                    card.classList.add('is-filtered-out');
                    card.style.display = 'none';
                }, 180);
            }
        });
    };

    /**
     * Get or Create Project Modal (Singleton)
     */
    function getOrCreateModal() {
        let modal = document.getElementById('project-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'project-modal';
            modal.innerHTML = `
                <div class="modal-backdrop"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="modal-category">CATEGORY</span>
                        <button class="modal-close-btn" aria-label="Tutup">✕</button>
                    </div>
                    <div class="modal-image-wrap">
                        <img class="modal-image" src="" alt="Preview Proyek">
                    </div>
                    <div class="modal-body">
                        <h3 class="modal-title">Judul Proyek</h3>
                        <p class="modal-desc">Deskripsi lengkap proyek.</p>
                        <div class="modal-tags"></div>
                        <div class="modal-footer">
                            <a class="modal-link-btn" href="#" target="_blank" rel="noopener">Buka Tautan ↗</a>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            const closeBtn = modal.querySelector('.modal-close-btn');
            const backdrop = modal.querySelector('.modal-backdrop');
            closeBtn.addEventListener('click', closeModal);
            backdrop.addEventListener('click', closeModal);
        }
        return modal;
    }

    function openModal(card) {
        const modal = getOrCreateModal();
        const mCat = modal.querySelector('.modal-category');
        const mTitle = modal.querySelector('.modal-title');
        const mImg = modal.querySelector('.modal-image');
        const mDesc = modal.querySelector('.modal-desc');
        const mTags = modal.querySelector('.modal-tags');
        const mLink = modal.querySelector('.modal-link-btn');

        const title = card.getAttribute('data-title') || card.querySelector('.project-title')?.textContent || '';
        const cat = card.getAttribute('data-cat') || card.querySelector('.project-cat')?.textContent || '';
        const desc = card.getAttribute('data-desc') || card.querySelector('.project-desc')?.textContent || '';
        const imgSrc = card.querySelector('.project-thumb img')?.getAttribute('src') || '';
        const url = card.querySelector('.project-link')?.getAttribute('href') || '#';
        const label = card.querySelector('.project-link')?.textContent || 'Buka Tautan ↗';
        const tags = Array.from(card.querySelectorAll('.tag-pill')).map(p => p.textContent);

        if (mTitle) mTitle.textContent = title;
        if (mCat) mCat.textContent = cat;
        if (mDesc) mDesc.textContent = desc;
        if (mImg) {
            mImg.src = imgSrc;
            mImg.alt = title;
        }
        if (mLink) {
            mLink.href = url;
            mLink.textContent = label;
        }
        if (mTags) {
            mTags.innerHTML = tags.map(t => `<span class="tag-pill">${t}</span>`).join('');
        }

        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    }

    /**
     * Copy text helper with toast
     */
    function copyText(text, message) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => showToast(message)).catch(() => showToast(message));
        } else {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast(message);
        }
    }

    function showToast(message) {
        let toast = document.getElementById('app-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'app-toast';
            toast.className = 'app-toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<span class="toast-icon">✓</span> ${message}`;
        toast.classList.add('is-visible');

        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            toast.classList.remove('is-visible');
        }, 2500);
    }

    /**
     * Setup Global Event Delegations (runs ONCE on document)
     */
    function setupGlobalListeners() {
        // 1. Link Hover Prefetch
        document.addEventListener('mouseover', (e) => {
            const a = e.target.closest('a');
            if (a && isInternalLink(a)) {
                prefetchPage(a.href);
            }
        });

        // 2. Client-side Navigation Interception
        document.addEventListener('click', (e) => {
            const a = e.target.closest('a');
            if (!a || !isInternalLink(a) || e.metaKey || e.ctrlKey || e.shiftKey || a.hasAttribute('download')) {
                return;
            }

            const currentNorm = normalizePath(window.location.href);
            const targetNorm = normalizePath(a.href);

            if (currentNorm === targetNorm && !a.hash) {
                e.preventDefault();
                return;
            }

            e.preventDefault();
            navigateTo(a.href);
        });

        // 3. Project Card Modal Click Delegation
        document.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (!card) return;
            // Let direct external link clicks pass through
            if (e.target.closest('.project-link')) return;
            openModal(card);
        });

        // 4. Contact Copy Click Delegation
        document.addEventListener('click', (e) => {
            const copyBox = e.target.closest('.contact-item-box[data-copy]');
            if (!copyBox) return;
            if (e.target.tagName === 'A') return; // Allow normal click on mailto/tel if explicitly clicked

            const type = copyBox.getAttribute('data-copy');
            if (type === 'email') {
                copyText('rizaadityafirmansyah2@gmail.com', 'Email berhasil disalin ke clipboard!');
            } else if (type === 'wa') {
                copyText('+6285601546289', 'Nomor WhatsApp berhasil disalin!');
            }
        });

        // 5. Browser History Popstate
        window.addEventListener('popstate', () => {
            navigateTo(window.location.href, false);
        });

        // 6. Keyboard Escape to close modal
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    // Initialize once on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupGlobalListeners);
    } else {
        setupGlobalListeners();
    }

})();
