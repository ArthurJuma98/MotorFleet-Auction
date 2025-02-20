const express = require("express");
const multer = require("multer");
const bucket = require("../config/firebase");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); 

// Upload Image to Firebase
router.post("/", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

        const file = bucket.file(`auction-images/${Date.now()}_${req.file.originalname}`);
        const stream = file.createWriteStream({ metadata: { contentType: req.file.mimetype } });

        stream.on("error", (err) => res.status(500).json({ msg: "Upload failed", error: err }));

        stream.on("finish", async () => {
            await file.makePublic();  
            const imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
            res.json({ imageUrl });
        });

        stream.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
});

module.exports = router;