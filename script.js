// Office Locations Data
const locations = [
    // Morocco
    { name: 'Casablanca', country: 'Morocco', x: 520, y: 320, isPrimary: true, type: 'hub' },
    { name: 'Rabat', country: 'Morocco', x: 510, y: 290, isPrimary: false, type: 'office' },
    { name: 'Marrakech', country: 'Morocco', x: 480, y: 360, isPrimary: false, type: 'office' },
    
    // Egypt
    { name: 'Cairo', country: 'Egypt', x: 620, y: 380, isPrimary: true, type: 'hub' },
    { name: 'Alexandria', country: 'Egypt', x: 590, y: 330, isPrimary: false, type: 'office' },
    
    // Netherlands
    { name: 'Rotterdam', country: 'Netherlands', x: 600, y: 180, isPrimary: false, type: 'office' },
    
    // Spain
    { name: 'Barcelona', country: 'Spain', x: 550, y: 240, isPrimary: false, type: 'office' },
    
    // United Kingdom
    { name: 'London', country: 'United Kingdom', x: 620, y: 150, isPrimary: false, type: 'office' },
    { name: 'Leicester', country: 'United Kingdom', x: 630, y: 130, isPrimary: false, type: 'office' },
    
    // Estonia
    { name: 'Tallinn', country: 'Estonia', x: 720, y: 120, isPrimary: false, type: 'office' },
    
    // USA (Coming Soon)
    { name: 'USA', country: 'Coming Soon', x: 200, y: 300, isPrimary: false, type: 'comingSoon' },
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    renderLocationsList();
    setupLocationInteractions();
});

