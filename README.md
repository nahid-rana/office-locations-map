# 🌍 Premium Global Office Locations Map

A beautiful, interactive, and fully responsive web component showcasing your company's office locations across the globe with smooth curved connections and premium animations.

## ✨ Features

- **Interactive SVG Map**: Beautiful, scalable vector-based map with location pins
- **Smooth Curved Connections**: Animated curved lines connecting office locations
- **Responsive Design**: Fully responsive across all devices (desktop, tablet, mobile)
- **Premium Animations**: Smooth transitions, pulsing animations for primary hubs, and hover effects
- **Location Information Panel**: Click on any location to view detailed information
- **Locations List**: Grid-based display of all office locations at the bottom
- **Primary Hub Indicators**: Visual distinction for primary hubs (Casablanca & Cairo)
- **Coming Soon Support**: Special styling for upcoming locations (USA)
- **Dark Modern Theme**: Sleek dark UI with cyan and gold accent colors
- **Statistics**: Real-time display of total offices and countries
- **Keyboard & Touch Support**: Full accessibility support

## 🏢 Included Locations

### Primary Hubs
- **Casablanca** (Morocco) - Primary Hub
- **Cairo** (Egypt) - Primary Hub

### Offices
- Rabat (Morocco)
- Marrakech (Morocco)
- Alexandria (Egypt)
- Rotterdam (Netherlands)
- Barcelona (Spain)
- London (United Kingdom)
- Leicester (United Kingdom)
- Tallinn (Estonia)

### Coming Soon
- USA

## 🚀 Quick Start

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nahid-rana/office-locations-map.git
cd office-locations-map
```

2. Open in your browser:
```bash
# Simply open index.html in your browser
open index.html
# or
start index.html
```

3. Or use a local server (recommended):
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 📁 File Structure

```
office-locations-map/
├── index.html          # Main HTML structure
├── styles.css          # Comprehensive styling with responsive breakpoints
├── script.js           # Interactive functionality and animations
└── README.md          # This file
```

## 🎨 Features Breakdown

### Interactive Map
- SVG-based map with precise location coordinates
- Color-coded pins (cyan for active, gold for coming soon)
- Primary hubs marked with pulsing animation
- Hover effects with location name and country display

### Curved Connections
- Smooth quadratic Bézier curves connecting locations
- Gradient-colored connection lines
- Animated flow effect with staggered timing
- Distance-based curve calculation for natural look

### Responsive Breakpoints
- **Desktop** (1024px+): Full map with side panel
- **Tablet** (768px-1024px): Optimized layout with adjusted sizing
- **Mobile** (480px-768px): Stacked layout, map optimized for touch
- **Small Mobile** (<480px): Compact design with single-column cards

### Info Panel
- Real-time location information display
- Click any pin or card to view details
- Shows location type (Primary Hub, Office, Coming Soon)
- Statistics for total offices and countries

### Location Cards
- Grid-based layout (auto-responsive)
- Hover animations with shine effect
- Color-coded badges
- Click to highlight on map

## ⚙️ Configuration

### Adding New Locations

Edit the `locations` array in `script.js`:

```javascript
const locations = [
    { 
        name: 'City Name', 
        country: 'Country Name', 
        x: 600,              // X coordinate (0-1400)
        y: 350,              // Y coordinate (0-700)
        isPrimary: false,    // Set true for primary hubs
        type: 'office'       // 'office', 'hub', or 'comingSoon'
    },
    // ... more locations
];
```

### Customizing Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #00d4ff;      /* Cyan */
    --secondary-color: #ff006e;    /* Pink */
    --accent-color: #fbbf24;       /* Gold */
    --dark-bg: #0f172a;            /* Dark background */
    --card-bg: #1e293b;            /* Card background */
    --text-primary: #f1f5f9;       /* Primary text */
    --text-secondary: #cbd5e1;     /* Secondary text */
}
```

### Adjusting Connections

Modify the `connectionPairs` array in `script.js` to change which locations are connected:

```javascript
const connectionPairs = [
    [0, 1],  // Connect location 0 to location 1
    [1, 3],  // Connect location 1 to location 3
    // ... more pairs
];
```

## 🎯 Browser Support

- Chrome/Edge: Full support (recommended)
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support with touch optimization

## 📱 Responsive Features

- Fluid typography that scales with viewport
- Touch-friendly pin sizes and hover areas
- Optimized SVG rendering for mobile devices
- Adaptive grid layout for location cards
- Bottom-positioned info panel on mobile

## ✅ Performance Optimization

- SVG viewBox scaling prevents re-rendering
- CSS animations use GPU acceleration
- Efficient event delegation for interactivity
- Minimal DOM manipulation
- Optimized filter effects with conditional application

## 🎪 Animation Details

### Pin Animations
- **Pulse Animation**: 2-second cycle on primary hubs
- **Hover Effect**: Scale and glow on mouse enter
- **Load Animation**: Staggered entrance on page load

### Connection Lines
- **Flow Animation**: 6-second repeating animation
- **Staggered Start**: Each line starts with a delay
- **Opacity Pulse**: Smooth opacity transition effect

### Card Animations
- **Entrance**: Slide up with fade on page load
- **Hover**: Elevation effect with enhanced glow
- **Shine Effect**: Linear gradient sweep on hover

## 🔧 Customization Examples

### Change Primary Hub Color
```css
.pin-pulse circle {
    fill: #your-color;
}
```

### Adjust Animation Speed
```css
@keyframes pulse {
    /* Change 2s to desired duration */
    animation: pulse 3s ease-in-out infinite;
}
```

### Modify Connection Line Style
```css
.connection-lines path {
    stroke-width: 3;  /* Thicker lines */
    stroke-dasharray: 5;  /* Dashed lines */
}
```

## 📊 Statistics

The map automatically calculates and displays:
- Total number of active offices
- Total number of countries represented
- Status of each location (Primary Hub, Office, Coming Soon)

## 🎓 Learning Resources

This project demonstrates:
- SVG graphics and animations
- SVG coordinate systems and path calculations
- CSS Grid and Flexbox layouts
- Responsive web design techniques
- JavaScript event handling and DOM manipulation
- CSS custom properties (variables)
- Media queries for responsive design
- Bezier curve mathematics for smooth connections
- Performance optimization techniques

## 🐛 Troubleshooting

### Map not displaying
- Ensure JavaScript is enabled in your browser
- Check browser console for errors
- Try opening with a local server instead of file protocol

### Animations not smooth
- Check if hardware acceleration is enabled in browser settings
- Try a different browser (Chrome recommended)
- Check browser performance settings

### Mobile display issues
- Clear browser cache
- Disable browser zoom
- Ensure viewport meta tag is present

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Feel free to fork this project and submit pull requests with improvements!

## 📞 Support

For issues or questions, please open an issue on the GitHub repository.

---

**Created with ❤️ for global teams and distributed workforces**
