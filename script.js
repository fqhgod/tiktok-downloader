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

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Server Error');
            
            localStorage.setItem('videoData', JSON.stringify(data));
            window.location.href = 'download.html';
        } else {
            // Jika yang dikirim bukan JSON (tapi teks error Vercel)
            const text = await response.text();
            console.error("Server Response:", text);
            throw new Error("Server sedang gangguan, coba cek API Key kamu lagi.");
        }

        // Simpan data untuk halaman download.html
        localStorage.setItem('videoData', JSON.stringify(data));
        window.location.href = 'download.html';

    } catch (error) {
        statusElement.innerText = "❌ Error: " + error.message;
    }
}
