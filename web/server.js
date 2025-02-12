require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Instagram Reels Downloader API
app.get("/download", async (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.status(400).json({ error: "Missing URL parameter" });

    try {
        const response = await axios.get("https://instagram-downloader-api.p.rapidapi.com/reels", {
            params: { url: videoUrl },
            headers: {
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
                "X-RapidAPI-Host": "instagram-downloader-download-instagram-stories-videos4.p.rapidapi.com"
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch video" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
