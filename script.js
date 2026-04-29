const btnDownload = document.getElementById('btnDownload');
const resDiv = document.getElementById('result');

// Pastikan resDiv kosong saat pertama kali halaman dibuka
resDiv.innerHTML = "";

async function downloadVideo() {
    const urlInput = document.getElementById('tiktokUrl');
    const url = urlInput.value.trim(); // .trim() untuk menghapus spasi kosong

    // 1. Validasi Input: Jika kosong, jangan tampilkan apa-apa
    if (!url) {
        alert("Masukkan link TikTok dulu ya!");
        return; 
    }

    // 2. Jika ada link, baru tampilkan loading
    resDiv.innerHTML = `
        <div class="loader"></div>
        <p>sebentar, sedang mengambil videomu...</p>
    `;

    try {
        const response = await fetch('http://localhost:3000/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const data = await response.json();

        if (data.videoUrl) {
            const params = new URLSearchParams({
                title: data.title,
                video: data.videoUrl,
                cover: data.cover
            });
            window.location.href = `download.html?${params.toString()}`;
        } else {
            resDiv.innerHTML = "<p style='color:red;'>Gagal mengambil data. Cek link kamu.</p>";
        }
    } catch (error) {
        resDiv.innerHTML = "<p style='color:red;'>Server offline! Jalankan 'node server.js' di terminal.</p>";
    }
}

// PASTIKAN: Tidak ada tanda kurung () setelah downloadVideo di sini
btnDownload.addEventListener('click', downloadVideo);