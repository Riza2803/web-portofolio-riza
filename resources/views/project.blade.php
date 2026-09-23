<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project - {{ $p['pendek'] }}</title>
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
    <main class="proj">
        <h2>Proyek Yang di kerjakan</h2>

        <div class="grid">
            @foreach($p['proyek'] as $pr)
            <div class="kartu">
                <div class="thumb"><img src="{{ asset($pr['gambar']) }}" alt="{{ $pr['judul'] }}"></div>
                <div class="kategori">{{ $pr['kategori'] }}</div>
                <b>{{ $pr['judul'] }}</b>
                <p>{{ $pr['deskripsi'] }}</p>
                <div>@foreach($pr['tags'] as $t)<span class="tag">{{ $t }}</span>@endforeach</div>
                <p><a href="{{ $pr['url'] }}">{{ $pr['label'] }}</a></p>
            </div>
            @endforeach
        </div>
    </main>
</body>
</html>