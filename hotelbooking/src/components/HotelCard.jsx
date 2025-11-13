import { useState } from 'react'
import './HotelCard.css'

function HotelCard({ hotel }) {
  const [showBooking, setShowBooking] = useState(false)

  const handleBookNow = () => {
    setShowBooking(true)
  }

  const handleCloseBooking = () => {
    setShowBooking(false)
  }

  const handleConfirmBooking = () => {
    alert(`Booking confirmed for ${hotel.name}!`)
    setShowBooking(false)
  }

  return (
    <>
      <div className="hotel-card">
        <div className="hotel-image">
          <img src={hotel.image} alt={hotel.name} />
          <div className="hotel-rating">
            ⭐ {hotel.rating}
          </div>
        </div>
        <div className="hotel-content">
          <h3 className="hotel-name">{hotel.name}</h3>
          <p className="hotel-location">📍 {hotel.location}</p>
          <p className="hotel-description">{hotel.description}</p>
          <div className="hotel-footer">
            <div className="hotel-price">
              <span className="price-amount">${hotel.price}</span>
              <span className="price-period">/night</span>
            </div>
            <button className="book-button" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      {showBooking && (
        <div className="booking-modal-overlay" onClick={handleCloseBooking}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseBooking}>×</button>
            <h2>Book {hotel.name}</h2>
            <div className="booking-details">
              <p><strong>Location:</strong> {hotel.location}</p>
              <p><strong>Price:</strong> ${hotel.price} per night</p>
              <p><strong>Rating:</strong> ⭐ {hotel.rating}</p>
            </div>
            <div className="booking-form">
              <div className="form-group">
                <label>Check In</label>
                <input type="date" required />
              </div>
              <div className="form-group">
                <label>Check Out</label>
                <input type="date" required />
              </div>
              <div className="form-group">
                <label>Guests</label>
                <input type="number" min="1" max="10" defaultValue="1" required />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-cancel" onClick={handleCloseBooking}>
                Cancel
              </button>
              <button className="btn-confirm" onClick={handleConfirmBooking}>
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HotelCard

