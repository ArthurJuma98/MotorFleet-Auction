const express = require("express");
const Auction = require("..models/Auction");
const Router = express.Router();

//create Auction

router.post("/", async (req, res) => {
    try {
        const { title, basePrice, startTime, endTime, imageUrl } = req.body;

        const auction = new Auction({ title, basePrice, startTime, endTime, imageUrl });
        await auction.save();

        res.json(auction);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
});


// router.post("/", async(req, res) => {
//     try {
//         const auction = new Auction(req.body);
//         await auction.save();
//         res.json(auction);
//     } catch(err) {
//         res.status(500).send("Server error")
//     }
// });

//Get Auctions

router.get("/", async(req, res) => {
    const auctions = await Auction.find();
    res.json(auctions);
});

module.exports = Router;