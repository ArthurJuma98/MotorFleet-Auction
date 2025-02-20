const API_URL = "";

// Fetch auctions and display them
async function fetchAuctions() {
    const res = await fetch(`${API_URL}/auctions`);
    const auctions = await res.json();

    let auctionList = document.getElementById("auction-list");
    auctions.forEach(auction => {
        let auctionItem = document.createElement("div");
        auctionItem.innerHTML = `
            <h3>${auction.title}</h3>
            <p>Base Price: $${auction.basePrice}</p>
            <p>Status: ${auction.status}</p>
            <a href="auction.html?id=${auction._id}">View Details</a>
        `;
        auctionList.appendChild(auctionItem);
    });
}

// Fetch auction details
async function fetchAuctionDetails() {
    const params = new URLSearchParams(window.location.search);
    const auctionId = params.get("id");
    
    const res = await fetch(`${API_URL}/auctions/${auctionId}`);
    const auction = await res.json();
    
    document.getElementById("auction-details").innerHTML = `
        <h2>${auction.title}</h2>
        <p>Base Price: $${auction.basePrice}</p>
        <p>Highest Bid: $${auction.highestBid || "No bids yet"}</p>
        <p>Status: ${auction.status}</p>
    `;
}

// Place a bid
async function placeBid() {
    const params = new URLSearchParams(window.location.search);
    const auctionId = params.get("id");
    const bidAmount = document.getElementById("bid-amount").value;

    const res = await fetch(`${API_URL}/bids`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auctionId, amount: bidAmount }),
    });

    if (res.ok) {
        alert("Bid placed successfully!");
        window.location.reload();
    } else {
        alert("Error placing bid!");
    }
}

// Auto-fetch data
if (window.location.pathname.includes("index.html")) fetchAuctions();
if (window.location.pathname.includes("auction.html")) fetchAuctionDetails();