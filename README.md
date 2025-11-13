# 🏨 Hotel Booking Website

End-to-end AI hotel booking system with real-time room availability, dynamic pricing, and WhatsApp booking confirmation.

A modern, fully functional hotel booking website with search, filtering, and reservation features.

## ✨ Features

- **Hotel Listings**: Browse 6 beautiful hotels from around the world
- **Search & Filter**: Search by location, price range, and minimum rating
- **Booking System**: Complete booking form with date selection and guest count
- **My Bookings**: View all your confirmed reservations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Beautiful, clean interface with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and visit:
```
http://localhost:3000
```

## 📁 Project Structure

```
hotel-booking-website/
├── server.js          # Express server with API endpoints
├── package.json       # Project dependencies
├── public/
│   ├── index.html     # Main HTML page
│   ├── styles.css     # Styling
│   └── script.js      # Frontend JavaScript
└── README.md          # This file
```

## 🎯 API Endpoints

- `GET /api/hotels` - Get all hotels (supports query params: location, minPrice, maxPrice, minRating)
- `GET /api/hotels/:id` - Get a specific hotel by ID
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get all bookings
- `POST /api/vapi/initiate-call` - Initiate a call through Vapi AI agent
- `GET /api/vapi/call-status/:callId` - Check status of a Vapi-initiated call

## 🏨 Available Hotels

1. **Grand Paradise Resort** - Maldives ($299/night)
2. **Mountain View Lodge** - Switzerland ($189/night)
3. **Urban Luxury Hotel** - New York ($349/night)
4. **Tropical Beach Villa** - Bali ($159/night)
5. **Historic Grand Hotel** - Paris ($279/night)
6. **Desert Oasis Resort** - Dubai ($399/night)

## 💡 Usage

1. **Search Hotels**: Use the search form at the top to filter hotels by location, price, or rating
2. **View Details**: Click on any hotel card to see amenities and description
3. **Book a Hotel**: Click "Book Now" on any hotel card
4. **Complete Booking**: Fill in your details, select dates, and confirm
5. **View Bookings**: Navigate to "My Bookings" section to see all your reservations
6. **Call Support**: Click "Call Support" to have the Vapi AI agent call you back instantly

## 🔧 Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Modern CSS with Flexbox and Grid
- **AI Integration**: Vapi AI agent for conversational booking support and callback initiation

## 📝 Notes

- All bookings are stored in memory (will reset when server restarts)
- In a production environment, you would use a database (MongoDB, PostgreSQL, etc.)
- The hotel images are emoji placeholders - replace with actual images in production

## 🐛 Troubleshooting

If you encounter any issues:

1. Make sure Node.js and npm are installed correctly
2. Delete `node_modules` and `package-lock.json`, then run `npm install` again
3. Check that port 3000 is not already in use
4. Ensure all files are in the correct directories
5. Verify environment variables are set for Vapi integration (`VAPI_API_KEY`, `VAPI_AGENT_ID`, optional `VAPI_WEBHOOK_SECRET`)

## 📄 License

This project is open source and available for personal and commercial use.

---

**Enjoy booking your perfect stay! 🎉**
