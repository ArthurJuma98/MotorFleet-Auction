require ("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const sendWhatsappMessage = require("./services/whatsappService");


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/upload", require("./routes/uploadRoutes"));

//connect to Database

connectDB();

//routes

app.get("/", (req, res) => {
    res.send("Auction API is running...");
});

app.use("/api/auctions", require("./routes/auctionRoutes"));
app.use("/api/bids", require("./routes/bidRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));

//localhost for frontend

const path = require("path");

// Serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});


//Auction end simulation

const endAuction = async () => {
    const auctions = await Auction.find({ status: "active", endTime: { $lte: newDate() } });

    for (let auction of auctions) {
        auction.status = "ended";
        await auction.save();

        sendWhatsappMessage(`Auction ended! Item: ${auction.title}, Winning Bid: ${auction.highestBid}`);

    }

    //interval run checkup(every minute)
    setInterval(endAuction, 60000);

}