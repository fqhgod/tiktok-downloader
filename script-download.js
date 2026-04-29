const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('title');
const videoUrl = urlParams.get('video');
const coverUrl = urlParams.get('cover');

const contentDiv = document.getElementById('download-content');

if (videoUrl) {
    contentDiv.innerHTML = `
        <img src="${coverUrl}" class="video-preview" style="max-width: 100%; border-radius: 10px;">
        <h3>${title}</h3>
        <a href="${videoUrl}" target="_blank" class="btn-save">
            KLIK UNTUK SIMPAN VIDEO
        </a>
    `;
} else {
    contentDiv.innerHTML = "<p>Data tidak ditemukan.</p>";
}