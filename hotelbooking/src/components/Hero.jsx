import { useState } from 'react'
import './Hero.css'

function Hero({ onSearch }) {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchData)
    // Scroll to hotels section
    document.getElementById('hotels')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">Find Your Perfect Stay</h1>
        <p className="hero-subtitle">Discover amazing hotels and book your dream vacation</p>
        
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="search-field">
            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Where are you going?"
              value={searchData.location}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="search-field">
            <label>Check In</label>
            <input
              type="date"
              name="checkIn"
              value={searchData.checkIn}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="search-field">
            <label>Check Out</label>
            <input
              type="date"
              name="checkOut"
              value={searchData.checkOut}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="search-field">
            <label>Guests</label>
            <input
              type="number"
              name="guests"
              min="1"
              max="10"
              value={searchData.guests}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="search-button">
            Search Hotels
          </button>
        </form>
      </div>
    </section>
  )
}

export default Hero

