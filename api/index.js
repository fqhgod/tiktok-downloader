const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// ROUTE UTAMA
app.post('/api/download', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "URL kosong" });

        // LOGIKA DOWNLOAD KAMU DISINI (Gunakan kode yang sudah berhasil di localhost)
        // ... kode axios kamu ...
        
        res.json({ title: "Judul", videoUrl: "LinkVideo", cover: "LinkCover" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Gagal mengambil video" });
    }
});

// WAJIB: Export app, BUKAN app.listen
module.exports = app;
