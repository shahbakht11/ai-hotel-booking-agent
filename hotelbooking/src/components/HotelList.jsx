import { useState, useEffect } from 'react'
import HotelCard from './HotelCard'
import './HotelList.css'

function HotelList({ hotels, searchParams }) {
  const [filteredHotels, setFilteredHotels] = useState(hotels)

  // Filter hotels based on search params
  useEffect(() => {
    if (!searchParams.location) {
      setFilteredHotels(hotels)
      return
    }

    const filtered = hotels.filter(hotel =>
      hotel.location.toLowerCase().includes(searchParams.location.toLowerCase())
    )
    setFilteredHotels(filtered)
  }, [searchParams, hotels])

  return (
    <section id="hotels" className="hotel-list-section">
      <div className="container">
        <div className="section-header">
          <h2>Available Hotels</h2>
          <p>Choose from our curated selection of premium accommodations</p>
        </div>
        
        {filteredHotels.length === 0 ? (
          <div className="no-results">
            <p>No hotels found matching your search criteria.</p>
          </div>
        ) : (
          <div className="hotel-grid">
            {filteredHotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default HotelList

