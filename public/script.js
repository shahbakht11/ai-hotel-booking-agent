// Global variables
let currentHotel = null;
let allHotels = [];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadHotels();
    loadBookings();
    setMinDate();
});

// Set minimum date for booking (today)
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('checkIn').setAttribute('min', today);
    document.getElementById('checkOut').setAttribute('min', today);
}

// Update check-out minimum date when check-in changes
document.getElementById('checkIn')?.addEventListener('change', function() {
    const checkInDate = this.value;
    const checkOutInput = document.getElementById('checkOut');
    if (checkInDate) {
        const nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOutInput.setAttribute('min', nextDay.toISOString().split('T')[0]);
    }
});

// Calculate total price when dates or guests change
function calculateTotalPrice() {
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = parseInt(document.getElementById('guests').value) || 1;
    
    if (checkIn && checkOut && currentHotel) {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        
        if (nights > 0) {
            const totalPrice = currentHotel.price * nights * guests;
            document.getElementById('totalPrice').value = `$${totalPrice.toFixed(2)}`;
        } else {
            document.getElementById('totalPrice').value = `$${currentHotel.price.toFixed(2)}`;
        }
    }
}

document.getElementById('checkIn')?.addEventListener('change', calculateTotalPrice);
document.getElementById('checkOut')?.addEventListener('change', calculateTotalPrice);
document.getElementById('guests')?.addEventListener('change', calculateTotalPrice);

// Load all hotels
async function loadHotels() {
    try {
        const response = await fetch('/api/hotels');
        allHotels = await response.json();
        displayHotels(allHotels);
    } catch (error) {
        console.error('Error loading hotels:', error);
        showError('Failed to load hotels. Please try again.');
    }
}

// Search hotels
async function searchHotels() {
    const location = document.getElementById('searchLocation').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const minRating = document.getElementById('minRating').value;
    
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (minRating) params.append('minRating', minRating);
    
    try {
        const response = await fetch(`/api/hotels?${params.toString()}`);
        const hotels = await response.json();
        displayHotels(hotels);
        
        // Scroll to hotels section
        document.getElementById('hotels').scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error searching hotels:', error);
        showError('Failed to search hotels. Please try again.');
    }
}

