# Design System Specification — Editorial Monochrome & Amber Portfolio

**Aesthetic Direction:** Swiss Print-Inspired Editorial & Asymmetric Split-Screen Portfolio  
**Reference Style:** High-contrast grayscale photography, flat architectural color-blocking (`#FFFFFF`, `#DCDCDC`, `#111111`), single-hue marigold amber accents (`#F5B82E`), dashed hairline framing, and sharp geometric edges.

---

## 1. Core Design Principles

1. **Flat Color-Blocking Over Elevation:** Hierarki visual dibangun melalui kontras blok warna solid (putih murni, abu-abu netral, hitam pekat, dan kuning amber) tanpa *drop shadow*, gradien lembut, maupun efek kaca (*glassmorphism*).
2. **Single-Hue Chromatic Discipline:** Seluruh foto potret dan elemen *chrome* UI dibuat monokrom (*grayscale* kontras tinggi) agar warna aksen **Marigold Amber (`#F5B82E`)** menjadi satu-satunya titik fokus warna pada navigasi, angka statistik, dan tombol utama.
3. **Sharp Architectural Grid + Pill Controls:** Gunakan sudut tajam (`border-radius: 0px`) pada seluruh panel tata letak, kartu pengalaman, kotak statistik, dan *frame* foto. Bentuk kapsul (`border-radius: 9999px`) hanya digunakan secara selektif untuk tombol aksi (`MORE ABOUT ME`) dan *floating icon dock* di sisi kanan.
4. **Print-Editorial Framing:** Judul setiap halaman/bagian dibingkai garis putus-putus tipis (`1px dashed`) untuk menciptakan kesan tata letak majalah cetak modern.

---

## 2. Color Tokens

### Surface & Background
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `--bg-hero-light` | `#FFFFFF` | Panel kiri (50%) pada halaman Hero untuk kontras maksimal teks pembuka. |
| `--bg-canvas-grey` | `#DCDCDC` | Background utama seluruh halaman konten (`About Me`, `Resume`, `Portfolio`, `Testimonials`, `Contact`). |
| `--bg-surface-muted` | `#D2D2D2` | Kontainer sekunder halus di dalam halaman (misal: blok latar kartu `Resume`). |
| `--bg-surface-dark` | `#111111` | Blok matriks statistik 2x2 pada `About Me` dan kartu ulasan pada `Testimonials`. |
| `--bg-accent-amber` | `#F5B82E` | Panel sidebar navigasi kiri, *floating pill dock* kanan, tombol CTA, dan *badge* tahun. |

### Ink & Typography
| Token | Hex | Usage |
| :--- | :--- | :--- |
| `--text-primary` | `#111111` | Heading utama (`ABOUT ME`, `PORTFOLIO`), teks `HI THERE! I'M`, dan label navigasi non-aktif di atas sidebar amber. |
| `--text-secondary` | `#555555` | Paragraf deskripsi, ringkasan pengalaman kerja, dan detail kontak. |
| `--text-muted` | `#8A8A8A` | Filter kategori portofolio yang sedang tidak aktif (`WEB DESIGN`, `PHOTOGRAPHY`). |
| `--text-on-dark` | `#FFFFFF` | Label statistik di atas blok hitam, teks kutipan *testimonial*, dan item menu **aktif** di dalam sidebar amber. |
| `--text-accent` | `#F5B82E` | Angka metrik utama (`15+`, `350+`, `200+`, `45K`), nama klien pada kartu hitam, dan ikon bintang rating. |

### Borders & Dividers
| Token | Value | Usage |
| :--- | :--- | :--- |
| `--border-dashed-dark` | `1px dashed #9E9E9E` | Bingkai persegi panjang di sekeliling judul bagian (*Section Header*). |
| `--border-dashed-light` | `1px dashed rgba(255, 255, 255, 0.25)` | Garis silang pemisah grid 2x2 di dalam kotak statistik hitam (`#111111`). |
| `--stroke-outline-amber` | `1.5px solid #F5B82E` | *Text-stroke* transparan pada nama besar di Hero (`BENJAMIN`). |

---

## 3. Typography

