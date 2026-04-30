const contentDiv = document.getElementById('download-content');
const rawData = localStorage.getItem('videoData');

if (rawData) {
    const data = JSON.parse(rawData);
    
    // Mengikuti struktur API Emmanuel di screenshot kamu:
    // data.contents[0].videos[0].url
    if (data.contents && data.contents[0] && data.contents[0].videos) {
        const video = data.contents[0].videos[0];
        const title = data.contents[0].metadata.title || "TikTok Video";
        const cover = data.contents[0].metadata.cover;

        contentDiv.innerHTML = `
            <img src="${cover}" style="max-width: 100%; border-radius: 10px;">
            <h3>${title}</h3>
            <a href="${video.url}" target="_blank" class="btn-save">
                KLIK UNTUK SIMPAN VIDEO
            </a>
        `;
    } else {
        contentDiv.innerHTML = "<p>Gagal memproses detail video. Coba link lain.</p>";
    }
} else {
    contentDiv.innerHTML = "<p>Data tidak ditemukan. Silakan kembali ke depan.</p>";
}
