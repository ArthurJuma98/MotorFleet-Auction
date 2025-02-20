const mongoose = require("mongoose");

const BidSchema = new mongoose.Schema({
    auctionId: { type: mongoose.Schema.Types.ObjectId, ref: "Auction", required: true },
    user: { type: String, required: true }, // Simulated username
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bid", BidSchema);