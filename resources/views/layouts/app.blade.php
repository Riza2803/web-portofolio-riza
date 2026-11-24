<!DOCTYPE html>
<html lang="id" class="notranslate">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google" content="notranslate">
    <title>@yield('title', $p['pendek']) — {{ $p['roles'] }}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    @stack('styles')
</head>
<body>

    <!-- Floating Right Quick-Jump Dock -->
    <div class="quick-dock">
        <a href="{{ url('/') }}" title="Home">
            <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </a>
        <a href="{{ url('/about') }}" title="About">
            <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        </a>
        <a href="{{ url('/experience') }}" title="Resume">
            <svg viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
        </a>
        <a href="{{ url('/project') }}" title="Portfolio">
            <svg viewBox="0 0 24 24"><path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"/></svg>
        </a>
        <a href="{{ url('/contact') }}" title="Contact">
            <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        </a>
    </div>

    @if(Request::is('/'))
        @yield('content')
    @else
        <div class="app-shell">
            <!-- Left Editorial Sidebar -->
            <aside class="sidebar">
                <div class="avatar-box">
                    <img src="{{ asset($p['foto_about']) }}" alt="Foto {{ $p['nama'] }}">
                </div>
                <nav class="side-nav">
                    <a href="{{ url('/') }}" class="nav-item {{ Request::is('/') ? 'active' : '' }}">HOME</a>
                    <div class="nav-divider"></div>
                    <a href="{{ url('/about') }}" class="nav-item {{ Request::is('about') ? 'active' : '' }}">ABOUT ME</a>
                    <div class="nav-divider"></div>
                    <a href="{{ url('/experience') }}" class="nav-item {{ Request::is('experience') ? 'active' : '' }}">RESUME</a>
                    <div class="nav-divider"></div>
                    <a href="{{ url('/project') }}" class="nav-item {{ Request::is('project') ? 'active' : '' }}">PORTFOLIO</a>
                    <div class="nav-divider"></div>
                    <a href="{{ url('/contact') }}" class="nav-item {{ Request::is('contact') ? 'active' : '' }}">CONTACT</a>
                </nav>
            </aside>

            <!-- Main Canvas -->
            <main class="main-canvas">
                <div class="canvas-container">
                    @yield('content')
                </div>
            </main>
        </div>
    @endif

    @stack('scripts')
    <script defer src="{{ asset('js/vendor/gsap.min.js') }}"></script>
    <script defer src="{{ asset('js/vendor/ScrollTrigger.min.js') }}"></script>
    <script defer src="{{ asset('js/vendor/Flip.min.js') }}"></script>
    <script defer src="{{ asset('js/vendor/motion.min.js') }}"></script>
    <script defer src="{{ asset('js/vendor/lenis.min.js') }}"></script>
    <script defer src="{{ asset('js/app.js') }}"></script>
</body>
</html>
