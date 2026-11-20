@extends('layouts.app')

@section('title', 'Contact — ' . $p['pendek'])

@section('content')
<div class="section-header-banner">
    <h2 class="section-title">CONTACT</h2>
</div>

<p class="lead-statement">
    <span class="light">Feel </span><span class="bold">free</span><span class="light"> to get in touch for collaborations.</span>
</p>

<div class="contact-content">
    <div class="contact-grid">
        @foreach($p['kontak'] as $k)
        <div class="contact-item-box">
            <div class="contact-icon-box">
                <img src="{{ asset($k['ikon']) }}" alt="Ikon {{ $k['label'] }}">
            </div>
            <div class="contact-details">
                <h6>{{ $k['label'] }}</h6>
                <a href="{{ $k['url'] }}" target="_blank">{{ $k['tampil'] }}</a>
            </div>
        </div>
        @endforeach
    </div>

    <!-- Footer Sign-Off Banner -->
    <div class="sign-off-banner">
        <span class="sign-off-text">THANKS FOR PATIENCE!</span>
    </div>
</div>
@endsection
