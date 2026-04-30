async function cekVideo() {
    const urlInput = document.getElementById('urlInput');
    const statusElement = document.getElementById('status');
    const url = urlInput.value.trim();

    // 1. Validasi Input
    if (!url) {
        statusElement.innerText = "⚠️ Masukkan link TikTok terlebih dahulu!";
        statusElement.style.color = "#ff4d4d";
        return;
    }

    // 2. Tampilkan status loading
    statusElement.innerText = "⏳ Sedang memproses video, mohon tunggu...";
    statusElement.style.color = "#ffd700";

    try {
        // 3. Panggil API Backend di Vercel
        // Kita gunakan path relatif '/api/download' agar otomatis menyesuaikan domain Vercel
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url })
        });

        // 4. Cek apakah server merespon dengan baik
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Gagal menghubungi server');
        }

        const data = await response.json();

        // 5. Simpan data hasil ke LocalStorage untuk digunakan di halaman download.html
        // Pastikan struktur data ini sesuai dengan apa yang dikirim oleh API kamu
        localStorage.setItem('videoData', JSON.stringify(data));

        // 6. Berhasil! Pindah ke halaman download
        statusElement.innerText = "✅ Video ditemukan! Mengalihkan...";
        statusElement.style.color = "#00ff00";
        
        setTimeout(() => {
            window.location.href = 'download.html';
        }, 1000);

    } catch (error) {
        console.error("Error detail:", error);
        statusElement.innerText = "❌ Terjadi kesalahan: " + error.message;
        statusElement.style.color = "#ff4d4d";
    }
}

// Menambahkan fitur tekan 'Enter' untuk kirim link
document.getElementById('urlInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        cekVideo();
    }
});
