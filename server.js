const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/download', async (req, res) => {
    const { url } = req.body;
    try {
        const response = await axios.get(`https://www.tikwm.com/api/?url=${url}`);
        const data = response.data.data;
        if (data) {
            res.json({
                title: data.title,
                videoUrl: data.play,
                cover: data.cover
            });
        } else {
            res.status(400).json({ error: "Gagal ambil data" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});