### Font Families
* **Display & Headings:** `Montserrat` atau `Poppins` (`800 ExtraBold`, `900 Black` — wajib huruf kapital untuk judul utama).
* **Body & Metadata:** `Inter` atau `Open Sans` (`300 Light`, `400 Regular`, `600 SemiBold`, `700 Bold`).

### Type Scale & Specific Rules
* **Hero Greeting (`HI THERE!`):** `22px` (`800 ExtraBold`), uppercase, tracking `0.04em`, `#111111`.
* **Hero Name (`I'M BENJAMIN`):** `48px` (`900 Black`), line-height `1.05`, uppercase. Kata `I'M` menggunakan fill solid `#111111`, sedangkan nama utama (`BENJAMIN`) menggunakan *outlined display text* (`color: transparent; -webkit-text-stroke: 1.5px #F5B82E;`).
* **Role Highlight Strip:** `10px` (`700 Bold`), uppercase, tracking `0.08em`, teks `#111111` di atas blok stabilo `#F5B82E` (`padding: 3px 8px`).
* **Section Banner Title (`ABOUT ME`, `RESUME`, dll.):** `38px` (`900 Black`), uppercase, tracking `0.06em`, rata tengah di dalam kotak berbingkai garis putus-putus.
* **Section Lead-In Statement:** `18px` (`300 Light` untuk kata pengantar seperti *"I'm "* / *"Feel "*, dipadukan `700 Bold` untuk kata kunci seperti **"Benjamin Smith"** / **"free"**).
* **Body Copy:** `11px–12px` (`400 Regular`), line-height `1.6`, `#555555`.

---

## 4. Layout Grid & Navigation Architecture

### A. Mode 1: Hero View (50/50 Asymmetric Split Screen)
* **Grid:** 2 kolom penuh layar (`100vh`, `grid-template-columns: 1fr 1fr`, gap `0px`).
* **Kolom Kiri (`#FFFFFF`):** Konten teks rata kiri dengan padding horizontal `12%`, dipusatkan secara vertikal (`justify-content: center`). Diakhiri tombol kapsul `#F5B82E` (`MORE ABOUT ME`, `padding: 10px 22px`, `border-radius: 9999px`, `10px Bold` uppercase).
* **Kolom Kanan:** Foto potret *full-bleed* (`object-fit: cover`, `filter: grayscale(100%) contrast(115%)`) tanpa margin.

### B. Mode 2: Inner Content Views (Sidebar + Canvas)
* **Grid Utama:** `grid-template-columns: 220px 1fr` (atau `22% / 78%`).
* **Left Sidebar (`220px`):**
  1. **Top Avatar Block:** Foto potret hitam-putih persegi (`aspect-ratio: 1 / 1`) menempel penuh ke tepi atas dan samping kiri.
  2. **Navigation Panel (`#F5B82E`):** Mengisi sisa tinggi layar ke bawah. Item menu disusun vertikal rata tengah (`HOME`, `ABOUT ME`, `RESUME`, `PORTFOLIO`, `TESTIMONIALS`, `CONTACT`), masing-masing dipisahkan garis vertikal pendek (`width: 1px; height: 10px; background: rgba(17,17,17,0.35)`).
  3. **Active State:** Teks item aktif berubah dari `#111111` menjadi `#FFFFFF` (`700 Bold`).
* **Main Canvas (`#DCDCDC`):** Padding `36px 56px 36px 44px` (menyisakan ruang di sisi kanan untuk *floating dock*).

### C. Floating Right Quick-Jump Dock
* **Posisi:** `position: fixed; right: 16px; top: 50%; transform: translateY(-50%);`
* **Bentuk:** Kapsul vertikal (`width: 30px`, `padding: 12px 0`, `border-radius: 9999px`, `background: #F5B82E`).
* **Isi:** 6 ikon monokrom solid (`13px`, warna `#111111`, gap vertikal `16px`) sebagai pintasan cepat antar bagian.

---

## 5. Section Component Specifications

### 1. Dashed Section Header Banner
* **Struktur:** Kontainer lebar penuh (`width: 100%`, `padding: 14px 24px`, `border: 1px dashed #9E9E9E`, `margin-bottom: 24px`), teks judul rata tengah.

