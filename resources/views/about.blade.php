<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About - {{ $p['pendek'] }}</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
     <header>
        <nav><a href="{{ url('/') }}">Home</a> 
        <a href="{{ url('/about') }}">About</a> 
        <a href="{{ url('/experience') }}">Experience</a> 
        <a href="{{ url('/project') }}">Projects</a> 
        <a href="{{ url('/contact') }}">Contact</a></nav>
    </header>

    <main class="about">
        <section>
            <div>
                <h2>Tentang Saya</h2>

                <p>{{ $p['tentang'] }}</p>

                <div class="stats">
                    @foreach($p['stats'] as $s)
                    <div><b>{{ $s['angka'] }}</b><span>{{ $s['label'] }}</span></div>
                    @endforeach
                </div>
            </div>

            <img src="{{ asset($p['foto_about']) }}" alt="Foto {{ $p['nama'] }}">
        </section>
    </main>
</body>
</html>