// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Environment variables (optional - for webhook security)
const VAPI_WEBHOOK_SECRET = process.env.VAPI_WEBHOOK_SECRET || null;
const VAPI_API_KEY = process.env.VAPI_API_KEY || null; // Only needed if you want to initiate calls FROM your website
const VAPI_AGENT_ID = process.env.VAPI_AGENT_ID || null; // Your Vapi agent ID (get from dashboard)
const IS_VERCEL = Boolean(process.env.VERCEL);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files - handle both local and Vercel paths
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// CORS middleware for Vapi integration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Mock hotel data
const hotels = [
  {
    id: 1,
    name: "Grand Paradise Resort",
    location: "Maldives",
    price: 299,
    rating: 4.8,
    image: "🏝️",
    amenities: ["Pool", "Spa", "Beach Access", "WiFi", "Restaurant"],
    description: "Luxurious beachfront resort with stunning ocean views and world-class amenities."
  },
  {
    id: 2,
    name: "Mountain View Lodge",
    location: "Switzerland",
    price: 189,
    rating: 4.6,
    image: "🏔️",
    amenities: ["Skiing", "Hot Tub", "Fireplace", "WiFi", "Breakfast"],
    description: "Cozy alpine lodge perfect for winter sports enthusiasts and nature lovers."
  },
  {
    id: 3,
    name: "Urban Luxury Hotel",
    location: "New York",
    price: 349,
    rating: 4.9,
    image: "🏙️",
    amenities: ["Gym", "Rooftop Bar", "Concierge", "WiFi", "Room Service"],
    description: "Modern downtown hotel in the heart of the city with premium services."
  },
  {
    id: 4,
    name: "Tropical Beach Villa",
    location: "Bali",
    price: 159,
    rating: 4.7,
    image: "🌴",
    amenities: ["Private Beach", "Yoga", "Spa", "WiFi", "Restaurant"],
    description: "Peaceful tropical retreat with traditional architecture and serene atmosphere."
  },
  {
    id: 5,
    name: "Historic Grand Hotel",
    location: "Paris",
    price: 279,
    rating: 4.8,
    image: "🏛️",
    amenities: ["Museum Access", "Fine Dining", "Spa", "WiFi", "Concierge"],
    description: "Elegant historic hotel with classic European charm and modern comforts."
  },
  {
    id: 6,
    name: "Desert Oasis Resort",
    location: "Dubai",
    price: 399,
    rating: 4.9,
    image: "🏜️",
    amenities: ["Infinity Pool", "Spa", "Fine Dining", "WiFi", "Butler Service"],
    description: "Ultra-luxurious desert resort with breathtaking architecture and premium amenities."
  }
];

// Store bookings (in production, use a database)
let bookings = [];

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve other HTML pages
app.get('/hotels.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'hotels.html'));
});

app.get('/bookings.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'bookings.html'));
});

