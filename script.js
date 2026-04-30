async function cekVideo() {
    const urlInput = document.getElementById('urlInput');
    const statusElement = document.getElementById('status');
    const url = urlInput.value.trim();

    if (!url) {
        statusElement.innerText = "⚠️ Masukkan link TikTok!";
        return;
    }

    statusElement.innerText = "⏳ Sedang memproses...";

    try {
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url }) // Mengirim link TikTok ke backend
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Server error');
        }

        // Simpan data hasil dari API Emmanuel tadi ke LocalStorage
        localStorage.setItem('videoData', JSON.stringify(data));
        window.location.href = 'download.html';

    } catch (error) {
        statusElement.innerText = "❌ Error: " + error.message;
    }
}
