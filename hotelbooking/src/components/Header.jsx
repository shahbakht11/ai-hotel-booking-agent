import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🏨 HotelBooking</h1>
        </div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#hotels">Hotels</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="header-actions">
          <button className="btn-secondary">Sign In</button>
          <button className="btn-primary">Sign Up</button>
        </div>
      </div>
    </header>
  )
}

export default Header

