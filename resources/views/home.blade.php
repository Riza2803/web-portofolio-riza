<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - {{ $p['pendek'] }}</title>
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
    <main>
        <section>
            <div>
                <h4>{{ $p['badge'] }}</h4>
                <h1>Halo, saya <br>
                    <span>{{ $p['pendek'] }}</span></h1>
                <h3>{{ $p['roles'] }}</h3>

                <a class="btnprto" href="{{ url('/project') }}">View Project</a> <a href="{{ url('/contact') }}">Contact Me</a>
            </div>

            <img src="{{ asset($p['foto']) }}" alt="Foto {{ $p['nama'] }}">
        </section>
    </main>
</body>
</html>