### 2. About Me: 2x2 Dark Stat Matrix & Service List
* **Layout Bawah:** `grid-template-columns: 1.35fr 1fr`, gap `28px`.
* **Dark Stat Matrix (`#111111`):**
  * Grid 2x2 dengan sel terbagi garis silang `1px dashed rgba(255,255,255,0.25)`.
  * Tiap sel rata tengah (`padding: 24px 16px`): Angka besar `#F5B82E` (`30px Black`, `tabular-nums`) di atas label `#FFFFFF` (`9px SemiBold`, uppercase, tracking `0.06em`).
* **What I Do? (Service Stack):**
  * Heading kecil `What I Do?` (`14px Bold`, `#111111`).
  * 3 baris layanan (`PRINT DESIGN`, `WEB DESIGN`, `PHOTOGRAPHY`). Tiap baris terdiri dari ikon garis tipis monokrom (`38px x 38px`) di kiri dan judul uppercase (`10px Bold`) + deskripsi 3 baris (`10px`, `#555555`) di kanan.

### 3. Resume: 3-Column Timeline Grid
* **Struktur:** Dua kelompok vertikal (`EDUCATION` dan `EXPERIENCE`), masing-masing menggunakan `grid-template-columns: repeat(3, 1fr)`, gap `16px`.
* **Item Card:**
  * *Badge* periode tahun di kiri atas (`background: #F5B82E`, `color: #111111`, `font-size: 9px`, `font-weight: 700`, `padding: 2px 8px`, `border-radius: 0px`).
  * Judul posisi/gelar (`12px Bold`, `#111111`, `margin-top: 8px`).
  * Deskripsi institusi/peran (`10px Regular`, `#555555`).

### 4. Portfolio: Filter Tabs & Sharp Media Grid
* **Filter Bar:** Flex horizontal rata tengah (`gap: 24px`, `margin-bottom: 20px`), teks `10px Bold` uppercase. Tab aktif berwarna `#111111` (atau `#F5B82E` dengan underline tipis), tab tidak aktif `#8A8A8A`.
* **Gallery Grid:** Grid 2 kolom (`grid-template-columns: repeat(2, 1fr)`) atau 4 kolom (`repeat(4, 1fr)`), `gap: 14px`. Seluruh gambar menggunakan `border-radius: 0px` dan `aspect-ratio: 16 / 10` (atau `4 / 3`) tanpa bingkai tambahan.

### 5. Testimonials: 2x2 Dark Quote Cards
* **Grid:** `grid-template-columns: repeat(2, 1fr)`, `gap: 16px`.
* **Card (`#111111`, `padding: 16px`, `border-radius: 0px`):**
  * **Kiri:** Foto klien persegi (`56px x 56px`, `object-fit: cover`) + deretan 5 bintang `#F5B82E` (`10px`) tepat di bawah foto.
  * **Kanan:** Nama klien (`12px Bold`, `#F5B82E`), jabatan (`9px`, `#9E9E9E`), dan kutipan 2–3 baris (`10px`, `#FFFFFF`, line-height `1.5`).

### 6. Contact: Icon-Text Columns & Sign-Off
* **Layout:** 2 kolom horizontal (`grid-template-columns: 1fr 1fr`, `gap: 32px`, `margin: 32px 0`).
* **Item:** Ikon *outline* tipis (`42px x 42px`, `stroke-width: 1.25px`, `#222222`) di sebelah kiri teks detail 2 baris (`10px`, `#333333`).
* **Footer Sign-Off:** Teks rata tengah `THANKS FOR PATIENCE!` (`13px Black`, uppercase, tracking `0.08em`, `#111111`).

---

## 6. Strict Anti-Patterns (Do Not Use)

* **Dilarang menggunakan `box-shadow` atau efek elevasi 3D.** Pemisahan antar elemen hanya boleh menggunakan kontras blok warna atau garis `1px dashed`.
* **Dilarang membulatkan sudut kartu/foto (`border-radius > 0px`).** Sudut membulat hanya diizinkan pada tombol CTA kapsul dan *floating navigation dock* kanan.
* **Dilarang menggunakan foto potret berwarna pada Hero maupun Sidebar.** Foto profil wajib menggunakan filter *high-contrast grayscale* agar tidak bertabrakan dengan kuning amber `#F5B82E`.
* **Dilarang menambahkan warna aksen kedua.** Jangan mencampur biru, hijau, atau merah ke dalam elemen antarmuka.