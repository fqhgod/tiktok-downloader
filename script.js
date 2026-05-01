async function cekVideo() {
    const urlInput = document.getElementById('urlInput').value.trim();
    const status = document.getElementById('status');
    const resultDiv = document.getElementById('result');

    if (!urlInput) {
        status.innerText = "Silakan masukkan link terlebih dahulu!";
        return;
    }

    status.innerText = "Sedang memproses...";
    resultDiv.innerHTML = "";

    try {
        // PERBAIKAN: Gunakan /api/download dan metode POST
        const response = await fetch('/api/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: urlInput })
        });

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Server tidak mengirim JSON. Pastikan backend di Vercel aktif!");
        }

        const data = await response.json();

        // Mengikuti struktur data API Emmanuel: data.contents[0]
        if (data && data.contents && data.contents.length > 0) {
            status.innerText = "Video ditemukan!";
            
            // Simpan ke localStorage agar bisa dibaca di halaman download (jika kamu pakai 2 halaman)
            localStorage.setItem('videoData', JSON.stringify(data));
            
            // Jika kamu ingin tampilkan di halaman yang sama (index):
            const video = data.contents[0].videos[0];
            const metadata = data.contents[0].metadata;

            resultDiv.innerHTML = `
                <img src="${metadata.cover}" alt="thumbnail" style="width:100%; border-radius:8px; margin-top:15px;">
                <p style="margin: 10px 0; font-weight: bold;">${metadata.title || 'TikTok Video'}</p>
                <a href="${video.url}" target="_blank" class="btn-save" style="display: block; text-align: center; background: #3f88db; color: white; padding: 12px; border-radius: 6px; text-decoration: none;">
                    Download Video Now
                </a>
            `;
            
            // ATAU jika kamu ingin otomatis pindah ke download.html:
            // window.location.href = 'download.html';

        } else {
            status.innerText = "Video tidak ditemukan atau link salah.";
        }
    } catch (error) {
        console.error("Error Detail:", error);
        status.innerText = "Terjadi kesalahan: " + error.message;
    }
}
