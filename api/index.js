const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Menangani POST (untuk proses download utama)
app.post('/api/download', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "URL tidak boleh kosong" });

        const options = {
            method: 'GET',
            url: 'https://social-media-video-downloader.p.rapidapi.com/tiktok/v3/post/details',
            params: { url: url },
            headers: {
                'x-rapidapi-key': '3552f53cf3msh7e68dad01bdb3d3p1868e4jsn5a72595ccc52',
                'x-rapidapi-host': 'social-media-video-downloader.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        res.status(200).json(response.data);

    } catch (error) {
        console.error("Error Detail:", error.response ? JSON.stringify(error.response.data) : error.message);
        res.status(500).json({ 
            error: "Gagal mengambil video", 
            detail: error.response ? error.response.data : error.message 
        });
    }
});

// Menambahkan penanganan GET agar tidak muncul error "Cannot GET" jika link diakses langsung
app.get('/api/download', (req, res) => {
    res.status(200).send("API Jeqika Downloader sedang berjalan. Gunakan metode POST untuk mengunduh video.");
});

module.exports = app;
