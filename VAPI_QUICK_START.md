# 🚀 Vapi Integration Quick Start

## 🔑 API Keys? Usually NOT Needed!

**For basic webhook integration (Vapi calls your server):**
- ✅ **No API keys needed!** Just configure the webhook URL in Vapi dashboard
- ✅ Works out of the box for development/testing

**Only needed for:**
- 🔒 Production security (optional webhook secret)
- 📞 Initiating calls FROM your website (advanced feature)

## Step-by-Step Setup (5 Minutes)

### 1. Start Your Server
```bash
npm start
```
Server runs on `http://localhost:3000`

### 2. Expose Your Server (Choose One)

**Option A: ngrok (Easiest for Testing)**
```bash
# Install ngrok: https://ngrok.com/download
ngrok http 3000
# Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
```

**Option B: Deploy to Production**
- Deploy to Heroku, Railway, Render, etc.
- Use your production URL

### 3. Configure Vapi Dashboard

1. **Go to**: [dashboard.vapi.ai](https://dashboard.vapi.ai)
2. **Create New Agent**
3. **Add System Prompt** (from `VAPI_AGENT_PROMPT.md`)
4. **Add Functions**:
   - Go to "Functions" section
   - Click "Add Function"
   - Use this URL: `https://your-server-url.com/api/vapi/functions`
   - OR add functions manually (see `VAPI_INTEGRATION_GUIDE.md`)
5. **Set Webhook URL**: `https://your-server-url.com/api/vapi/webhook`
6. **Test**: Click "Test Agent" and try: "Search for hotels in Maldives"

### 4. Test It!

**In Vapi Dashboard:**
- "I want to book a hotel in New York"
- "Show me hotels under $300"
- "Book hotel ID 3 for 2 guests, check-in 2024-12-20, check-out 2024-12-23"

---

## 📋 Available Functions

1. **searchHotels(location, maxPrice, minRating)** - Search hotels
2. **getHotelDetails(hotelId or hotelName)** - Get hotel info
3. **createBooking(hotelId, guestName, email, checkIn, checkOut, guests)** - Book hotel
4. **getBookings(email)** - Get bookings

---

## 🔗 Important URLs

- **Webhook**: `http://localhost:3000/api/vapi/webhook`
- **Functions**: `http://localhost:3000/api/vapi/functions`
- **API Docs**: See `VAPI_INTEGRATION_GUIDE.md`

---

## ⚡ Quick Test

```bash
# Test functions endpoint
curl http://localhost:3000/api/vapi/functions

# Test webhook
curl -X POST http://localhost:3000/api/vapi/webhook \
  -H "Content-Type: application/json" \
  -d '{"message":{"functionCall":{"name":"searchHotels","parameters":{"location":"Maldives"}}}}'
```

---

**Need help?** See `VAPI_INTEGRATION_GUIDE.md` for detailed instructions.

