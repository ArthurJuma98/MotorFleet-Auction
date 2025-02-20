const express = require("express");
const Auction = require("../models/Auction");
const router = express.Router();

//create Auction

router.post("/", async (req, res) => {
    try {
        const { title, basePrice, startTime, endTime } = req.body;

        const auction = new Auction({ title, basePrice, startTime, endTime });
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

router.get("/:id", async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id);
        if (!auction) {
            return res.status(404).json({ msg: "Auction not found" });
        }
        res.json(auction);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
});

module.exports = router;