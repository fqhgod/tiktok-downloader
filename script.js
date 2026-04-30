const btnDownload = document.getElementById('btnDownload');
const resDiv = document.getElementById('result');

// Pastikan resDiv kosong saat pertama kali halaman dibuka
resDiv.innerHTML = "";

async function cekVideo() {
    const url = document.getElementById('urlInput').value;
    const statusElement = document.getElementById('status');

    if (!url) {
        statusElement.innerText = "Masukkan link TikTok dulu!";
        return;
    }

    statusElement.innerText = "Sedang memproses...";

    try {
        // Langsung panggil /api/download tanpa cek localhost
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        if (!response.ok) {
            throw new Error('Server merespon dengan error');
        }

        const data = await response.json();
        
        // Simpan data ke localStorage untuk halaman download
        localStorage.setItem('videoData', JSON.stringify(data));
        
        // Pindah ke halaman download
        window.location.href = 'download.html';

    } catch (error) {
        console.error(error);
        statusElement.innerText = "Gagal menghubungi server. Pastikan koneksi internet stabil.";
    }
}

// PASTIKAN: Tidak ada tanda kurung () setelah downloadVideo di sini
btnDownload.addEventListener('click', downloadVideo);
