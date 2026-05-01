async function cekVideo() {
    const urlInput = document.getElementById('urlInput').value.trim();
    const status = document.getElementById('status');
    const resultDiv = document.getElementById('result');

    if (!urlInput) {
        status.innerText = "Silakan masukkan link terlebih dahulu!";
        return;
    }

    status.innerText = "⏳ Sedang memproses...";
    resultDiv.innerHTML = "";

    try {
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlInput })
        });

        const data = await response.json();
        console.log("Data dari API:", data);

        // Memastikan data valid sesuai struktur API Emmanuel
        if (data && data.contents && data.contents.length > 0) {
            const item = data.contents[0];
            const video = (item.videos && item.videos.length > 0) ? item.videos[0] : null;

            if (video && video.url) {
                status.innerText = "✅ Berhasil! Mengalihkan...";

                // 1. Simpan data ke localStorage agar bisa dibaca halaman kedua
                localStorage.setItem('videoData', JSON.stringify(data));

                // 2. PINDAH KE HALAMAN KEDUA (download.html)
                // Memberi sedikit jeda agar user bisa melihat status "Berhasil"
                setTimeout(() => {
                    window.location.href = 'download.html';
                }, 1000);

            } else {
                status.innerText = "❌ Link download tidak ditemukan dalam data.";
            }
        } else {
            status.innerText = "❌ Video tidak ditemukan atau link salah.";
        }
    } catch (error) {
        console.error("Detail Error:", error);
        status.innerText = "⚠️ Terjadi kesalahan koneksi ke server.";
    }
}