// Initialize the map with pins and connections
function initializeMap() {
    const svg = document.querySelector('.world-map');
    const connectionLines = document.getElementById('connectionLines');
    const locationPins = document.getElementById('locationPins');
    
    // Add gradient for connection lines
    const defs = svg.querySelector('defs');
    if (!defs.querySelector('#lineGradient')) {
        const lineGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        lineGradient.id = 'lineGradient';
        lineGradient.setAttribute('x1', '0%');
        lineGradient.setAttribute('y1', '0%');
        lineGradient.setAttribute('x2', '100%');
        lineGradient.setAttribute('y2', '100%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('style', 'stop-color:#00d4ff;stop-opacity:0.6');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('style', 'stop-color:#fbbf24;stop-opacity:0.6');
        
        lineGradient.appendChild(stop1);
        lineGradient.appendChild(stop2);
        defs.appendChild(lineGradient);
    }
    
    // Draw curved connections between nearby locations
    drawConnections(connectionLines);
    
    // Draw location pins
    drawPins(locationPins);
    
    // Update stats
    updateStats();
}

// Draw curved connection lines between locations
function drawConnections(container) {
    container.innerHTML = ''; // Clear existing
    
    // Define which locations should be connected
    const connectionPairs = [
        // African Hub connections
        [0, 1], [0, 2], [0, 3], [3, 4],
        // European connections
        [5, 6], [6, 7], [7, 8], [8, 9],
        // Cross-continent primary connections
        [0, 5], [3, 5], [7, 9],
    ];
    
    connectionPairs.forEach((pair, index) => {
        const [start, end] = pair;
        if (start < locations.length && end < locations.length) {
            const startLoc = locations[start];
            const endLoc = locations[end];
            
            // Create curved path
            const path = createCurvedPath(startLoc, endLoc);
            const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathElement.setAttribute('d', path);
            pathElement.setAttribute('class', 'connection-path');
            pathElement.style.animationDelay = `${index * 0.2}s`;
            
            container.appendChild(pathElement);
        }
    });
}

// Create SVG path with quadratic curve
function createCurvedPath(start, end) {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Control point for curve
    const controlX = (start.x + end.x) / 2 + (dy / distance) * (distance * 0.15);
    const controlY = (start.y + end.y) / 2 - (dx / distance) * (distance * 0.15);
    
    return `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;
}

// Draw location pins on the map
function drawPins(container) {
    container.innerHTML = ''; // Clear existing
    
    locations.forEach((location, index) => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', `pin-circle ${location.type === 'comingSoon' ? 'pin-coming-soon' : ''}`);
        g.setAttribute('data-index', index);
        g.style.cursor = 'pointer';
        
        // Add pulse animation to primary hubs
        if (location.isPrimary) {
            g.classList.add('pin-pulse');
        }
        
        // Main circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', location.x);
        circle.setAttribute('cy', location.y);
        circle.setAttribute('r', location.isPrimary ? 8 : 6);
        circle.setAttribute('class', 'pin-dot');
        
        // City name
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', location.x);
        text.setAttribute('y', location.y - 20);
        text.setAttribute('class', 'pin-text');
        text.textContent = location.name;
        
        // Country name (smaller)
        const countryText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        countryText.setAttribute('x', location.x);
        countryText.setAttribute('y', location.y - 8);
        countryText.setAttribute('class', 'country-text pin-text');
        countryText.textContent = `(${location.country})`;
        
        g.appendChild(circle);
        g.appendChild(text);
        g.appendChild(countryText);
        
        // Add click event
        g.addEventListener('click', () => showLocationInfo(location));
        g.addEventListener('mouseenter', () => highlightLocation(index));
        g.addEventListener('mouseleave', () => unhighlightLocation(index));
        
        container.appendChild(g);
    });
}

// Show location info in the panel
function showLocationInfo(location) {
    const infoTitle = document.getElementById('infoTitle');
    const infoDescription = document.getElementById('infoDescription');
    
    infoTitle.textContent = location.name;
    
    let description = `<strong>${location.country}</strong>`;
    if (location.isPrimary) {
        description += ` • Primary Hub`;
    }
    if (location.type === 'comingSoon') {
        description = `Coming Soon - ${location.country}`;
    }
    
    infoDescription.innerHTML = description;
}

// Highlight location on hover
function highlightLocation(index) {
    const pins = document.querySelectorAll('.pin-circle');
    pins[index]?.classList.add('active');
}

// Remove highlight
function unhighlightLocation(index) {
    const pins = document.querySelectorAll('.pin-circle');
    pins[index]?.classList.remove('active');
}

// Render locations list at bottom
function renderLocationsList() {
    const grid = document.getElementById('locationsGrid');
    grid.innerHTML = '';
    
    // Group by country
    const grouped = {};
    locations.forEach(loc => {
        if (!grouped[loc.country]) {
            grouped[loc.country] = [];
        }
        grouped[loc.country].push(loc);
    });
    
    // Render cards
    locations.forEach(location => {
        const card = document.createElement('div');
        card.className = `location-card ${location.type === 'comingSoon' ? 'coming-soon' : ''}`;
        
        const badge = location.isPrimary ? 'Primary Hub' : location.type === 'comingSoon' ? 'Coming Soon' : 'Office';
        const badgeClass = location.type === 'comingSoon' ? 'coming-soon' : '';
        
        card.innerHTML = `
            <div class="location-card-header">
                <div class="location-pin-icon">
                    ${location.isPrimary ? '★' : '📍'}
                </div>
                <div>
                    <div class="location-card-title">${location.name}</div>
                    <div class="location-card-country">${location.country}</div>
                </div>
            </div>
            <span class="location-badge ${badgeClass}">${badge}</span>
        `;
        
        card.addEventListener('click', () => showLocationInfo(location));
        grid.appendChild(card);
    });
}

// Setup location interactions
function setupLocationInteractions() {
    const cards = document.querySelectorAll('.location-card');
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            highlightLocation(index);
        });
        card.addEventListener('mouseleave', () => {
            unhighlightLocation(index);
        });
    });
}

// Update statistics
function updateStats() {
    const totalOffices = locations.length;
    const countries = new Set(locations.map(l => l.country)).size;
    
    document.getElementById('totalOffices').textContent = totalOffices - 1; // Exclude "Coming Soon"
    document.getElementById('totalCountries').textContent = countries - 1; // Exclude "Coming Soon"
}

// Handle window resize for responsive SVG
window.addEventListener('resize', () => {
    const mapContainer = document.querySelector('.map-container');
    const svg = document.querySelector('.world-map');
    
    // SVG will scale automatically with viewBox and preserveAspectRatio
    // but we can trigger any additional responsive updates here if needed
});

// Animate pins on load
window.addEventListener('load', () => {
    const pins = document.querySelectorAll('.pin-circle');
    pins.forEach((pin, index) => {
        pin.style.animation = 'none';
        setTimeout(() => {
            pin.style.animation = '';
        }, 10 + index * 30);
    });
    
    // Animate location cards
    const cards = document.querySelectorAll('.location-card');
    cards.forEach((card, index) => {
        card.style.animation = 'none';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + index * 50);
    });
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const pins = document.querySelectorAll('.pin-circle');
        // Optional: Implement arrow key navigation through locations
    }
});

// Initialize with default location
window.addEventListener('load', () => {
    showLocationInfo(locations[0]);
});
