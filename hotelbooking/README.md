# Hotel Booking Website

A modern, responsive hotel booking website built with React and Vite.

## Features

- 🏨 Beautiful, modern UI design
- 🔍 Hotel search functionality
- 📅 Date and guest selection
- ⭐ Hotel ratings and reviews
- 💳 Booking modal with confirmation
- 📱 Fully responsive design
- 🎨 Smooth animations and transitions

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
hotel-booking/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── HotelList.jsx
│   │   ├── HotelCard.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technologies Used

- React 18
- Vite
- CSS3 (Custom Properties, Grid, Flexbox)
- HTML5

## Features in Detail

### Search Functionality
- Search hotels by location
- Filter by check-in/check-out dates
- Select number of guests

### Hotel Cards
- Display hotel images, ratings, and prices
- Click "Book Now" to open booking modal
- Responsive grid layout

### Booking Modal
- Date selection
- Guest count selection
- Booking confirmation

## Customization

You can customize the website by:
- Modifying colors in `src/index.css` (CSS variables)
- Adding more hotels in `src/App.jsx`
- Updating styles in component CSS files

## License

This project is open source and available for personal and commercial use.

