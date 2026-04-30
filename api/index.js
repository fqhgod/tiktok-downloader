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
            method: 'POST',
            url: 'https://tik-tok-video-downloader-api.p.rapidapi.com/vid/index',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 3552f53cf3msh7e68dad01bdb3d3p1868e4jsn5a72595ccc52
                'X-RapidAPI-Host': 'tik-tok-video-downloader-api.p.rapidapi.com'
            },
            data: new URLSearchParams({ url: url })
        };

        const response = await axios.request(options);
        res.json(response.data);

    } catch (error) {
        console.error("Error Detail:", error.message);
        res.status(500).json({ error: "Gagal mengambil video. Cek API Key atau link video." });
    }
});

module.exports = app;
