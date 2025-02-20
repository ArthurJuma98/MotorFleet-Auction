require ("dotenv").config();

const express = require("express");
const connectDB = require(".config/db");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

//connect to Database

connectDB();

//routes

app.use("/api/auctions", require("./routes/auctionRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`server running on port ${PORT}`));