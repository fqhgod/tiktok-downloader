async function cekVideo() {
    const urlInput = document.getElementById('urlInput');
    const statusElement = document.getElementById('status');
    const url = urlInput.value.trim();

    if (!url) {
        statusElement.innerText = "⚠️ Masukkan link TikTok dulu!";
        return;
    }

    statusElement.innerText = "⏳ Sedang memproses...";

    try {
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Server error');
        }

        // Simpan data untuk halaman download.html
        localStorage.setItem('videoData', JSON.stringify(data));
        window.location.href = 'download.html';

    } catch (error) {
        statusElement.innerText = "❌ Error: " + error.message;
    }
}
