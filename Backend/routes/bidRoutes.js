const express = require("express");
const Bid = require("../models/Bid");
const Auction = require("../models/Auction");

const router = express.Router();

// Place a bid
router.post("/", async (req, res) => {
    try {
        const { auctionId, amount, user } = req.body;

        const auction = await Auction.findById(auctionId);
        if (!auction || auction.status !== "active") {
            return res.status(400).json({ msg: "Auction is not active" });
        }

        if (amount < auction.basePrice) {
            return res.status(400).json({ msg: "Bid must be at least the base price" });
        }

        const bid = new Bid({ auctionId, amount, user });
        await bid.save();

        // Update auction if highest bid
        if (amount > auction.highestBid) {
            auction.highestBid = amount;
            auction.highestBidder = user;
            await auction.save();
        }

        res.json({ msg: "Bid placed successfully!", bid });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
});

module.exports = router;