# 🚗 Modern Auction Platform

## 📌 Overview
The **Modern Auction Platform** is a full-stack web application designed for users to create, browse, and bid on auctions, particularly for vehicles. The platform features a responsive frontend, a secure backend, and a well-structured database system. It also integrates real-time image uploads and WhatsApp notifications for auction updates.

## 🎯 Features
- **Auction Listings:** Users can browse all available auctions with details.
- **Auction Details Page:** Users can view individual auction information and place bids.
- **Bidding System:** Allows users to place bids, ensuring only valid amounts are accepted.
- **Auction Creation:** Users can create auctions with a title, base price, duration, and images.
- **Image Uploads:** Uses GridFS for secure and efficient file storage.
- **WhatsApp Notifications:** Sends real-time notifications when an auction ends.
- **Automated Auction Completion:** Automatically transitions auctions to "ended" when the timer runs out.

## 🔧 Technologies Used
### Frontend
- **HTML, CSS, JavaScript**
- **Responsive UI with Modern Styling**

### Backend
- **Node.js & Express.js**
- **MongoDB with Mongoose**
- **GridFS for Image Storage**
- **Multer for File Uploads**
- **WhatsApp API for Notifications**

## 📂 File Structure and Responsibilities
### 🌐 Frontend Files
- **`index.html`** - Displays all active auctions.
- **`auction.html`** - Shows auction details and allows users to place bids.
- **`create-auction.html`** - Enables users to list new auctions.
- **`styles.css`** - Manages the application's design and layout.
- **`app.js`** - Handles fetching auction data, displaying listings, placing bids, and API interactions.

### 🖥 Backend Files
#### 📌 Configuration
- **`server.js`** - The main entry point for the backend, setting up routes, database connections, and middleware.
- **`db.js`** - Handles MongoDB database connection.
- **`gridfs.js`** - Configures GridFS for image storage.

#### 📌 Models
- **`Auction.js`** - Defines the schema for auctions, including title, base price, highest bid, and auction status.
- **`Bid.js`** - Defines the schema for bids, linking each bid to an auction with amount and user details.

#### 📌 API Routes
- **`auctionRoutes.js`** - Handles auction-related operations (creating, retrieving auctions).
- **`bidRoutes.js`** - Manages bid operations and ensures valid bidding rules.
- **`uploadRoutes.js`** - Manages image uploads via GridFS and Multer.

#### 📌 Services
- **`whatsappService.js`** - Uses WhatsApp API to send auction notifications to users when an auction ends.

### ⚙ Configuration & Dependencies
- **`package.json`** - Lists required dependencies, including Express, Mongoose, Multer, WhatsApp-web.js, and Dotenv.

## 🚀 Installation & Setup
To set up and run the project locally:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo-url.git
   ```
2. Navigate to the project directory:
   ```sh
   cd auction-project
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables (`.env` file):
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
5. Start the backend server:
   ```sh
   npm start
   ```
6. Open `frontend/index.html` in a browser or serve it with a local server:
   ```sh
   npx live-server
   ```

## 📡 API Endpoints
### 🔹 Auction Routes
- **Create Auction:** `POST /api/auctions`
- **Get Auction by ID:** `GET /api/auctions/:id`

### 🔹 Bid Routes
- **Place a Bid:** `POST /api/bids`

### 🔹 Upload Routes
- **Upload Image:** `POST /api/upload`
- **Get Image:** `GET /api/upload/:id`

## 📖 Usage Guide
### 🔍 Browsing Auctions
1. Open `index.html` in a browser.
2. Browse the auction listings.
3. Click on an auction to view its details.

### 🎯 Placing a Bid
1. Navigate to an auction’s details page.
2. Enter a valid bid amount.
3. Submit the bid and refresh to see updates.

### 📝 Creating an Auction
1. Open `create-auction.html`.
2. Fill in the auction details and upload an image.
3. Submit the form to create an auction.

## 🚀 Future Enhancements
- **User Authentication:** Implement user accounts and login functionality.
- **Live Bidding Updates:** Use WebSockets for real-time updates.
- **Admin Dashboard:** Provide administrative controls for auction management.

## 🤝 Contributing
Want to contribute?
1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

## 📜 License


## 📬 Contact
