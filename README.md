# PomoLearn 🍅⏱️

Aplikasi Pomodoro Timer berbasis Web untuk Meningkatkan Produktivitas Belajar/Kerja

## 📝 Deskripsi
PomoLearn adalah aplikasi web yang mengimplementasikan teknik Pomodoro (25 menit fokus + 5 menit istirahat) 
untuk membantu pengguna mengelola waktu belajar/kerja secara efisien. Dibangun dengan:
- HTML5 (Struktur dasar)
- CSS3 + Sass/SCSS (Styling modular)
- JavaScript ES6+ (Logika timer & interaksi)

## 💡 Fitur
- Timer Pomodoro dengan sesi Fokus dan Istirahat
- Notifikasi suara saat sesi berakhir
- Daftar tugas (Todo List) terintegrasi
- Responsif (Desktop & Mobile)

## 💾 Tentang Penyimpanan Data
- Data ToDo disimpan di `localStorage` browser dalam format JSON.

## 🎯 Tujuan Projek
- Menerapkan teknik Pomodoro yang terbukti meningkatkan produktivitas (studi Francesco Cirillo, 1980-an).
- Belajar pengembangan web modern dengan Sass dan JavaScript.
- Membuat tool open-source yang bermanfaat untuk pelajar/pekerja.

## 🚀 Cara Menjalankan
1. Clone repositori: `git clone https://github.com/DilFrontendDev/PomoLearn.git`
2. Install ekstension Live SASS/SCSS Compiler
3. Jalankan ekstension SASS/SCSS Live Compiler
4. Jalankan file `index.html`
5. Buka dibrowser

## 📂 Struktur Projek
PomoLearn/  
├── index.html          # Halaman utama  
├── scss/                # Hasil compile Sass  
    ├── style.css
    ├── style.scss
    └── style.css.map
├── components/               # Source Sass  
    ├── _border.scss     # Variabel border   
    ├── _fonts.scss      # Variabel fonts style
    ├── _grid.scss       # File grid system 
    └── _flex.scss.scss  # File flexbox
   
├── script.js            # Logika Pomodoro dan Aksi

├── config/             # Folder tempat penyimpanan styling tampilan website  
    └── _main.scss  

├── assets/       # Folder penyimpanan semua asset website

## ✨ Happy Coding & Stay Productive!
Dibuat dengan ❤️ oleh Dil.
