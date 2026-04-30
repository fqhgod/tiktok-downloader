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
            url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all',
            params: {
                url: url
            },
            headers: {
                // Key ini sesuai dengan screenshot kamu
                'X-RapidAPI-Key': '3552f53cf3msh7e68dad01bdb3d3p1868e4jsn5a72595ccc52',
                'X-RapidAPI-Host': 'social-media-video-downloader.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        
        // Kirim hasil ke frontend
        res.json(response.data);

    } catch (error) {
        console.error("Detail Error:", error.message);
        res.status(500).json({ 
            error: "Gagal mengambil video", 
            detail: error.message 
        });
    }
});

module.exports = app;
