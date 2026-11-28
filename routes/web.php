<?php

use Illuminate\Support\Facades\Route;

    //Data Pribadi
$profile = [
    'nama' => 'Riza Aditya Pirmansyah',
    'pendek' => 'Riza Aditya',
    'badge' => 'Mahasiswa Sistem Informasi',
    'roles' => 'Web Developer & System Analyst',
    'foto' => 'img/rz2.jpg',
    'tentang' => 'Mahasiswa D3 Sistem Informasi di Politeknik Negeri Subang dengan fokus pada analisis kebutuhan sistem dan pengembangan aplikasi web. Berpengalaman memimpin tim kerja sebagai Project Manager dan aktif dalam dokumentasi multimedia organisasi.',
    'foto_about' => 'img/rz1.jpg',
    'stats' => [
        ['angka' => '3', 'label' => 'Pengalaman'],
        ['angka' => '6', 'label' => 'Proyek Selesai'],
        ['angka' => '5+', 'label' => 'Skill'],
        ['angka' => '1', 'label' => 'Tim Dipimpin (PM)'],
    ],
    'pengalaman' => [
        ['periode' => '2026', 'jabatan' => 'PROJECT MANAGER PROJECT 1', 'org' => 'Tim 5 Orang', 'detail' => ['Memimpin tim 5 orang', 'Menyusun rencana dan pembagian tugas']],
        ['periode' => '2026', 'jabatan' => 'ANGGOTA DIVISI PUBLIKASI, DESAIN DAN DOKUMENTASI', 'org' => 'PKKMB Jurusan & Mabim', 'detail' => ['Desain publikasi acara', 'Dokumentasi foto dan video']],
        ['periode' => '2026', 'jabatan' => 'KETUA DIVISI KOORDINATOR LAPANGAN', 'org' => 'Diesnatalis Himatikom', 'detail' => ['Koordinasi lapangan acara', 'Mengatur alur kegiatan']],
    ],
    'pendidikan' => [
        [
            'periode' => '2025 - Sekarang',
            'jurusan' => 'D3 Sistem Informasi',
            'kampus' => 'Politeknik Negeri Subang',
            'fokus' => 'Fokus pada analisis sistem, pemodelan masalah proses bisnis, dan pengembangan aplikasi web.',
        ],
    ],
    // Daftar proyek
    'proyek' => [
        ['gambar' => 'img/mywork.png', 'kategori' => 'MOBILE APP', 'judul' => 'MyWork: Task & Schedule Manager', 'deskripsi' => 'Aplikasi manajemen tugas dan jadwal luring dengan analitik beban kerja mingguan, pengingat interaktif, dan widget Android.', 'tags' => ['React Native', 'JavaScript', 'SQLite', 'Expo'], 'url' => 'https://github.com/Riza2803/MyWork-app', 'label' => 'GitHub ↗'],
        ['gambar' => 'img/myschedule.png', 'kategori' => 'MOBILE APP', 'judul' => 'MySchedule — Offline Agenda & Widget', 'deskripsi' => 'Aplikasi manajemen agenda luring dengan widget Android interaktif, alarm pengingat, dan kategori kustom.', 'tags' => ['React Native', 'TypeScript', 'SQLite', 'Expo'], 'url' => 'https://github.com/Riza2803/MySchedule-app', 'label' => 'GitHub ↗'],
        ['gambar' => 'img/mywallet.png', 'kategori' => 'MOBILE APP', 'judul' => 'MyWallet — Expense Tracker', 'deskripsi' => 'Aplikasi pelacak keuangan pribadi offline-first dengan rekap multi-periode, pengingat tagihan, dan multi-akun.', 'tags' => ['React Native', 'TypeScript', 'SQLite', 'Expo'], 'url' => 'https://github.com/Riza2803/MyWallet-app', 'label' => 'GitHub ↗'],
        ['gambar' => 'img/vb.png', 'kategori' => 'ACADEMIC PROJECT', 'judul' => 'Sistem Presensi Desa Cikadu', 'deskripsi' => 'Sistem presensi berbasis Visual Basic untuk administrasi desa.', 'tags' => ['VB', 'Desktop'], 'url' => 'https://youtu.be/FnfyQx19PkU', 'label' => 'Lihat ↗'],
        ['gambar' => 'img/figma.png', 'kategori' => 'SYSTEM DESIGN', 'judul' => 'Analisis & Prototipe Sistem Pemesanan Ayam Geprek Si Akang', 'deskripsi' => 'Perancangan alur proses bisnis dan prototipe interaktif pemesanan makanan 5 modul: Beranda, Menu, Pesan, Lacak, dan Riwayat.', 'tags' => ['Sistem Analis', 'Figma'], 'url' => 'https://www.figma.com/design/itR9ui0W2mWNyOwi54bALa/SiAkang?node-id=0-1&t=7mHv9ghKIPntH8st-1', 'label' => 'Lihat di Figma ↗'],
        ['gambar' => 'img/video.png', 'kategori' => 'VIDEOGRAFI', 'judul' => 'Dokumentasi Acara', 'deskripsi' => 'Videografi dan editing dokumentasi acara jurusan.', 'tags' => ['Video', 'Editing'], 'url' => 'https://drive.google.com/drive/folders/154JxdktHQcBG5Cu5H4olhL7_pDGzd8xx', 'label' => 'Lihat ↗'],
    ],
    // Daftar kontak
    'kontak' => [
        ['ikon' => 'img/icon/email.png', 'label' => 'Email', 'url' => 'mailto:rizaadityafirmansyah2@gmail.com', 'tampil' => 'rizaadityafirmansyah2@gmail.com'],
        ['ikon' => 'img/icon/whatsapp.png', 'label' => 'WhatsApp', 'url' => 'https://wa.me/6285601546289', 'tampil' => '+62 856-0154-6289'],
        ['ikon' => 'img/icon/social.png', 'label' => 'Instagram', 'url' => 'https://instagram.com/rizaadtyafrmnsyh', 'tampil' => '@rizaadtyafrmnsyh'],
        ['ikon' => 'img/icon/linkedin.png', 'label' => 'LinkedIn', 'url' => 'https://www.linkedin.com/in/riza-aditya-pirmansyah-63a82437b/', 'tampil' => 'Riza Aditia Pirmansyah'],
        ['ikon' => 'img/icon/github.png', 'label' => 'GitHub', 'url' => 'https://github.com/Riza2803', 'tampil' => 'Riza Aditia'],
    ],
];

// Tiap route: URL -> view Blade + kirim data $profile sebagai $p.
Route::get('/', function () use ($profile) {
    return view('home', ['p' => $profile]); // Halaman utama (hero + foto).
});

Route::get('/about', function () use ($profile) {
    return view('about', ['p' => $profile]); // Profil singkat + statistik.
});

Route::get('/experience', function () use ($profile) {
    return view('experience', ['p' => $profile]); // Timeline pengalaman organisasi.
});

Route::get('/project', function () use ($profile) {
    return view('project', ['p' => $profile]); // Grid kartu proyek + link luar.
});

Route::get('/contact', function () use ($profile) {
    return view('contact', ['p' => $profile]); // Info kontak + ikon sosmed.
});

