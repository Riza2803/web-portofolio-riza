<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - {{ $p['pendek'] }}</title>
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
    <main class="kontak">
        <h2>Hubungi Saya</h2>
        <p>Untuk kolaborasi atau kebutuhan proyek, hubungi saya lewat sini.</p>

        @foreach($p['kontak'] as $k)
        <div class="kontak-item"><div class="ikon"><img src="{{ asset($k['ikon']) }}" alt="Ikon {{ $k['label'] }}"></div><div><b>{{ $k['label'] }}</b><br><a href="{{ $k['url'] }}">{{ $k['tampil'] }}</a></div></div>
        @endforeach
    </main>
</body>
</html>