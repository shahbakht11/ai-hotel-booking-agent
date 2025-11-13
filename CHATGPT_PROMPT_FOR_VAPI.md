# Prompt to Give ChatGPT for Creating Vapi AI Agent

Copy and paste this entire prompt to ChatGPT:

---

**I need you to help me create a Vapi AI agent prompt for my hotel booking website. Here are the details:**

## Website Overview
I have a hotel booking website where users can search for hotels and make reservations. The website has two main forms:

### 1. Hotel Search Form (Optional Filters)
Users can search for hotels using these optional filters:
- **Location** (text input): Where the user wants to travel (e.g., "Maldives", "New York", "Bali", "Switzerland", "Paris", "Dubai")
- **Max Price** (number input): Maximum price per night in dollars (e.g., 300, 200, 400)
- **Min Rating** (dropdown): Minimum star rating - options are "Any Rating", "4.5+ Stars", "4.0+ Stars", or "3.5+ Stars"

### 2. Hotel Booking Form (Required for Reservation)
When a user wants to book a hotel, they must provide:
- **Hotel Selection**: The specific hotel they want to book (selected from search results)
- **Check-in Date** (date input, required): Must be today or a future date, format YYYY-MM-DD
- **Check-out Date** (date input, required): Must be after check-in date, format YYYY-MM-DD
- **Number of Guests** (number input, required): Between 1 and 10 guests
- **Full Name** (text input, required): Guest's full name
- **Email** (email input, required): Valid email address format

## Available Hotels
The website has 6 hotels:
1. Grand Paradise Resort - Maldives - $299/night - 4.8 stars
2. Mountain View Lodge - Switzerland - $189/night - 4.6 stars
3. Urban Luxury Hotel - New York - $349/night - 4.9 stars
4. Tropical Beach Villa - Bali - $159/night - 4.7 stars
5. Historic Grand Hotel - Paris - $279/night - 4.8 stars
6. Desert Oasis Resort - Dubai - $399/night - 4.9 stars

## What I Need
Please create a comprehensive Vapi AI agent prompt that:
1. Greets users warmly and introduces the hotel booking service
2. Asks about their travel preferences (location, budget, rating preferences) in a conversational way
3. Helps them search for hotels based on their criteria
4. Once they select a hotel, collects all required booking information:
   - Check-in and check-out dates (with validation that check-out is after check-in)
   - Number of guests (1-10)
   - Full name
   - Email address
5. Confirms all booking details before finalizing
6. Handles edge cases like invalid dates, invalid email formats, etc.
7. Is friendly, professional, and helpful throughout the conversation
8. Can handle users who want to search again or change their selection

The agent should feel natural and conversational, not robotic. It should guide users through the booking process step by step, asking one or two questions at a time to avoid overwhelming them.

Please provide the complete Vapi AI agent prompt/system message that I can use directly.

---

