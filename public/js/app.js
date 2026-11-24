/**
 * Portfolio Interactive Engine (GSAP + Motion + Lenis)
 * - Lenis: inertial smooth scroll synced to GSAP ticker & modal scroll lock
 * - GSAP + ScrollTrigger + Flip: page exit/entrance choreography, stat counters, & filter layout reflow
 * - Motion (motion.dev): spring-physics modal, toast, & tactile hover/press micro-interactions
 */

(function () {
    'use strict';

    const pageCache = new Map();
    let isNavigating = false;
    let isFiltering = false;
    let isEntering = false;
    let lenis = null;
    let pageCtx = null;

    const prefersReducedMotion = () =>
        Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const hasGSAP = () => typeof window.gsap !== 'undefined';
    const hasScrollTrigger = () => typeof window.ScrollTrigger !== 'undefined';
    const hasFlip = () => typeof window.Flip !== 'undefined';
    const hasMotion = () =>
        typeof window.Motion !== 'undefined' && typeof window.Motion.animate === 'function';
    const hasLenis = () => typeof window.Lenis !== 'undefined';

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

    function prefetchPage(url) {
        if (pageCache.has(url)) return;
        fetch(url, { credentials: 'same-origin' })
            .then((res) => (res.ok ? res.text() : null))
            .then((html) => {
                if (html) pageCache.set(url, html);
            })
            .catch(() => {});
    }

    /**
     * Initialize GSAP plugins, Motion flag, & Lenis smooth scroll
     */
    function initAnimationEngines() {
        if (hasGSAP()) {
            if (hasScrollTrigger()) window.gsap.registerPlugin(window.ScrollTrigger);
            if (hasFlip()) window.gsap.registerPlugin(window.Flip);
        }

        if (hasMotion() && !prefersReducedMotion()) {
            document.documentElement.classList.add('motion-ready');
        }

        if (hasLenis() && !prefersReducedMotion()) {
            lenis = new window.Lenis({
                lerp: 0.1,
                smoothWheel: true,
                syncTouch: false,
                wheelMultiplier: 1
            });

            if (hasScrollTrigger()) {
                lenis.on('scroll', window.ScrollTrigger.update);
            }

            if (hasGSAP()) {
                window.gsap.ticker.add((time) => {
                    lenis.raf(time * 1000);
                });
                window.gsap.ticker.lagSmoothing(0);
            } else {
                const raf = (time) => {
                    lenis.raf(time);
                    requestAnimationFrame(raf);
                };
                requestAnimationFrame(raf);
            }
        }
    }

    /**
     * Update active nav link classes + Motion spring pop on active dock icon
     */
    function updateActiveNav(urlStr) {
        const targetPath = normalizePath(urlStr);

        const matchesRoute = (itemPath) =>
            itemPath === targetPath ||
            (targetPath === '/' && (itemPath === '/' || itemPath === 'index')) ||
            (targetPath.includes('about') && itemPath.includes('about')) ||
            (targetPath.includes('experience') && itemPath.includes('experience')) ||
            (targetPath.includes('project') && itemPath.includes('project')) ||
            (targetPath.includes('contact') && itemPath.includes('contact'));

        document.querySelectorAll('.side-nav .nav-item').forEach((item) => {
            item.classList.toggle('active', matchesRoute(normalizePath(item.href)));
        });

        document.querySelectorAll('.quick-dock a').forEach((dockLink) => {
            const active = matchesRoute(normalizePath(dockLink.href));
            const wasActive = dockLink.classList.contains('active');
            dockLink.classList.toggle('active', active);
            if (active && !wasActive && hasMotion() && !prefersReducedMotion()) {
                window.Motion.animate(
                    dockLink,
                    { scale: [0.8, 1] },
                    { type: 'spring', stiffness: 460, damping: 24 }
                );
            }
        });
    }

    /**
     * GSAP Page Entrance Choreography & ScrollTrigger Reveals
     */
    function runPageEntrance() {
        if (pageCtx) {
            pageCtx.revert();
            pageCtx = null;
        }

        if (!hasGSAP() || prefersReducedMotion()) {
            isEntering = false;
            return;
        }

        const gsap = window.gsap;

        pageCtx = gsap.context(() => {
            const hero = document.querySelector('.hero-view-container');
            if (hero) {
                const heroItems = gsap.utils.toArray(
                    '.hero-greeting, .hero-title, .role-strip, .hero-desc, .hero-left .btn-capsule'
                );
                if (heroItems.length) {
                    gsap.from(heroItems, {
                        y: 20,
                        opacity: 0,
                        duration: 0.5,
                        stagger: 0.055,
                        ease: 'power3.out',
                        clearProps: 'transform,opacity'
                    });
                }
                const heroImg = hero.querySelector('.hero-right img');
                if (heroImg) {
                    // Keep opacity 1 so LCP image paints immediately; subtle scale settle only
                    gsap.from(heroImg, {
                        scale: 1.045,
                        duration: 0.75,
                        ease: 'power2.out',
                        clearProps: 'transform'
                    });
                }
                return;
            }

            const canvas = document.querySelector('.canvas-container');
            if (!canvas) return;

            const headerEls = gsap.utils.toArray(
                '.section-header-banner, .lead-statement, .canvas-container > p:not(.lead-statement), .portfolio-filters'
            );
            if (headerEls.length) {
                gsap.from(headerEls, {
                    y: 14,
                    opacity: 0,
                    duration: 0.38,
                    stagger: 0.04,
                    ease: 'power3.out',
                    clearProps: 'transform,opacity'
                });
            }

            const items = gsap.utils.toArray(
                '.stat-cell, .service-row, .resume-group-title, .resume-card, .project-card:not(.is-filtered-out), .contact-item-box'
            );
            if (items.length) {
                isEntering = true;
                gsap.from(items, {
                    y: 18,
                    opacity: 0,
                    duration: 0.42,
                    stagger: 0.038,
                    delay: 0.05,
                    ease: 'power3.out',
                    clearProps: 'transform,opacity',
                    onComplete: () => {
                        isEntering = false;
                    }
                });
            }

            // Stat Counter Animation on About View
            document.querySelectorAll('.stat-number').forEach((el) => {
                const raw = (el.textContent || '').trim();
                const match = raw.match(/^(\d+)(.*)$/);
                if (!match) return;
                const target = parseInt(match[1], 10);
                const suffix = match[2] || '';
                const counter = { val: 0 };
                el.textContent = '0' + suffix;
                gsap.to(counter, {
                    val: target,
                    duration: 0.8,
                    delay: 0.08,
                    ease: 'power2.out',
                    snap: { val: 1 },
                    onUpdate: () => {
                        el.textContent = Math.round(counter.val) + suffix;
                    },
                    onComplete: () => {
                        el.textContent = raw;
                    }
                });
            });

            // ScrollTrigger / Motion inView for Sign-Off Banner
            const signOff = document.querySelector('.sign-off-banner');
            if (signOff && hasScrollTrigger()) {
                gsap.from(signOff, {
                    y: 12,
                    opacity: 0,
                    duration: 0.45,
                    ease: 'power2.out',
                    clearProps: 'transform,opacity',
                    scrollTrigger: {
                        trigger: signOff,
                        start: 'top 92%',
                        once: true
                    }
                });
            }
        });
    }

    function applyNewPageDOM(doc, url) {
        document.title = doc.title;

        const currentCanvas = document.querySelector('.canvas-container');
        const targetCanvas = doc.querySelector('.canvas-container');

        if (currentCanvas && targetCanvas) {
            currentCanvas.innerHTML = targetCanvas.innerHTML;
            updateActiveNav(url);
            return;
        }

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
     * Smooth Page Transition Engine (GSAP Exit -> Swap -> Lenis Reset -> GSAP Entrance)
     */
    async function navigateTo(url, push = true) {
        if (isNavigating) return;
        isNavigating = true;

        try {
            closeModal(true);

            let html = pageCache.get(url);
            if (!html) {
                const res = await fetch(url);
                if (!res.ok) throw new Error('Fetch failed');
                html = await res.text();
                pageCache.set(url, html);
            }

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const currentCanvas = document.querySelector('.canvas-container');
            const targetCanvas = doc.querySelector('.canvas-container');
            const outgoing =
                currentCanvas && targetCanvas
                    ? currentCanvas
                    : document.querySelector('.hero-view-container') ||
                      document.querySelector('.app-shell');

            if (hasGSAP() && !prefersReducedMotion() && outgoing) {
                await window.gsap.to(outgoing, {
                    opacity: 0,
                    y: 8,
                    duration: 0.16,
                    ease: 'power2.in'
                });
            } else if (!prefersReducedMotion() && outgoing) {
                outgoing.classList.add('page-transitioning-out');
                await new Promise((r) => setTimeout(r, 150));
            }

            if (pageCtx) {
                pageCtx.revert();
                pageCtx = null;
            }

            applyNewPageDOM(doc, url);

            const refreshedCanvas = document.querySelector('.canvas-container');
            if (hasGSAP() && refreshedCanvas) {
                window.gsap.set(refreshedCanvas, { clearProps: 'transform,opacity' });
            }

            if (push) {
                const cleanDisplayUrl = url.replace(/\.html(\?|#|$)/, '$1');
                history.pushState({ url: cleanDisplayUrl }, '', cleanDisplayUrl);
            }

            if (lenis) {
                lenis.scrollTo(0, { immediate: true });
            } else {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }

            runPageEntrance();

            if (lenis) lenis.resize();
            if (hasScrollTrigger()) window.ScrollTrigger.refresh();
        } catch (err) {
            window.location.href = url;
        } finally {
            isNavigating = false;
        }
    }

    /**
     * Portfolio Category Filtering powered by GSAP Flip
     */
    window.filterProjects = function (cat, btn) {
        document.querySelectorAll('.portfolio-filters .filter-btn').forEach((b) =>
            b.classList.remove('active')
        );
        if (btn) btn.classList.add('active');

        const cards = Array.from(document.querySelectorAll('.portfolio-grid .project-card'));
        if (!cards.length) return;

        if (hasGSAP() && hasFlip() && !prefersReducedMotion()) {
            const gsap = window.gsap;
            const Flip = window.Flip;

            isFiltering = true;
            gsap.killTweensOf(cards);

            cards.forEach((c) => {
                if (!c.classList.contains('is-filtered-out')) {
                    gsap.set(c, { opacity: 1, scale: 1, y: 0 });
                }
            });

            const state = Flip.getState(cards);

            cards.forEach((card) => {
                const match = cat === 'all' || card.getAttribute('data-category') === cat;
                card.classList.toggle('is-filtered-out', !match);
                card.style.display = match ? 'flex' : 'none';
            });

            Flip.from(state, {
                duration: 0.36,
                scale: true,
                ease: 'power2.out',
                stagger: 0.025,
                absoluteOnLeave: true,
                onEnter: (els) =>
                    gsap.fromTo(
                        els,
                        { opacity: 0, scale: 0.92 },
                        { opacity: 1, scale: 1, duration: 0.28, ease: 'power2.out' }
                    ),
                onLeave: (els) =>
                    gsap.to(els, {
                        opacity: 0,
                        scale: 0.92,
                        duration: 0.18,
                        ease: 'power2.in'
                    }),
                onComplete: () => {
                    cards.forEach((c) => {
                        if (!c.classList.contains('is-filtered-out')) {
                            gsap.set(c, { clearProps: 'transform,opacity' });
                        }
                    });
                    isFiltering = false;
                    if (lenis) lenis.resize();
                    if (hasScrollTrigger()) window.ScrollTrigger.refresh();
                }
            });
            return;
        }

        cards.forEach((card) => {
            const match = cat === 'all' || card.getAttribute('data-category') === cat;
            card.classList.toggle('is-filtered-out', !match);
            card.style.display = match ? 'flex' : 'none';
        });
        if (lenis) lenis.resize();
    };

    /**
     * Project Modal powered by Motion Spring Physics + Lenis Scroll Lock
     */
    function getOrCreateModal() {
        let modal = document.getElementById('project-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'project-modal';
            modal.innerHTML = `
                <div class="modal-backdrop"></div>
                <div class="modal-content" data-lenis-prevent>
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

            modal.querySelector('.modal-close-btn').addEventListener('click', () => closeModal());
            modal.querySelector('.modal-backdrop').addEventListener('click', () => closeModal());
        }
        return modal;
    }

    function openModal(card) {
        const modal = getOrCreateModal();
        modal._closing = false;

        const mCat = modal.querySelector('.modal-category');
        const mTitle = modal.querySelector('.modal-title');
        const mImg = modal.querySelector('.modal-image');
        const mDesc = modal.querySelector('.modal-desc');
        const mTags = modal.querySelector('.modal-tags');
        const mLink = modal.querySelector('.modal-link-btn');
        const backdrop = modal.querySelector('.modal-backdrop');
        const content = modal.querySelector('.modal-content');

        const title =
            card.getAttribute('data-title') || card.querySelector('.project-title')?.textContent || '';
        const cat =
            card.getAttribute('data-cat') || card.querySelector('.project-cat')?.textContent || '';
        const desc =
            card.getAttribute('data-desc') || card.querySelector('.project-desc')?.textContent || '';
        const imgSrc = card.querySelector('.project-thumb img')?.getAttribute('src') || '';
        const url = card.querySelector('.project-link')?.getAttribute('href') || '#';
        const label = card.querySelector('.project-link')?.textContent || 'Buka Tautan ↗';
        const tags = Array.from(card.querySelectorAll('.tag-pill')).map((p) => p.textContent);

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
            mTags.innerHTML = tags.map((t) => `<span class="tag-pill">${t}</span>`).join('');
        }

        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        if (lenis) lenis.stop();

        if (hasMotion() && !prefersReducedMotion()) {
            window.Motion.animate(backdrop, { opacity: [0, 1] }, { duration: 0.18, ease: 'easeOut' });
            window.Motion.animate(
                content,
                { opacity: [0, 1], scale: [0.94, 1], y: [16, 0] },
                { type: 'spring', stiffness: 420, damping: 30 }
            );
        }
    }

    async function closeModal(immediate = false) {
        const modal = document.getElementById('project-modal');
        if (!modal || !modal.classList.contains('is-open') || modal._closing) return;

        if (!immediate && hasMotion() && !prefersReducedMotion()) {
            modal._closing = true;
            const backdrop = modal.querySelector('.modal-backdrop');
            const content = modal.querySelector('.modal-content');
            try {
                await Promise.all([
                    Promise.resolve(
                        window.Motion.animate(
                            content,
                            { opacity: 0, scale: 0.96, y: 10 },
                            { duration: 0.14, ease: 'easeIn' }
                        )
                    ),
                    Promise.resolve(
                        window.Motion.animate(backdrop, { opacity: 0 }, { duration: 0.14, ease: 'easeIn' })
                    )
                ]);
            } catch (_) {}
            modal._closing = false;
        }

        modal.classList.remove('is-open');
        document.body.style.overflow = '';
        if (lenis) lenis.start();
    }

    /**
     * Copy to Clipboard with Motion Spring Toast
     */
    function copyText(text, message) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(text)
                .then(() => showToast(message))
                .catch(() => showToast(message));
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

        if (hasMotion() && !prefersReducedMotion()) {
            window.Motion.animate(
                toast,
                { y: [48, 0], opacity: [0, 1] },
                { type: 'spring', stiffness: 440, damping: 28 }
            );
        }

        clearTimeout(toast._timeout);
        toast._timeout = setTimeout(() => {
            if (hasMotion() && !prefersReducedMotion()) {
                Promise.resolve(
                    window.Motion.animate(toast, { y: 48, opacity: 0 }, { duration: 0.18, ease: 'easeIn' })
                ).then(() => toast.classList.remove('is-visible'));
            } else {
                toast.classList.remove('is-visible');
            }
        }, 2500);
    }

    /**
     * Motion Spring Micro-Interactions (Delegated Hover & Tactile Press)
     */
    function setupMotionInteractions() {
        const hoverSelector =
            '.project-card, .resume-card, .contact-item-box, .quick-dock a, .btn-capsule, .modal-link-btn';
        const pressSelector =
            '.btn-capsule, .modal-link-btn, .filter-btn, .quick-dock a, .side-nav .nav-item';

        document.addEventListener('pointerover', (e) => {
            if (!hasMotion() || prefersReducedMotion() || e.pointerType === 'touch') return;
            const el = e.target.closest(hoverSelector);
            if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return;
            if ((isFiltering || isEntering) && el.classList.contains('project-card')) return;

            if (el.matches('.quick-dock a')) {
                window.Motion.animate(el, { scale: 1.2 }, { type: 'spring', stiffness: 450, damping: 22 });
            } else if (el.matches('.btn-capsule, .modal-link-btn')) {
                window.Motion.animate(el, { scale: 1.03, y: -1 }, { type: 'spring', stiffness: 420, damping: 24 });
            } else if (el.matches('.project-card')) {
                window.Motion.animate(el, { y: -4 }, { type: 'spring', stiffness: 380, damping: 26 });
            } else {
                window.Motion.animate(el, { y: -2 }, { type: 'spring', stiffness: 400, damping: 26 });
            }
        });

        document.addEventListener('pointerout', (e) => {
            if (!hasMotion() || prefersReducedMotion() || e.pointerType === 'touch') return;
            const el = e.target.closest(hoverSelector);
            if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return;
            if (isFiltering && el.classList.contains('project-card')) return;

            window.Motion.animate(
                el,
                { y: 0, scale: 1 },
                { type: 'spring', stiffness: 400, damping: 28 }
            );
        });

        document.addEventListener('pointerdown', (e) => {
            if (!hasMotion() || prefersReducedMotion()) return;
            const el = e.target.closest(pressSelector);
            if (!el) return;
            window.Motion.animate(el, { scale: 0.95 }, { type: 'spring', stiffness: 550, damping: 28 });
        });

        const releasePress = (e) => {
            if (!hasMotion() || prefersReducedMotion()) return;
            const el = e.target.closest(pressSelector);
            if (!el) return;
            window.Motion.animate(el, { scale: 1 }, { type: 'spring', stiffness: 450, damping: 24 });
        };

        document.addEventListener('pointerup', releasePress);
        document.addEventListener('pointercancel', releasePress);
    }

    /**
     * Global Event Delegations
     */
    function setupGlobalListeners() {
        document.addEventListener('mouseover', (e) => {
            const a = e.target.closest('a');
            if (a && isInternalLink(a)) {
                prefetchPage(a.href);
            }
        });

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

        document.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (!card) return;
            if (e.target.closest('.project-link')) return;
            openModal(card);
        });

        document.addEventListener('click', (e) => {
            const copyBox = e.target.closest('.contact-item-box[data-copy]');
            if (!copyBox) return;
            if (e.target.tagName === 'A') return;

            const type = copyBox.getAttribute('data-copy');
            if (type === 'email') {
                copyText('rizaadityafirmansyah2@gmail.com', 'Email berhasil disalin ke clipboard!');
            } else if (type === 'wa') {
                copyText('+6285601546289', 'Nomor WhatsApp berhasil disalin!');
            }
        });

        window.addEventListener('popstate', () => {
            navigateTo(window.location.href, false);
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    function boot() {
        initAnimationEngines();
        updateActiveNav(window.location.href);
        setupGlobalListeners();
        setupMotionInteractions();
        runPageEntrance();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
