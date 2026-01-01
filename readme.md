# PomoLearn - Focus & Productivity Timer

![PomoLearn Preview](assets/thumbnail-pomodoro.jpg) 
> **"Master Your Time, Master Your Future."**

**PomoLearn** adalah aplikasi web manajemen waktu berbasis teknik **Pomodoro** yang dirancang untuk membantu meningkatkan fokus dan produktivitas. Aplikasi ini menggabungkan desain antarmuka modern (*Glassmorphism* & *Aurora Gradients*) dengan fungsionalitas yang fleksibel, memberikan pengalaman pengguna yang tenang dan bebas gangguan.

🔗 **Live Demo:** [pomolearn.netlify.app](https://pomolearn.netlify.app/)

---

## ✨ Fitur Unggulan

PomoLearn dibangun dengan memperhatikan detail UX dan performa:

### ⏱️ Smart Timer
- **3 Mode Fokus:** Beralih dengan mudah antara mode **Focus** (25m), **Short Break** (5m), dan **Long Break** (15m).
- **Customizable:** Pengguna dapat mengubah durasi waktu untuk setiap mode melalui menu **Settings** sesuai preferensi belajar mereka.
- **Visual & Audio Feedback:** Dilengkapi dengan notifikasi suara "Beep" saat waktu habis dan perubahan tampilan tombol saat timer berjalan.

### 🧠 Productivity Tools
- **Task Input:** Kolom input sederhana untuk menetapkan satu tujuan spesifik sebelum memulai timer ("One task at a time").
- **Dynamic Browser Title:** Judul tab browser akan menghitung mundur secara *real-time* (contoh: `(24:59) PomoLearn`), memudahkan pemantauan saat membuka tab lain.
- **Safety Features:** Pop-up konfirmasi saat ingin me-reset timer untuk mencegah ketidaksengajaan.

### 🎨 Modern UI/UX
- **Glassmorphism Design:** Antarmuka transparan yang elegan di atas latar belakang animasi.
- **Aurora Background:** Latar belakang dengan animasi gradien "blobs" yang bergerak halus untuk efek menenangkan.
- **Responsive & Mobile-First:** Tampilan yang optimal di semua perangkat, baik Desktop, Tablet, maupun Smartphone.

---

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi web standar yang ringan dan cepat tanpa *framework* berat.

| Kategori | Teknologi |
| :--- | :--- |
| **Core** | HTML5 (Semantic), CSS3, JavaScript (ES6+) |
| **Styling** | CSS Variables, Flexbox, Grid, Keyframe Animations |
| **Design System** | Glassmorphism, Aurora Gradients |
| **Fonts & Icons** | Plus Jakarta Sans (Google Fonts), Boxicons |
| **SEO** | Meta Tags, JSON-LD Schema, Canonical URL |

---

## 📂 Struktur Proyek

```bash
PomoLearn/
├── style/
│   └── style.css       # Styling utama (Glassmorphism & Animasi)
├── index.html          # Struktur utama & SEO Meta Tags
├── script.js           # Logika Timer, Modal, dan DOM Manipulation
└── README.md           # Dokumentasi Proyek
