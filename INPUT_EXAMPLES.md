# 📝 Correct Input Examples

## 🔍 Search Form Examples

### Location Search:
```
✅ Correct: "Maldives"
✅ Correct: "New York"
✅ Correct: "Bali"
✅ Correct: "Switzerland"
✅ Correct: "Paris"
✅ Correct: "Dubai"
```

### Max Price:
```
✅ Correct: 300
✅ Correct: 200
✅ Correct: 400
✅ Correct: 150
```

### Min Rating:
```
✅ Correct: Select "4.5+ Stars"
✅ Correct: Select "4.0+ Stars"
✅ Correct: Select "Any Rating"
```

---

## 🏨 Booking Form Examples

### Check-in Date:
```
✅ Correct: Any date from today onwards
   Example: 2024-12-15 (if today is Dec 11, 2024)
   Example: 2024-12-20
   Format: YYYY-MM-DD
```

### Check-out Date:
```
✅ Correct: Must be AFTER check-in date
   Example: If check-in is 2024-12-15, check-out can be 2024-12-16 or later
   Example: 2024-12-18 (3 nights)
   Format: YYYY-MM-DD
```

### Number of Guests:
```
✅ Correct: 1
✅ Correct: 2
✅ Correct: 4
✅ Correct: 6
✅ Correct: 10 (maximum)
❌ Wrong: 0 or negative numbers
❌ Wrong: More than 10
```

### Full Name:
```
✅ Correct: "John Smith"
✅ Correct: "Maria Garcia"
✅ Correct: "Ahmed Al-Rashid"
✅ Correct: "Li Wei"
❌ Wrong: Empty field
❌ Wrong: Only numbers
```

### Email:
```
✅ Correct: "john.smith@email.com"
✅ Correct: "maria.garcia@gmail.com"
✅ Correct: "ahmed@example.com"
✅ Correct: "user123@domain.co.uk"
❌ Wrong: "notanemail"
❌ Wrong: "missing@domain"
❌ Wrong: "@domain.com"
❌ Wrong: Empty field
```

---

## 📋 Complete Booking Example

**Hotel:** Grand Paradise Resort (Maldives)

**Check-in Date:** `2024-12-20`
**Check-out Date:** `2024-12-23` (3 nights)
**Number of Guests:** `2`
**Full Name:** `John Smith`
**Email:** `john.smith@email.com`

**Total Price:** $299 × 3 nights × 2 guests = **$1,794.00**

---

## 🎯 Quick Test Examples

### Example 1: Weekend Getaway
- **Location:** Leave empty (show all)
- **Max Price:** `300`
- **Min Rating:** `4.5+ Stars`
- **Check-in:** `2024-12-14`
- **Check-out:** `2024-12-16`
- **Guests:** `2`
- **Name:** `Sarah Johnson`
- **Email:** `sarah.j@email.com`

### Example 2: Budget Trip
- **Location:** `Bali`
- **Max Price:** `200`
- **Min Rating:** `Any Rating`
- **Check-in:** `2024-12-25`
- **Check-out:** `2024-12-30`
- **Guests:** `1`
- **Name:** `Mike Chen`
- **Email:** `mike.chen@gmail.com`

### Example 3: Luxury Stay
- **Location:** `Dubai`
- **Max Price:** `500`
- **Min Rating:** `4.5+ Stars`
- **Check-in:** `2025-01-10`
- **Check-out:** `2025-01-15`
- **Guests:** `4`
- **Name:** `Emma Williams`
- **Email:** `emma.w@company.com`

---

## ⚠️ Common Mistakes to Avoid

1. **Check-out before Check-in** ❌
   - Check-out must be after check-in date

2. **Past Dates** ❌
   - Cannot book for dates in the past

3. **Invalid Email Format** ❌
   - Must include @ and domain

4. **Empty Required Fields** ❌
   - All fields are required

5. **Too Many Guests** ❌
   - Maximum 10 guests per booking

---

## 💡 Tips

- The system automatically calculates total price based on:
  - Hotel price per night
  - Number of nights (check-out - check-in)
  - Number of guests

- You can search without filling all fields - empty fields show all options

- Dates must be in the future (today or later)

- Check-out date must be at least 1 day after check-in

