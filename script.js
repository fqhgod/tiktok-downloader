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
            body: JSON.stringify({ url: url })
        });

        const data = await response.json();

        if (!response.ok) {
            // Jika backend mengirim error
            throw new Error(data.message || data.error || 'Server error');
        }

        // Cek apakah API Emmanuel memberikan hasil yang valid
        if (data && data.contents && data.contents.length > 0) {
            // Simpan data utuh ke LocalStorage untuk dipakai di download.html
            localStorage.setItem('videoData', JSON.stringify(data));
            window.location.href = 'download.html';
        } else {
            // Jika respon sukses tapi data video kosong/tidak ditemukan
            throw new Error("Video tidak ditemukan. Pastikan link TikTok benar.");
        }

    } catch (error) {
        statusElement.innerText = "❌ Error: " + error.message;
        console.error("Detail Error:", error);
    }
}
