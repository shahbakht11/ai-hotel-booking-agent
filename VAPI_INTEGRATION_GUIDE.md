# 🔗 Vapi AI Agent Integration Guide

Complete guide to connect your Vapi AI agent with your hotel booking website.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Server Setup](#server-setup)
3. [Expose Your Server](#expose-your-server)
4. [Vapi Dashboard Configuration](#vapi-dashboard-configuration)
5. [Function Definitions](#function-definitions)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

- Your hotel booking server is running on `http://localhost:3000`
- You have a Vapi account (sign up at [vapi.ai](https://vapi.ai))
- Node.js and npm installed

## 🔑 API Keys - When Do You Need Them?

### **Short Answer: Usually NOT needed for basic integration!**

Here's when you need API keys:

### ❌ **NOT Needed** (Most Common Case):
- **Webhook Integration**: When Vapi calls YOUR server (function calling)
  - Vapi calls your webhook endpoint
  - You just need to configure the webhook URL in Vapi dashboard
  - No API keys required on your server

### ✅ **Needed** (Optional Advanced Features):
- **Initiating Calls**: If you want to start phone calls FROM your website
  - You'd use Vapi API to create calls programmatically
  - Get API key from: [Vapi Dashboard → Settings → API Keys](https://dashboard.vapi.ai/settings/api-keys)
  - Store in `.env` file as `VAPI_API_KEY`

- **Webhook Security** (Recommended for Production):
  - Optional webhook secret to verify requests are from Vapi
  - Set in Vapi dashboard under webhook settings
  - Store in `.env` file as `VAPI_WEBHOOK_SECRET`

### 📝 Summary:
- **Basic Integration**: No API keys needed ✅
- **Production Security**: Add webhook secret (optional but recommended) 🔒
- **Initiating Calls**: Need API key (only if you want to start calls from your site) 📞

---

## 🚀 Server Setup

Your server is already configured with Vapi integration! 

### Environment Variables (Optional)

Create a `.env` file in your project root (optional - only for production security):

```bash
# Optional: Webhook secret for securing your webhook endpoint
VAPI_WEBHOOK_SECRET=your-webhook-secret-here

# Optional: Vapi API Key (only if you want to initiate calls FROM your website)
VAPI_API_KEY=your-vapi-api-key-here
```

**Note**: For development/testing, you can skip the `.env` file. The server works without it!

The following endpoints are available:

### Available Endpoints:

1. **Webhook Endpoint** (for function calls):
   ```
   POST http://localhost:3000/api/vapi/webhook
   ```

2. **Function Definitions** (for Vapi dashboard):
   ```
   GET http://localhost:3000/api/vapi/functions
   ```

3. **Existing API Endpoints**:
   - `GET /api/hotels` - Get all hotels (with filters)
   - `GET /api/hotels/:id` - Get specific hotel
   - `POST /api/bookings` - Create booking
   - `GET /api/bookings` - Get all bookings

### Available Functions for Vapi:

1. **`searchHotels`** - Search hotels by location, price, rating
2. **`getHotelDetails`** - Get details of a specific hotel
3. **`createBooking`** - Create a new hotel booking
4. **`getBookings`** - Retrieve bookings (optionally by email)

---

## 🌐 Expose Your Server

Since Vapi needs to reach your server, you have two options:

### Option 1: Use ngrok (Recommended for Testing)

1. **Install ngrok**:
   ```bash
   # Download from https://ngrok.com/download
   # Or use npm:
   npm install -g ngrok
   ```

2. **Start your server**:
   ```bash
   npm start
   ```

3. **Expose your server**:
   ```bash
   ngrok http 3000
   ```

4. **Copy the HTTPS URL** (e.g., `https://abc123.ngrok.io`)

### Option 2: Deploy to Production

Deploy your server to:
- **Heroku**: `https://your-app.herokuapp.com`
- **Railway**: `https://your-app.railway.app`
- **Render**: `https://your-app.onrender.com`
- **Vercel**: `https://your-app.vercel.app`
- **Any cloud provider**

**Important**: Update the base URL in Vapi configuration to your deployed URL.

---

## ⚙️ Vapi Dashboard Configuration

### Step 1: Create a New Agent

1. Log in to [Vapi Dashboard](https://dashboard.vapi.ai)
2. Click "Create New Agent"
3. Give it a name (e.g., "Hotel Booking Assistant")

### Step 2: Configure System Prompt

1. Go to **"System Message"** or **"Agent Instructions"**
2. Copy the prompt from `VAPI_AGENT_PROMPT.md` or use the one below:

```
You are a friendly hotel booking assistant. Help customers find and book hotels.

When you need to search hotels, use the searchHotels function.
When you need hotel details, use the getHotelDetails function.
When ready to book, use the createBooking function with all required information.
```

### Step 3: Add Function Calling

1. Go to **"Functions"** or **"Tools"** section
2. Click **"Add Function"** or **"Import Functions"**

#### Method A: Import from URL (Easiest)

If your server is exposed, use:
```
https://your-server-url.com/api/vapi/functions
```

#### Method B: Add Functions Manually

Add these 4 functions one by one:

##### Function 1: searchHotels
```json
{
  "name": "searchHotels",
  "description": "Search for hotels based on location, price, and rating filters",
  "parameters": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "Location or destination name (e.g., 'Maldives', 'New York', 'Bali')"
      },
      "maxPrice": {
        "type": "number",
        "description": "Maximum price per night in dollars"
      },
      "minRating": {
        "type": "number",
        "description": "Minimum star rating (e.g., 4.5, 4.0)"
      }
    }
  }
}
```

##### Function 2: getHotelDetails
```json
{
  "name": "getHotelDetails",
  "description": "Get detailed information about a specific hotel",
  "parameters": {
    "type": "object",
    "properties": {
      "hotelId": {
        "type": "number",
        "description": "Hotel ID number"
      },
      "hotelName": {
        "type": "string",
        "description": "Hotel name (alternative to hotelId)"
      }
    }
  }
}
```

##### Function 3: createBooking
```json
{
  "name": "createBooking",
  "description": "Create a new hotel booking reservation",
  "parameters": {
    "type": "object",
    "required": ["hotelId", "guestName", "email", "checkIn", "checkOut", "guests"],
    "properties": {
      "hotelId": {
        "type": "number",
        "description": "ID of the hotel to book"
      },
      "guestName": {
        "type": "string",
        "description": "Full name of the guest"
      },
      "email": {
        "type": "string",
        "description": "Email address for booking confirmation"
      },
      "checkIn": {
        "type": "string",
        "description": "Check-in date in YYYY-MM-DD format"
      },
      "checkOut": {
        "type": "string",
        "description": "Check-out date in YYYY-MM-DD format (must be after check-in)"
      },
      "guests": {
        "type": "number",
        "description": "Number of guests (1-10)"
      }
    }
  }
}
```

##### Function 4: getBookings
```json
{
  "name": "getBookings",
  "description": "Retrieve booking information, optionally filtered by email",
  "parameters": {
    "type": "object",
    "properties": {
      "email": {
        "type": "string",
        "description": "Email address to filter bookings (optional)"
      }
    }
  }
}
```

### Step 4: Configure Server URL

1. Go to **"Server URL"** or **"Webhook URL"** section
2. Enter your server URL:
   - **For ngrok**: `https://your-ngrok-url.ngrok.io/api/vapi/webhook`
   - **For production**: `https://your-domain.com/api/vapi/webhook`

### Step 5: Configure Webhook Security (Optional but Recommended)

1. In Vapi dashboard, find **"Webhook Secret"** or **"Authentication"** section
2. Generate or set a secret key (e.g., `my-secret-key-123`)
3. Add this to your `.env` file:
   ```
   VAPI_WEBHOOK_SECRET=my-secret-key-123
   ```
4. Restart your server

**Note**: If you don't set a secret, the webhook will still work (for development). But for production, it's recommended to secure it!

### Step 6: Configure Function Server

For each function, set the **Server URL** to:
```
https://your-server-url.com/api/vapi/webhook
```

Or if Vapi has a "Function Server" setting, use the same URL.

---

## 📝 Function Definitions Reference

### Function Request Format

When Vapi calls your webhook, it sends:
```json
{
  "message": {
    "functionCall": {
      "name": "searchHotels",
      "parameters": {
        "location": "Maldives",
        "maxPrice": 300
      }
    }
  }
}
```

### Function Response Format

Your server should return:
```json
{
  "result": {
    "hotels": [...],
    "count": 3
  }
}
```

---

## 🧪 Testing

### Test 1: Test Webhook Endpoint

Use curl or Postman to test:

```bash
curl -X POST http://localhost:3000/api/vapi/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "message": {
      "functionCall": {
        "name": "searchHotels",
        "parameters": {
          "location": "Maldives"
        }
      }
    }
  }'
```

Expected response:
```json
{
  "result": {
    "hotels": [...],
    "count": 1
  }
}
```

### Test 2: Test Function Definitions

```bash
curl http://localhost:3000/api/vapi/functions
```

Should return all function definitions.

### Test 3: Test in Vapi Dashboard

1. Go to your agent in Vapi dashboard
2. Click "Test" or "Try Agent"
3. Say: "I want to search for hotels in Maldives"
4. The agent should call `searchHotels` function
5. Verify the response is correct

### Test 4: Complete Booking Flow

1. Test search: "Show me hotels in New York under $400"
2. Test details: "Tell me more about Urban Luxury Hotel"
3. Test booking: "I want to book hotel ID 3 for 2 guests, check-in 2024-12-20, check-out 2024-12-23, name John Smith, email john@example.com"

---

## 🔧 Troubleshooting

### Issue: Vapi can't reach my server

**Solution:**
- Make sure your server is running
- If using ngrok, ensure it's active
- Check that the URL in Vapi dashboard is correct
- Verify CORS is enabled (already done in server.js)

### Issue: Functions not being called

**Solution:**
- Check function names match exactly (case-sensitive)
- Verify function definitions are added in Vapi dashboard
- Check server logs for incoming requests
- Ensure webhook URL is correct

### Issue: Function returns error

**Solution:**
- Check server console for error messages
- Verify request format matches expected format
- Test the endpoint directly with curl/Postman
- Check that all required parameters are provided

### Issue: CORS errors

**Solution:**
- CORS is already configured in server.js
- If still having issues, check browser console
- Verify server is sending correct CORS headers

### Issue: Date format errors

**Solution:**
- Dates must be in YYYY-MM-DD format
- Validate dates in your Vapi prompt
- Check that check-out is after check-in

---

## 📞 Support

If you encounter issues:

1. Check server logs: `npm start` shows all requests
2. Test endpoints directly with curl/Postman
3. Verify Vapi dashboard configuration
4. Check function definitions match exactly

---

## 🎉 Next Steps

Once integrated:

1. **Test thoroughly** with various scenarios
2. **Monitor bookings** at `/api/bookings`
3. **Customize the agent prompt** for your brand voice
4. **Add more functions** if needed (e.g., cancel booking, modify booking)
5. **Deploy to production** when ready

---

## 📚 Additional Resources

- [Vapi Documentation](https://docs.vapi.ai)
- [Function Calling Guide](https://docs.vapi.ai/function-calling)
- [Webhook Configuration](https://docs.vapi.ai/webhooks)

---

**Your server is ready! Just expose it and configure Vapi dashboard. 🚀**

