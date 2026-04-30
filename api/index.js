const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/download', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "URL kosong" });

        const options = {
            method: 'GET',
            url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all',
            params: {
                url: url
            },
            headers: {
                // Gunakan Key dari screenshot kamu
                'x-rapidapi-key': '3552f53cf3msh7e68dad01bdb3d3p1868e4jsn5a72595ccc52,
                'x-rapidapi-host': 'social-media-video-downloader.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        
        // Pastikan kita mengirim data yang benar ke frontend
        res.json(response.data);

    } catch (error) {
        console.error("Detail Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: "Gagal mengambil video", 
            message: error.message 
        });
    }
});

module.exports = app;
