const express = require("express");
const URL = require("../models/url"); // Import the URL model here

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allUrls = await URL.find({});
        return res.render("home", {
            urls: allUrls,
        });
    } catch (error) {
        console.error("Error fetching URLs:", error);
        return res.status(500).json({ error: "Failed to fetch URLs" });
    }
});

module.exports = router;