app.get('/contact.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// API: Get all hotels
app.get('/api/hotels', (req, res) => {
  const { location, minPrice, maxPrice, minRating } = req.query;
  
  let filteredHotels = [...hotels];
  
  if (location) {
    filteredHotels = filteredHotels.filter(hotel => 
      hotel.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  if (minPrice) {
    filteredHotels = filteredHotels.filter(hotel => hotel.price >= parseInt(minPrice));
  }
  
  if (maxPrice) {
    filteredHotels = filteredHotels.filter(hotel => hotel.price <= parseInt(maxPrice));
  }
  
  if (minRating) {
    filteredHotels = filteredHotels.filter(hotel => hotel.rating >= parseFloat(minRating));
  }
  
  res.json(filteredHotels);
});

// API: Get single hotel
app.get('/api/hotels/:id', (req, res) => {
  const hotel = hotels.find(h => h.id === parseInt(req.params.id));
  if (!hotel) {
    return res.status(404).json({ error: 'Hotel not found' });
  }
  res.json(hotel);
});

// API: Create booking
app.post('/api/bookings', (req, res) => {
  const { hotelId, guestName, email, checkIn, checkOut, guests, totalPrice } = req.body;
  
  if (!hotelId || !guestName || !email || !checkIn || !checkOut || !guests) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const hotel = hotels.find(h => h.id === parseInt(hotelId));
  if (!hotel) {
    return res.status(404).json({ error: 'Hotel not found' });
  }
  
  const booking = {
    id: bookings.length + 1,
    hotelId: parseInt(hotelId),
    hotelName: hotel.name,
    guestName,
    email,
    checkIn,
    checkOut,
    guests: parseInt(guests),
    totalPrice: totalPrice || hotel.price,
    bookingDate: new Date().toISOString(),
    status: 'confirmed'
  };
  
  bookings.push(booking);
  res.status(201).json({ message: 'Booking confirmed!', booking });
});

// API: Get all bookings
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

// ============================================
// VAPI INTEGRATION ENDPOINTS
// ============================================

// Middleware to verify Vapi webhook (optional but recommended for production)
function verifyVapiWebhook(req, res, next) {
  // If no secret is set, skip verification (for development)
  if (!VAPI_WEBHOOK_SECRET) {
    return next();
  }
  
  // Check for Authorization header or custom header
  const authHeader = req.headers['authorization'] || req.headers['x-vapi-secret'];
  const providedSecret = authHeader?.replace('Bearer ', '') || authHeader;
  
  if (providedSecret !== VAPI_WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized: Invalid webhook secret' });
  }
  
  next();
}

// Vapi webhook endpoint for function calling
app.post('/api/vapi/webhook', verifyVapiWebhook, (req, res) => {
  try {
    const { message } = req.body;
    
    // Handle function calls from Vapi
    if (message?.functionCall) {
      const functionName = message.functionCall.name;
      const parameters = message.functionCall.parameters || {};
      
      let result;
      
      switch (functionName) {
        case 'searchHotels':
          result = handleSearchHotels(parameters);
          break;
        case 'getHotelDetails':
          result = handleGetHotelDetails(parameters);
          break;
        case 'createBooking':
          result = handleCreateBooking(parameters);
          break;
        case 'getBookings':
          result = handleGetBookings(parameters);
          break;
        default:
          result = { error: `Unknown function: ${functionName}` };
      }
      
      return res.json({
        result: result
      });
    }
    
    // Handle regular messages (optional)
    res.json({ message: 'Webhook received' });
  } catch (error) {
    console.error('Vapi webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Helper function: Search hotels
function handleSearchHotels(params) {
  const { location, maxPrice, minRating } = params;
  
  let filteredHotels = [...hotels];
  
  if (location) {
    filteredHotels = filteredHotels.filter(hotel => 
      hotel.location.toLowerCase().includes(location.toLowerCase()) ||
      hotel.name.toLowerCase().includes(location.toLowerCase())
    );
  }
  
  if (maxPrice) {
    filteredHotels = filteredHotels.filter(hotel => hotel.price <= parseInt(maxPrice));
  }
  
  if (minRating) {
    filteredHotels = filteredHotels.filter(hotel => hotel.rating >= parseFloat(minRating));
  }
  
  return {
    hotels: filteredHotels,
    count: filteredHotels.length
  };
}

// Helper function: Get hotel details
function handleGetHotelDetails(params) {
  const { hotelId, hotelName } = params;
  
  let hotel;
  if (hotelId) {
    hotel = hotels.find(h => h.id === parseInt(hotelId));
  } else if (hotelName) {
    hotel = hotels.find(h => 
      h.name.toLowerCase().includes(hotelName.toLowerCase())
    );
  }
  
  if (!hotel) {
    return { error: 'Hotel not found' };
  }
  
  return { hotel };
}

// Helper function: Create booking
function handleCreateBooking(params) {
  const { hotelId, guestName, email, checkIn, checkOut, guests } = params;
  
  if (!hotelId || !guestName || !email || !checkIn || !checkOut || !guests) {
    return { error: 'Missing required fields' };
  }
  
  const hotel = hotels.find(h => h.id === parseInt(hotelId));
  if (!hotel) {
    return { error: 'Hotel not found' };
  }
  
  // Calculate total price
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  const totalPrice = hotel.price * nights * parseInt(guests);
  
  const booking = {
    id: bookings.length + 1,
    hotelId: parseInt(hotelId),
    hotelName: hotel.name,
    guestName,
    email,
    checkIn,
    checkOut,
    guests: parseInt(guests),
    nights,
    totalPrice,
    bookingDate: new Date().toISOString(),
    status: 'confirmed'
  };
  
  bookings.push(booking);
  
  return {
    success: true,
    message: 'Booking confirmed successfully!',
    booking: booking
  };
}

// Helper function: Get bookings
function handleGetBookings(params) {
  const { email } = params;
  
  if (email) {
    const userBookings = bookings.filter(b => b.email.toLowerCase() === email.toLowerCase());
    return { bookings: userBookings, count: userBookings.length };
  }
  
  return { bookings, count: bookings.length };
}

// Vapi function definitions endpoint (for Vapi dashboard)
app.get('/api/vapi/functions', (req, res) => {
  res.json({
    functions: [
      {
        name: 'searchHotels',
        description: 'Search for hotels based on location, price, and rating filters',
        parameters: {
          type: 'object',
          properties: {
            location: {
              type: 'string',
              description: 'Location or destination name (e.g., "Maldives", "New York", "Bali")'
            },
            maxPrice: {
              type: 'number',
              description: 'Maximum price per night in dollars'
            },
            minRating: {
              type: 'number',
              description: 'Minimum star rating (e.g., 4.5, 4.0)'
            }
          }
        }
      },
      {
        name: 'getHotelDetails',
        description: 'Get detailed information about a specific hotel',
        parameters: {
          type: 'object',
          properties: {
            hotelId: {
              type: 'number',
              description: 'Hotel ID number'
            },
            hotelName: {
              type: 'string',
              description: 'Hotel name (alternative to hotelId)'
            }
          }
        }
      },
      {
        name: 'createBooking',
        description: 'Create a new hotel booking reservation',
        parameters: {
          type: 'object',
          required: ['hotelId', 'guestName', 'email', 'checkIn', 'checkOut', 'guests'],
          properties: {
            hotelId: {
              type: 'number',
              description: 'ID of the hotel to book'
            },
            guestName: {
              type: 'string',
              description: 'Full name of the guest'
            },
            email: {
              type: 'string',
              description: 'Email address for booking confirmation'
            },
            checkIn: {
              type: 'string',
              description: 'Check-in date in YYYY-MM-DD format'
            },
            checkOut: {
              type: 'string',
              description: 'Check-out date in YYYY-MM-DD format (must be after check-in)'
            },
            guests: {
              type: 'number',
              description: 'Number of guests (1-10)'
            }
          }
        }
      },
      {
        name: 'getBookings',
        description: 'Retrieve booking information, optionally filtered by email',
        parameters: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: 'Email address to filter bookings (optional)'
            }
          }
        }
      }
    ]
  });
});

// ============================================
// VAPI CALL INITIATION (FROM YOUR WEBSITE)
// ============================================

// Endpoint to initiate a call from your website
app.post('/api/vapi/initiate-call', async (req, res) => {
  try {
    // Check if API key is configured
    if (!VAPI_API_KEY) {
      return res.status(400).json({ 
        error: 'Vapi API key not configured. Please set VAPI_API_KEY in your .env file.' 
      });
    }

    if (!VAPI_AGENT_ID) {
      return res.status(400).json({ 
        error: 'Vapi Agent ID not configured. Please set VAPI_AGENT_ID in your .env file.' 
      });
    }

    const { phoneNumber, customerName, customerEmail, context } = req.body;

    // Validate phone number
    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Format phone number (ensure it starts with +)
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;

    // Prepare call data
    const callData = {
      phoneNumberId: null, // Optional: if you have a phone number ID
      customer: {
        number: formattedPhone,
        name: customerName || 'Customer',
        email: customerEmail || null
      },
      agentId: VAPI_AGENT_ID,
      // Optional: Pass context/data to the agent
      metadata: context || {}
    };

    // Make API call to Vapi
    const response = await fetch('https://api.vapi.ai/call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${VAPI_API_KEY}`
      },
      body: JSON.stringify(callData)
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: result.message || 'Failed to initiate call',
        details: result
      });
    }

    res.json({
      success: true,
      message: 'Call initiated successfully',
      call: {
        id: result.id,
        status: result.status,
        phoneNumber: formattedPhone,
        createdAt: result.createdAt
      }
    });

  } catch (error) {
    console.error('Error initiating call:', error);
    res.status(500).json({ 
      error: 'Failed to initiate call',
      message: error.message 
    });
  }
});

// Endpoint to get call status
app.get('/api/vapi/call-status/:callId', async (req, res) => {
  try {
    if (!VAPI_API_KEY) {
      return res.status(400).json({ 
        error: 'Vapi API key not configured' 
      });
    }

    const { callId } = req.params;

    const response = await fetch(`https://api.vapi.ai/call/${callId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`
      }
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: result.message || 'Failed to get call status',
        details: result
      });
    }

    res.json({
      success: true,
      call: result
    });

  } catch (error) {
    console.error('Error getting call status:', error);
    res.status(500).json({ 
      error: 'Failed to get call status',
      message: error.message 
    });
  }
});

// Start server
function startServer() {
  app.listen(PORT, () => {
    console.log(`\n✅ Hotel Booking Server is running!`);
    console.log(`🌐 Open your browser: http://localhost:${PORT}`);
    console.log(`📊 API available at: http://localhost:${PORT}/api/hotels`);
    console.log(`🔗 Vapi Webhook: http://localhost:${PORT}/api/vapi/webhook`);
    console.log(`📋 Vapi Functions: http://localhost:${PORT}/api/vapi/functions`);
    if (VAPI_API_KEY) {
      console.log(`📞 Call Initiation: http://localhost:${PORT}/api/vapi/initiate-call`);
    } else {
      console.log(`📞 Call Initiation: Not configured (set VAPI_API_KEY in .env)`);
    }
    console.log();
  });
}

if (!IS_VERCEL) {
  startServer();
} else {
  console.log('✅ Hotel Booking Express app ready for Vercel deployment.');
}

module.exports = app;
