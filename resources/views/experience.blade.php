<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Experience - {{ $p['pendek'] }}</title>
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
    <main class="exp">
        <h2>Pengalaman &amp; Kontribusi</h2>

        <div class="timeline">
            @foreach($p['pengalaman'] as $e)
            <div class="item">
                <div class="periode">{{ $e['periode'] }}</div>
                <div class="kartu">
                    <b>{{ $e['jabatan'] }}</b>
                    <div class="org">{{ $e['org'] }}</div>
                    <ul>
                        @foreach($e['detail'] as $d)
                        <li>{{ $d }}</li>
                        @endforeach
                    </ul>
                </div>
            </div>
            @endforeach
        </div>
    </main>
</body>
</html>