async function cekVideo() {
    const urlInput = document.getElementById('urlInput').value;
    const status = document.getElementById('status');
    const resultDiv = document.getElementById('result');

    if (!urlInput) {
        status.innerText = "Silakan masukkan link terlebih dahulu!";
        return;
    }

    status.innerText = "Sedang memproses...";
    resultDiv.innerHTML = "";

    try {
        const response = await fetch(`/download?url=${encodeURIComponent(urlInput)}`);
        
        // Cek jika respon bukan JSON (penyebab error kemarin)
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new TypeError("Server tidak mengirim JSON. Pastikan server backend aktif!");
        }

        const data = await response.json();

        if (data.status === "success") {
            status.innerText = "Video ditemukan!";
            resultDiv.innerHTML = `
                <img src="${data.thumbnail}" alt="thumbnail" style="width:100%; border-radius:8px;">
                <p style="margin: 10px 0;">${data.title}</p>
                <a href="${data.downloadUrl}" target="_blank" class="btn-download">Download Video Now</a>
            `;
        } else {
            status.innerText = "Video tidak ditemukan atau link salah.";
        }
    } catch (error) {
        console.error(error);
        status.innerText = "Terjadi kesalahan pada server.";
    }
}
