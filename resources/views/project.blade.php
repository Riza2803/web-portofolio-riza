@extends('layouts.app')

@section('title', 'Portfolio — ' . $p['pendek'])

@section('content')
<div class="section-header-banner">
    <h2 class="section-title">PORTFOLIO</h2>
</div>

<div class="portfolio-filters">
    <button class="filter-btn active" onclick="filterProjects('all', this)">ALL</button>
    <button class="filter-btn" onclick="filterProjects('mobile', this)">MOBILE APPS</button>
    <button class="filter-btn" onclick="filterProjects('academic', this)">ACADEMIC</button>
    <button class="filter-btn" onclick="filterProjects('system', this)">SYSTEM DESIGN</button>
    <button class="filter-btn" onclick="filterProjects('video', this)">VIDEOGRAFI</button>
</div>

<div class="portfolio-grid">
    @foreach($p['proyek'] as $pr)
    @php
        $catSlug = match(strtoupper($pr['kategori'])) {
            'MOBILE APP' => 'mobile',
            'ACADEMIC PROJECT' => 'academic',
            'SYSTEM DESIGN' => 'system',
            'VIDEOGRAFI' => 'video',
            default => 'other'
        };
        $isMobile = $catSlug === 'mobile';
        $bgThumb = str_contains($pr['gambar'], 'myschedule') ? '#F7F1E5' : ($isMobile ? '#000000' : '#222222');
    @endphp
    <div class="project-card" data-category="{{ $catSlug }}">
        <div class="project-thumb" style="background: {{ $bgThumb }};">
            <img src="{{ asset($pr['gambar']) }}" alt="{{ $pr['judul'] }}"
                 @if($isMobile) style="object-fit: contain; padding: 12px;" @endif>
        </div>
        <div class="project-body">
            <div class="project-cat">{{ $pr['kategori'] }}</div>
            <div class="project-title">{{ $pr['judul'] }}</div>
            <p class="project-desc">{{ $pr['deskripsi'] }}</p>
            <div class="project-footer">
                <div>
                    @foreach($pr['tags'] as $t)
                    <span class="tag-pill">{{ $t }}</span>
                    @endforeach
                </div>
                <a class="project-link" href="{{ $pr['url'] }}" target="_blank">{{ $pr['label'] }}</a>
            </div>
        </div>
    </div>
    @endforeach
</div>
@endsection
