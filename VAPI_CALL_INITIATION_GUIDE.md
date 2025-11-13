# 📞 Vapi Call Initiation Guide

Complete guide to initiate phone calls FROM your website using Vapi API.

## 🎯 Overview

This feature allows users on your website to request a call from your Vapi AI agent. When a user clicks "Call Support", your server initiates a call to their phone number using the Vapi API.

## ✅ Prerequisites

1. **Vapi API Key**: Get from [Vapi Dashboard → Settings → API Keys](https://dashboard.vapi.ai/settings/api-keys)
2. **Vapi Agent ID**: Get from [Vapi Dashboard → Agents](https://dashboard.vapi.ai/agents) (click on your agent, copy the ID)
3. **Node.js server** with the call initiation endpoint

## 🔧 Setup

### Step 1: Install Dependencies

```bash
npm install
```

This installs `node-fetch` which is needed for making API calls to Vapi.

### Step 2: Configure Environment Variables

Create a `.env` file in your project root:

```bash
# Required for call initiation
VAPI_API_KEY=your-vapi-api-key-here
VAPI_AGENT_ID=your-vapi-agent-id-here

# Optional: Webhook secret
VAPI_WEBHOOK_SECRET=your-webhook-secret-here

# Optional: Server port
PORT=3000
```

### Step 3: Get Your Credentials

#### Get Vapi API Key:
1. Go to [Vapi Dashboard](https://dashboard.vapi.ai)
2. Navigate to **Settings → API Keys**
3. Click **"Create API Key"** or copy existing key
4. Copy the key (starts with something like `sk_...`)

#### Get Vapi Agent ID:
1. Go to [Vapi Dashboard → Agents](https://dashboard.vapi.ai/agents)
2. Click on your hotel booking agent
3. Copy the **Agent ID** from the URL or agent details
4. It looks like: `agent_abc123...` or just a UUID

### Step 4: Restart Your Server

```bash
npm start
```

You should see:
```
📞 Call Initiation: http://localhost:3000/api/vapi/initiate-call
```

## 🚀 Usage

### From Your Website

Users can click the **"📞 Call Support"** button in the header to:
1. Enter their phone number
2. Optionally provide their name and email
3. Click "Request Call"
4. Your Vapi agent will call them immediately

### API Endpoint

You can also initiate calls programmatically:

```javascript
// POST /api/vapi/initiate-call
fetch('/api/vapi/initiate-call', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    phoneNumber: '+1234567890',  // Required: Include country code
    customerName: 'John Smith',   // Optional
    customerEmail: 'john@example.com',  // Optional
    context: {                     // Optional: Pass data to agent
      bookingId: '123',
      hotelName: 'Grand Paradise Resort'
    }
  })
})
.then(res => res.json())
.then(data => {
  console.log('Call initiated:', data);
});
```

### Request Body

```json
{
  "phoneNumber": "+1234567890",      // Required: Phone number with country code
  "customerName": "John Smith",      // Optional: Customer name
  "customerEmail": "john@example.com", // Optional: Customer email
  "context": {                        // Optional: Additional context for agent
    "bookingId": "123",
    "hotelName": "Grand Paradise Resort"
  }
}
```

### Response

**Success:**
```json
{
  "success": true,
  "message": "Call initiated successfully",
  "call": {
    "id": "call_abc123...",
    "status": "queued",
    "phoneNumber": "+1234567890",
    "createdAt": "2024-12-11T10:30:00Z"
  }
}
```

**Error:**
```json
{
  "error": "Vapi API key not configured",
  "message": "Please set VAPI_API_KEY in your .env file."
}
```

## 📋 Available Endpoints

### 1. Initiate Call
```
POST /api/vapi/initiate-call
```
Initiates a call to the specified phone number.

### 2. Get Call Status
```
GET /api/vapi/call-status/:callId
```
Gets the status of a specific call.

**Example:**
```bash
curl http://localhost:3000/api/vapi/call-status/call_abc123
```

## 🎨 Frontend Integration

The call button is already integrated in your website:

1. **Header Button**: "📞 Call Support" button in the navigation
2. **Call Modal**: Opens when clicked, collects phone number
3. **Auto-fill**: Pre-fills name/email if user has booking info

### Customize the Call Button

You can add call buttons anywhere:

```html
<button onclick="openCallModal()">Call Support</button>
```

Or initiate calls directly:

```javascript
async function callCustomer(phoneNumber) {
  const response = await fetch('/api/vapi/initiate-call', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber })
  });
  const result = await response.json();
  console.log(result);
}
```

## 🔍 Testing

### Test 1: Test the Endpoint

```bash
curl -X POST http://localhost:3000/api/vapi/initiate-call \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+1234567890",
    "customerName": "Test User",
    "customerEmail": "test@example.com"
  }'
```

### Test 2: Test from Website

1. Start your server: `npm start`
2. Open `http://localhost:3000`
3. Click "📞 Call Support" button
4. Enter a phone number (with country code)
5. Click "Request Call"
6. Check your phone - you should receive a call!

### Test 3: Check Call Status

After initiating a call, use the call ID to check status:

```bash
curl http://localhost:3000/api/vapi/call-status/CALL_ID_HERE
```

## ⚠️ Troubleshooting

### Error: "Vapi API key not configured"

**Solution:**
- Make sure you created a `.env` file
- Add `VAPI_API_KEY=your-key-here`
- Restart your server

### Error: "Vapi Agent ID not configured"

**Solution:**
- Add `VAPI_AGENT_ID=your-agent-id-here` to `.env`
- Get agent ID from Vapi dashboard
- Restart your server

### Error: "Failed to initiate call"

**Possible causes:**
- Invalid API key
- Invalid agent ID
- Invalid phone number format
- Vapi API is down

**Solution:**
- Verify API key is correct
- Verify agent ID is correct
- Ensure phone number includes country code (e.g., +1 for US)
- Check Vapi dashboard for API status

### Call Not Received

**Check:**
1. Phone number format (must include country code)
2. Vapi account has credits/balance
3. Phone number is valid and can receive calls
4. Check call status endpoint for error details

## 💡 Advanced Usage

### Pass Context to Agent

You can pass additional context that your agent can use:

```javascript
fetch('/api/vapi/initiate-call', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phoneNumber: '+1234567890',
    customerName: 'John Smith',
    context: {
      bookingId: '123',
      hotelName: 'Grand Paradise Resort',
      checkIn: '2024-12-20',
      checkOut: '2024-12-23'
    }
  })
});
```

Your agent can access this context in the conversation.

### Customize Call Behavior

Edit `server.js` to customize:
- Phone number formatting
- Default values
- Error handling
- Call metadata

## 📚 Additional Resources

- [Vapi API Documentation](https://docs.vapi.ai/api-reference)
- [Vapi Dashboard](https://dashboard.vapi.ai)
- [Vapi Function Calling Guide](https://docs.vapi.ai/function-calling)

---

**Your call initiation feature is ready! Users can now request calls directly from your website. 🎉**

