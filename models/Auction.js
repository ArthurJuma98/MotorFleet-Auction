const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({
    title: String,
    basePrice: Number,
    startTime: Date,
    endTime: Date,
    highestBid: { type: Number, default: 0 },
    highestBidder: { type: String, default: null },
    status: { type: String, enum: ["upcoming", "active", "ended"], default: "upcoming" },
});

module.exports = mongoose.model("Auction", AuctionSchema);