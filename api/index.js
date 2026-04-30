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
            // URL ini kita ganti ke endpoint yang paling umum digunakan API tersebut
            url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/all',
            params: { url: url },
            headers: {
                'x-rapidapi-key': '3552f53cf3msh7e68dad01bdb3d3p1868e4jsn5a72595ccc52',
                'x-rapidapi-host': 'social-media-video-downloader.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        res.json(response.data);

    } catch (error) {
        // Menampilkan pesan error yang lebih jelas di Logs
        const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
        console.error("Detail Error:", errorMsg);
        
        res.status(500).json({ 
            error: "Gagal mengambil video", 
            detail: errorMsg 
        });
    }
});

module.exports = app;
