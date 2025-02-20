const API_URL = "https://motorfleet-auction.onrender.com/api";

// Fetch auctions and display them with images
async function fetchAuctions() {
    try {
        const res = await fetch(`${API_URL}/auctions`);
        const auctions = await res.json();

        let auctionList = document.getElementById("auction-list");
        auctionList.innerHTML = ""; // Clear previous content

        auctions.forEach(auction => {
            let auctionItem = document.createElement("div");
            auctionItem.classList.add("auction-card");

            auctionItem.innerHTML = `
                <img src="${auction.imageUrl || 'default-car.jpg'}" alt="${auction.title}">
                <h3>${auction.title}</h3>
                <p>Base Price: $${auction.basePrice}</p>
                <p>Status: <strong>${auction.status}</strong></p>
                <a href="auction.html?id=${auction._id}">
                    <button>View Details</button>
                </a>
            `;

            auctionList.appendChild(auctionItem);
        });
    } catch (error) {
        console.error("Error fetching auctions:", error);
    }
}

// Fetch auction details
async function fetchAuctionDetails() {
    const params = new URLSearchParams(window.location.search);
    const auctionId = params.get("id");

    try {
        const res = await fetch(`${API_URL}/auctions/${auctionId}`);
        const auction = await res.json();

        document.getElementById("auction-details").innerHTML = `
            <img src="${auction.imageUrl || 'default-car.jpg'}" alt="${auction.title}" style="width:100%; border-radius:10px;">
            <h2>${auction.title}</h2>
            <p>Base Price: $${auction.basePrice}</p>
            <p>Highest Bid: $${auction.highestBid || "No bids yet"}</p>
            <p>Status: <strong>${auction.status}</strong></p>
        `;
    } catch (error) {
        console.error("Error fetching auction details:", error);
    }
}

// Place a bid
async function placeBid() {
    const params = new URLSearchParams(window.location.search);
    const auctionId = params.get("id");
    const bidAmount = document.getElementById("bid-amount").value;

    if (!bidAmount) {
        alert("Please enter a bid amount!");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/bids`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ auctionId, amount: bidAmount, user: "Guest User" }),
        });

        if (res.ok) {
            alert("Bid placed successfully!");
            window.location.reload();
        } else {
            alert("Error placing bid. Make sure it's above the base price.");
        }
    } catch (error) {
        console.error("Error placing bid:", error);
    }
}

//upload images

async function uploadImage(file) {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("https://motorfleet-auction.onrender.com/api/upload", {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    return `https://motorfleet-auction.onrender.com/api/upload/${data.imageId}`;
}

// Auto-fetch data
if (window.location.pathname.includes("index.html")) fetchAuctions();
if (window.location.pathname.includes("auction.html")) fetchAuctionDetails();
