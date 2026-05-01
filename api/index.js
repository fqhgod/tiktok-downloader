const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/download', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: "URL TikTok tidak boleh kosong" });
        }

        // Menyusun konfigurasi axios berdasarkan CURL yang kamu berikan
        const options = {
            method: 'GET',
            // URL utama dengan template query parameter
            url: `https://social-media-video-downloader.p.rapidapi.com/tiktok/v3/post/details`,
            params: {
                url: url // Axios akan otomatis melakukan encoding (seperti %2F, %40)
            },
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-host': 'social-media-video-downloader.p.rapidapi.com',
                'x-rapidapi-key': '3552f53cf3msh7e68dad01bdb3d3p1868e4jsn5a72595ccc52'
            }
        };

        console.log("Meminta data untuk URL:", url);

        const response = await axios.request(options);
        
        // Kirim hasil data kembali ke frontend
        res.json(response.data);

    } catch (error) {
        // Log error di dashboard Vercel agar kita tahu penyebab spesifiknya
        console.error("Detail Error Vercel:", error.response ? error.response.data : error.message);
        
        const status = error.response ? error.response.status : 500;
        const message = error.response ? error.response.data : "Internal Server Error";

        res.status(status).json({
            error: "Terjadi kesalahan pada server",
            detail: message
        });
    }
});

module.exports = app;
