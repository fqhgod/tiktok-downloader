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
        console.log("Data dari API:", data); // Cek di Console (F12) jika masih error

        // Pengecekan struktur data yang lebih aman
        if (data && data.contents && data.contents.length > 0) {
            const item = data.contents[0];
            
            // Ambil metadata & video dengan pengaman (|| {})
            const metadata = item.metadata || {};
            const video = (item.videos && item.videos.length > 0) ? item.videos[0] : null;

            if (video && video.url) {
                status.innerText = "✅ Video ditemukan!";
                
                // Simpan data untuk halaman download.html
                localStorage.setItem('videoData', JSON.stringify(data));

                // Gunakan gambar default jika metadata.cover tidak ada
                const thumbnail = metadata.cover || 'https://via.placeholder.com/400x225?text=No+Thumbnail';
                const title = metadata.title || 'TikTok Video';

                resultDiv.innerHTML = `
                    <div style="margin-top: 20px; text-align: center;">
                        <img src="${thumbnail}" alt="thumbnail" style="width:100%; border-radius:12px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                        <p style="margin: 15px 0; font-weight: bold; color: #333;">${title}</p>
                        <a href="${video.url}" target="_blank" class="btn-save" style="display: block; background: #3f88db; color: white; padding: 14px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                            📥 DOWNLOAD SEKARANG
                        </a>
                    </div>
                `;
            } else {
                status.innerText = "❌ Gagal mendapatkan link download video.";
            }
        } else {
            status.innerText = "❌ Video tidak ditemukan. Pastikan link benar dan publik.";
        }
    } catch (error) {
        console.error("Detail Error:", error);
        status.innerText = "⚠️ Terjadi kesalahan koneksi ke server.";
    }
}
