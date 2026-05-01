const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Konfigurasi CORS agar bisa diakses dari frontend mana pun
app.use(cors());
app.use(express.json());

app.post('/api/download', async (req, res) => {
    try {
        const { url } = req.body;
        
        // 1. Validasi Input
        if (!url) {
            return res.status(400).json({ error: "URL TikTok tidak boleh kosong" });
        }

        // 2. Konfigurasi Request ke RapidAPI sesuai CURL terbaru
        const options = {
            method: 'GET',
            url: 'https://social-media-video-downloader.p.rapidapi.com/tiktok/v3/post/details',
            params: { url: url }, // Axios otomatis melakukan encodeURIComponent
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-key': '3552f53cf3msh7e68dad01bdb3d3p1868e4jsn5a72595ccc52',
                'x-rapidapi-host': 'social-media-video-downloader.p.rapidapi.com'
            },
            // Menambah timeout agar server tidak gantung terlalu lama
            timeout: 10000 
        };

        const response = await axios.request(options);
        
        // 3. Kirim data kembali ke frontend
        return res.status(200).json(response.data);

    } catch (error) {
        // Log detail error agar bisa dibaca di Dashboard Vercel > Logs
        console.error("LOG ERROR JEQIKA:", error.response ? JSON.stringify(error.response.data) : error.message);
        
        // Mengirim status error yang lebih spesifik ke frontend
        const statusCode = error.response ? error.response.status : 500;
        const errorData = error.response ? error.response.data : { message: error.message };

        return res.status(statusCode).json({
            error: "Terjadi kesalahan pada server",
            detail: errorData
        });
    }
});

// Penting untuk Vercel: Export aplikasi
module.exports = app;
