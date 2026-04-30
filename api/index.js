const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/download', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "URL tidak boleh kosong" });

        const options = {
            method: 'GET',
            // URL ini diambil langsung dari screenshot RapidAPI Anda
            url: 'https://social-media-video-downloader.p.rapidapi.com/tiktok/v3/post/details',
            params: {
                url: url
            },
            headers: {
                // Key dan Host sesuai dengan screenshot Anda
                'x-rapidapi-key': '3552f53cf3msh7e68dad01bdb3d3p1868e4jsn5a72595ccc52',
                'x-rapidapi-host': 'social-media-video-downloader.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        
        // Kirim data hasil dari RapidAPI langsung ke frontend
        res.json(response.data);

    } catch (error) {
        // Log ini akan muncul di dashboard Vercel jika terjadi masalah
        console.error("Error Detail:", error.response ? JSON.stringify(error.response.data) : error.message);
        
        res.status(500).json({ 
            error: "Gagal mengambil video", 
            detail: error.response ? error.response.data : error.message 
        });
    }
});

module.exports = app;
