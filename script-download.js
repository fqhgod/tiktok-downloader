const contentDiv = document.getElementById('download-content');
const rawData = localStorage.getItem('videoData');

if (rawData) {
    try {
        const data = JSON.parse(rawData);
        console.log("Data diterima:", data); // Untuk cek di inspect element (F12)

        // Mencari item konten (bisa langsung di data atau di dalam data.contents)
        const contents = data.contents || (data.r && data.r.contents);
        
        if (contents && contents.length > 0) {
            const item = contents[0];
            const metadata = item.metadata || {};
            
            // Mencari link video (mengikuti struktur Screenshot 2026-04-30 101516.jpg)
            const video = item.videos && item.videos.length > 0 ? item.videos[0] : null;

            if (video && video.url) {
                const title = metadata.title || "TikTok Video";
                const cover = metadata.cover || "";

                contentDiv.innerHTML = `
                    <div style="text-align: center;">
                        <img src="${cover}" style="max-width: 100%; border-radius: 15px; margin-bottom: 15px;">
                        <h3 style="margin-bottom: 20px;">${title}</h3>
                        <a href="${video.url}" target="_blank" class="btn-save" style="display: block; padding: 15px; background: #25D366; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
                            📥 SIMPAN VIDEO SEKARANG
                        </a>
                        <p style="font-size: 12px; margin-top: 15px; color: #666;">
                            Jika video terbuka tapi tidak mendownload, tahan/klik kanan pada video lalu pilih "Download Video".
                        </p>
                    </div>
                `;
            } else {
                contentDiv.innerHTML = "<p>❌ Maaf, link video tidak ditemukan dalam data.</p>";
            }
        } else {
            contentDiv.innerHTML = "<p>❌ Format data berubah. Cek link TikTok kamu kembali.</p>";
        }
    } catch (e) {
        contentDiv.innerHTML = "<p>❌ Terjadi kesalahan saat membaca data.</p>";
    }
} else {
    contentDiv.innerHTML = "<p>⚠️ Data kosong. Silakan kembali dan masukkan link lagi.</p>";
}
