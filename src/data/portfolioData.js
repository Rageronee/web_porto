export const portfolioData = {
    projects: [
        {
            id: 1,
            title: "Grapara Customer Service",
            category: "Full Stack Web App",
            year: "2025",
            color: "#000000",
            tech: "Laravel, PHP, MySQL, Bootstrap",
            domain: "Web Development / CRM",
            shape: "rect",
            link: "https://github.com/Rageronee/Grapara-Telkomcel/tree/main",
            details: {
                desc: "Sistem aplikasi berbasis web untuk manajemen layanan pelanggan di lingkungan Grapara. Mencakup fitur ticketing, manajemen antrian, dan laporan analitik performa layanan.",
                features: [
                    "Sistem Ticketing & Antrian Real-time",
                    "Dashboard Admin & Customer Service",
                    "Reporting & Analytics",
                    "User Role Management (Admin, CS, Supervisor)"
                ]
            }
        },
        {
            id: 2,
            title: "Sistem Deteksi Kematangan Pisang",
            category: "Computer Vision",
            year: "2024",
            color: "#FFD700",
            tech: "JavaScript, HTML, CSS", // Updated as per previous context
            domain: "Computer Vision / AI",
            shape: "circle",
            link: "https://github.com/talhaportofolio/Sistem-Deteksi-Kematangan-Pisang",
            details: {
                desc: "Sistem deteksi otomatis tingkat kematangan pisang menggunakan Computer Vision. Mengklasifikasikan pisang ke dalam kategori (Mentah, Matang, Lewat Matang) berdasarkan analisis warna kulit.",
                features: [
                    "Real-time Image Processing",
                    "Color Histogram Analysis",
                    "Web-based Interface",
                    "Akurasi klasifikasi tinggi untuk pencahayaan terkontrol"
                ]
            }
        },
        {
            id: 3,
            title: "Sistem Monitoring Kompos",
            category: "IoT + AI System",
            year: "2025",
            color: "#4CAF50",
            tech: "Python, Flask, Firebase, ESP32",
            domain: "IoT / Smart Farming",
            shape: "tri",
            link: "https://monitoring-kompos.vercel.app",
            details: {
                desc: "Solusi IoT lengkap untuk memantau proses pengomposan secara real-time. Dilengkapi dengan AI + Sistem Pakar untuk memprediksi kualitas kompos dan memberikan rekomendasi tindakan.",
                features: [
                    "IoT Sensor Integration (Suhu, Kelembaban, pH)",
                    "AI Prediction Model (Estimasi Waktu Panen)",
                    "Sistem Pakar (Rekomendasi Tindakan)",
                    "Dashboard Monitoring Web (IoT + ML + Sistem Pakar)"
                ]
            }
        },
        {
            id: 4,
            title: "Proyek IMK - Aplikasi Kid Curios",
            category: "UI/UX Design",
            year: "2024",
            color: "#2196F3",
            tech: "Figma",
            domain: "UI/UX / EdTech", // Updated domain guess
            shape: "rect",
            link: "https://www.figma.com/proto/...", // Note: User provided truncated link in history, I'll use a placeholder or check history if critical. Keeping generic for now as exact link lost in summary truncation
            details: {
                desc: "Prototype aplikasi pembelajaran seru tingkat SD mengenai IPA. Didesain dengan pendekatan User-Centered Design untuk meningkatkan engagement siswa.",
                features: [
                    "Interactive Learning Modules",
                    "Gamification Elements",
                    "Child-friendly UI/UX",
                    "Prototype Interaktif High-Fidelity"
                ]
            }
        }
    ],
    leadership: [
        { id: 1, period: "Feb 2025 - Sekarang", role: "Ketua Divisi Kominfo", org: "GAPURA UPI", desc: "Strategic Planning & Team Lead" },
        { id: 2, period: "Jan 2025 - Sekarang", role: "Ketua Pelaksana Makrab", org: "HIMATRONIKA-AI", desc: "Project Management & Execution" },
        { id: 3, period: "Mar 2024 - Mar 2025", role: "Staff Divisi Kominfo", org: "GAPURA UPI", desc: "Desain Komunikasi & Publikasi" },
        { id: 4, period: "Feb 2024 - Nov 2024", role: "Staff Departemen Kominfo", org: "HIMATRONIKA-AI", desc: "Desain Grafis & Konten" }
    ],
    skills: [
        { id: 1, focus: "Engineering Software", primary: "Arduino, Proteus, CX Programmer, Fluidsim", secondary: "Dobot, Eagle, TinkerCAD" },
        { id: 2, focus: "Creative & Design", primary: "Adobe Photoshop, Premiere Pro, After Effects, Illustrator", secondary: "Figma, OBS Studio" },
        { id: 3, focus: "Code", primary: "Python, C++, C (Embedded), MATLAB", secondary: "TensorFlow, OpenCV, NumPy" },
        { id: 4, focus: "Systems", primary: "ROS, Arduino/STM32, Raspberry Pi", secondary: "Control Theory, PID, DSP" },
        { id: 5, focus: "Creative Tech", primary: "Garment Design, Fashion Design, Creative Direction", secondary: "Pattern Making, Textile Design, Brand Identity" },
        { id: 6, focus: "Academic Focus", primary: "Mekatronika & Kecerdasan Buatan (UPI)", secondary: "Sarjana Teknik, Semester 5" }
    ],
    education: [
        { id: 1, name: "Universitas Pendidikan Indonesia (UPI) Kampus di Purwakarta", degree: "Sarjana Teknik – Mekatronika & Kecerdasan Buatan", period: "Agu 2023 – Sekarang", location: "Purwakarta" },
        { id: 2, name: "SMA Negeri 2 Purwakarta", degree: "MIPA (Matematika dan Ilmu Pengetahuan Alam)", period: "Agu 2020 – Mei 2023", location: "Purwakarta" }
    ]
};