// Display hotels
function displayHotels(hotels) {
    const container = document.getElementById('hotelsContainer');
    
    if (hotels.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>No hotels found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = hotels.map(hotel => `
        <div class="hotel-card">
            <div class="hotel-image">${hotel.image}</div>
            <div class="hotel-info">
                <div class="hotel-header">
                    <div class="hotel-name">${hotel.name}</div>
                    <div class="hotel-rating">⭐ ${hotel.rating}</div>
                </div>
                <div class="hotel-location">📍 ${hotel.location}</div>
                <div class="hotel-description">${hotel.description}</div>
                <div class="hotel-amenities">
                    ${hotel.amenities.map(amenity => `<span class="amenity-tag">${amenity}</span>`).join('')}
                </div>
                <div class="hotel-footer">
                    <div class="hotel-price">
                        $${hotel.price}<span>/night</span>
                    </div>
                    <button class="btn-book" onclick="openBookingModal(${hotel.id})">Book Now</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Open booking modal
async function openBookingModal(hotelId) {
    try {
        const response = await fetch(`/api/hotels/${hotelId}`);
        currentHotel = await response.json();
        
        document.getElementById('bookingHotelId').value = currentHotel.id;
        document.getElementById('bookingHotelName').value = currentHotel.name;
        document.getElementById('totalPrice').value = `$${currentHotel.price.toFixed(2)}`;
        
        // Reset form
        document.getElementById('checkIn').value = '';
        document.getElementById('checkOut').value = '';
        document.getElementById('guests').value = '2';
        document.getElementById('guestName').value = '';
        document.getElementById('email').value = '';
        
        document.getElementById('bookingModal').style.display = 'block';
    } catch (error) {
        console.error('Error loading hotel:', error);
        showError('Failed to load hotel details. Please try again.');
    }
}

// Close booking modal
function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    currentHotel = null;
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const bookingModal = document.getElementById('bookingModal');
    const callModal = document.getElementById('callModal');
    if (event.target === bookingModal) {
        closeBookingModal();
    }
    if (event.target === callModal) {
        closeCallModal();
    }
});

// Submit booking
async function submitBooking(event) {
    event.preventDefault();
    
    const hotelId = document.getElementById('bookingHotelId').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = document.getElementById('guests').value;
    const guestName = document.getElementById('guestName').value;
    const email = document.getElementById('email').value;
    
    // Calculate total price
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = currentHotel.price * nights * parseInt(guests);
    
    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hotelId,
                guestName,
                email,
                checkIn,
                checkOut,
                guests,
                totalPrice
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert(`✅ Booking confirmed!\n\nHotel: ${result.booking.hotelName}\nTotal: $${result.booking.totalPrice.toFixed(2)}\n\nCheck your email for confirmation.`);
            closeBookingModal();
            loadBookings();
            
            // Scroll to bookings section
            document.getElementById('bookings').scrollIntoView({ behavior: 'smooth' });
        } else {
            showError(result.error || 'Failed to create booking. Please try again.');
        }
    } catch (error) {
        console.error('Error creating booking:', error);
        showError('Failed to create booking. Please try again.');
    }
}

// Load bookings
async function loadBookings() {
    try {
        const response = await fetch('/api/bookings');
        const bookings = await response.json();
        displayBookings(bookings);
    } catch (error) {
        console.error('Error loading bookings:', error);
    }
}

// Display bookings
function displayBookings(bookings) {
    const container = document.getElementById('bookingsContainer');
    
    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <h3>No bookings yet</h3>
                <p>Book a hotel to see your reservations here</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = bookings.map(booking => {
        const checkIn = new Date(booking.checkIn).toLocaleDateString();
        const checkOut = new Date(booking.checkOut).toLocaleDateString();
        const bookingDate = new Date(booking.bookingDate).toLocaleDateString();
        
        return `
            <div class="booking-card">
                <div class="booking-header">
                    <div class="booking-hotel-name">${booking.hotelName}</div>
                    <div class="booking-status">${booking.status}</div>
                </div>
                <div class="booking-details">
                    <div class="booking-detail-item">
                        <span class="booking-detail-label">Guest Name</span>
                        <span class="booking-detail-value">${booking.guestName}</span>
                    </div>
                    <div class="booking-detail-item">
                        <span class="booking-detail-label">Email</span>
                        <span class="booking-detail-value">${booking.email}</span>
                    </div>
                    <div class="booking-detail-item">
                        <span class="booking-detail-label">Check-in</span>
                        <span class="booking-detail-value">${checkIn}</span>
                    </div>
                    <div class="booking-detail-item">
                        <span class="booking-detail-label">Check-out</span>
                        <span class="booking-detail-value">${checkOut}</span>
                    </div>
                    <div class="booking-detail-item">
                        <span class="booking-detail-label">Guests</span>
                        <span class="booking-detail-value">${booking.guests}</span>
                    </div>
                    <div class="booking-detail-item">
                        <span class="booking-detail-label">Total Price</span>
                        <span class="booking-detail-value">$${booking.totalPrice.toFixed(2)}</span>
                    </div>
                    <div class="booking-detail-item">
                        <span class="booking-detail-label">Booking Date</span>
                        <span class="booking-detail-value">${bookingDate}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Show error message
function showError(message) {
    alert('Error: ' + message);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// VAPI CALL INITIATION FUNCTIONS
// ============================================

// Open call modal
function openCallModal() {
    document.getElementById('callModal').style.display = 'block';
    // Pre-fill with booking info if available
    const email = document.getElementById('email')?.value || '';
    const name = document.getElementById('guestName')?.value || '';
    if (email) document.getElementById('callCustomerEmail').value = email;
    if (name) document.getElementById('callCustomerName').value = name;
}

// Close call modal
function closeCallModal() {
    document.getElementById('callModal').style.display = 'none';
    document.getElementById('callForm').reset();
    document.getElementById('callStatus').style.display = 'none';
}

// Initiate call
async function initiateCall(event) {
    event.preventDefault();
    
    const phoneNumber = document.getElementById('callPhoneNumber').value;
    const customerName = document.getElementById('callCustomerName').value;
    const customerEmail = document.getElementById('callCustomerEmail').value;
    const statusDiv = document.getElementById('callStatus');
    
    // Show loading
    statusDiv.style.display = 'block';
    statusDiv.innerHTML = '<p style="color: var(--primary-color);">⏳ Initiating call...</p>';
    
    try {
        const response = await fetch('/api/vapi/initiate-call', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phoneNumber,
                customerName: customerName || null,
                customerEmail: customerEmail || null
            })
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
            statusDiv.innerHTML = `
                <div style="background: var(--secondary-color); color: white; padding: 1rem; border-radius: 8px;">
                    <p><strong>✅ Call Initiated!</strong></p>
                    <p>Our AI assistant is calling you now at ${result.call.phoneNumber}</p>
                    <p style="font-size: 0.9rem; margin-top: 0.5rem;">Call ID: ${result.call.id}</p>
                </div>
            `;
            
            // Close modal after 3 seconds
            setTimeout(() => {
                closeCallModal();
            }, 3000);
        } else {
            statusDiv.innerHTML = `
                <div style="background: #ef4444; color: white; padding: 1rem; border-radius: 8px;">
                    <p><strong>❌ Error</strong></p>
                    <p>${result.error || 'Failed to initiate call. Please check your configuration.'}</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error initiating call:', error);
        statusDiv.innerHTML = `
            <div style="background: #ef4444; color: white; padding: 1rem; border-radius: 8px;">
                <p><strong>❌ Error</strong></p>
                <p>Failed to initiate call. Please try again later.</p>
            </div>
        `;
    }
}

