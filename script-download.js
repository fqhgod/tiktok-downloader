const contentDiv = document.getElementById('download-content');
const rawData = localStorage.getItem('videoData');

if (rawData) {
    const data = JSON.parse(rawData);
    
    // Mengecek struktur data berdasarkan Screenshot 2026-04-30 101516.jpg
    if (data.contents && data.contents.length > 0) {
        const item = data.contents[0];
        const metadata = item.metadata;
        const video = item.videos && item.videos.length > 0 ? item.videos[0] : null;

        if (video && video.url) {
            const title = metadata.title || "TikTok Video";
            const cover = metadata.cover || "";

            contentDiv.innerHTML = `
                <div style="text-align: center;">
                    <img src="${cover}" style="max-width: 100%; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                    <h3 style="margin: 15px 0;">${title}</h3>
                    <a href="${video.url}" target="_blank" class="btn-save" rel="noopener noreferrer">
                        📥 KLIK UNTUK SIMPAN VIDEO
                    </a>
                    <p style="font-size: 12px; color: #666; margin-top: 10px;">
                        Tip: Jika video terbuka di tab baru, klik titik tiga lalu pilih 'Download'.
                    </p>
                </div>
            `;
        } else {
            contentDiv.innerHTML = "<p>❌ Link video tidak ditemukan dalam data API.</p>";
        }
    } else {
        contentDiv.innerHTML = "<p>❌ Format data tidak dikenal atau video kosong.</p>";
    }
} else {
    contentDiv.innerHTML = "<p>⚠️ Tidak ada data. Silakan kembali ke halaman utama.</p>";
}
