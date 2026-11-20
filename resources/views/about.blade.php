@extends('layouts.app')

@section('title', 'About Me — ' . $p['pendek'])

@section('content')
<div class="section-header-banner">
    <h2 class="section-title">ABOUT ME</h2>
</div>

<p class="lead-statement">
    <span class="light">I'm </span><span class="bold">{{ $p['nama'] }}</span><span class="light">, {{ $p['roles'] }}</span>
</p>

<p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 24px; line-height: 1.6;">
    {{ $p['tentang'] }}
</p>

<div class="about-grid-content">
    <!-- 2x2 Dark Stat Matrix -->
    <div class="stat-matrix-2x2">
        @foreach($p['stats'] as $s)
        <div class="stat-cell">
            <div class="stat-number">{{ $s['angka'] }}</div>
            <div class="stat-label">{{ $s['label'] }}</div>
        </div>
        @endforeach
    </div>

    <!-- What I Do! -->
    <div class="services-col">
        <h4>What I Do!</h4>
        <div class="service-row">
            <div class="service-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
            </div>
            <div class="service-info">
                <h5>Web Application Development</h5>
                <p>Membangun sistem web terstruktur dan integrasi database relasional.</p>
            </div>
        </div>
        <div class="service-row">
            <div class="service-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <div class="service-info">
                <h5>System Analysis &amp; Design</h5>
                <p>Analisis kebutuhan sistem, pemodelan proses bisnis (UML, Use Case, Flowchart), dan perancangan ERD.</p>
            </div>
        </div>
        <div class="service-row">
            <div class="service-icon-box">
                <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="0" ry="0"/></svg>
            </div>
            <div class="service-info">
                <h5>Videografi &amp; Editing</h5>
                <p>Produksi video dokumentasi kegiatan formal, shooting lapangan, dan editing pascaproduksi.</p>
            </div>
        </div>
    </div>
</div>
@endsection
