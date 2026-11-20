@extends('layouts.app')

@section('title', 'Resume — ' . $p['pendek'])

@section('content')
<div class="section-header-banner">
    <h2 class="section-title">RESUME</h2>
</div>

<h3 class="resume-group-title">Pengalaman Organisasi &amp; Proyek</h3>
<div class="resume-grid-3">
    @foreach($p['pengalaman'] as $e)
    <div class="resume-card">
        <span class="period-badge">{{ $e['periode'] }}</span>
        <div class="resume-role">{{ $e['jabatan'] }}</div>
        <div class="resume-org">{{ $e['org'] }}</div>
        <div class="resume-desc">
            <ul>
                @foreach($e['detail'] as $d)
                <li>{{ $d }}</li>
                @endforeach
            </ul>
        </div>
    </div>
    @endforeach
</div>

<h3 class="resume-group-title">Pendidikan</h3>
<div class="resume-grid-3">
    @foreach($p['pendidikan'] as $edu)
    <div class="resume-card">
        <span class="period-badge">{{ $edu['periode'] }}</span>
        <div class="resume-role">{{ $edu['jurusan'] }}</div>
        <div class="resume-org">{{ $edu['kampus'] }}</div>
        <p class="resume-desc">{{ $edu['fokus'] }}</p>
    </div>
    @endforeach
</div>
@endsection
