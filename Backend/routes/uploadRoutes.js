const express = require("express");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
require("dotenv").config();

const router = express.Router();

// Setup GridFS Storage
const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return { filename: `${Date.now()}_${file.originalname}`, bucketName: "uploads" };
    },
});

const upload = multer({ storage });

// Upload Image
router.post("/", upload.single("image"), (req, res) => {
    res.json({ imageId: req.file.id });
});

// Get Image
router.get("/:id", async (req, res) => {
    const gfs = require("../config/gridfs");
    gfs.files.findOne({ _id: mongoose.Types.ObjectId(req.params.id) }, (err, file) => {
        if (!file || file.length === 0) return res.status(404).json({ msg: "No file found" });

        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    });
});

module.exports = router;