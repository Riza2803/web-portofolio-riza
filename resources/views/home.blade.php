@extends('layouts.app')

@section('title', 'Home — ' . $p['pendek'])

@section('content')
<div class="hero-view-container">
    <div class="hero-left">
        <div class="hero-greeting">HI THERE!</div>
        <h1 class="hero-title">
            I'M <span class="name-outline">{{ $p['pendek'] }}</span>
        </h1>
        <div class="role-strip">{{ $p['roles'] }}</div>
        <p class="hero-desc">
            {{ $p['tentang'] }}
        </p>
        <div>
            <a class="btn-capsule" href="{{ url('/about') }}">MORE ABOUT ME ↗</a>
        </div>
    </div>
    <div class="hero-right">
        <img src="{{ asset($p['foto']) }}" alt="Foto {{ $p['nama'] }}">
    </div>
</div>
@endsection
