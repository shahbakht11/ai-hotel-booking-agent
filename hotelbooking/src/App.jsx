import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import HotelList from './components/HotelList'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  })

  const [hotels] = useState([
    {
      id: 1,
      name: 'Grand Luxury Hotel',
      location: 'New York, USA',
      price: 299,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      description: 'Luxurious hotel in the heart of the city with stunning views'
    },
    {
      id: 2,
      name: 'Oceanview Resort',
      location: 'Miami, USA',
      price: 349,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      description: 'Beachfront resort with world-class amenities'
    },
    {
      id: 3,
      name: 'Mountain Retreat',
      location: 'Aspen, USA',
      price: 249,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
      description: 'Cozy mountain hotel perfect for relaxation'
    },
    {
      id: 4,
      name: 'Urban Boutique Hotel',
      location: 'San Francisco, USA',
      price: 199,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      description: 'Modern boutique hotel with unique design'
    },
    {
      id: 5,
      name: 'Historic Grand Hotel',
      location: 'Boston, USA',
      price: 279,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      description: 'Elegant historic hotel with classic charm'
    },
    {
      id: 6,
      name: 'Tropical Paradise Resort',
      location: 'Hawaii, USA',
      price: 399,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      description: 'Exotic tropical resort with private beaches'
    }
  ])

  const handleSearch = (params) => {
    setSearchParams(params)
  }

  return (
    <div className="App">
      <Header />
      <Hero onSearch={handleSearch} />
      <HotelList hotels={hotels} searchParams={searchParams} />
      <Footer />
    </div>
  )
}

export default App

