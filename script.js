// DOM Elements
const bookingModal = document.getElementById('bookingModal');
const successModal = document.getElementById('successModal');
const arrivalDateInput = document.getElementById('arrival-date');
const departureDateInput = document.getElementById('departure-date');
const totalPriceDisplay = document.getElementById('total-price');
const confirmationNumberDisplay = document.getElementById('conf-number');

// Pricing Constants
const DAILY_RATE = 15; // Base rate
const DISCOUNT_RATE = 12; // Pre-book rate

// Set minimum dates to today
const today = new Date().toISOString().split('T')[0];
if (arrivalDateInput) arrivalDateInput.min = today;
if (departureDateInput) departureDateInput.min = today;

// Modal Logic
function openBookingModal() {
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeBookingModal() {
    bookingModal.classList.remove('active');
    document.body.style.overflow = '';
}

function closeSuccessModal() {
    successModal.classList.remove('active');
    document.body.style.overflow = '';
    // Optional: Reset form
    document.getElementById('bookingForm').reset();
    resetPrice();
}

// Close modal if clicking outside
window.onclick = function (event) {
    if (event.target == bookingModal) {
        closeBookingModal();
    }
    if (event.target == successModal) {
        closeSuccessModal();
    }
}

// Price Calculation Logic
function calculatePrice() {
    if (!arrivalDateInput.value || !departureDateInput.value) return;

    const arrival = new Date(arrivalDateInput.value);
    const departure = new Date(departureDateInput.value);

    // Validate dates
    if (departure <= arrival) {
        totalPriceDisplay.textContent = "$0.00";
        return;
    }

    const diffTime = Math.abs(departure - arrival);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Simple logic: If booking > 5 days, use discount rate
    const rate = diffDays >= 5 ? DISCOUNT_RATE : DAILY_RATE;
    const total = diffDays * rate;

    totalPriceDisplay.textContent = `$${total.toFixed(2)}`;
}

function resetPrice() {
    totalPriceDisplay.textContent = "$0.00";
}

// Event Listeners for Calculation
arrivalDateInput.addEventListener('change', calculatePrice);
departureDateInput.addEventListener('change', calculatePrice);

// Handle Reservation Submission
function handleReservation(event) {
    event.preventDefault(); // Prevent actual submission

    // Simulate "Processing"
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;

    submitBtn.innerText = "Processing...";
    submitBtn.disabled = true;

    // Mock API delay
    setTimeout(() => {
        // Success!
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;

        // Generate Mock Confirmation ID
        const mockID = 'GLV-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        confirmationNumberDisplay.textContent = mockID;

        // Switch Modals
        closeBookingModal();
        successModal.classList.add('active');
    }, 1500);
}

// Mobile Menu Toggle (Simple implementation)
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = '#0a192f';
            navLinks.style.padding = '20px';
        }
    });
}

// Navbar Fade Logic
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');

    // 1. Initial fade to translucent after load
    setTimeout(() => {
        if (window.scrollY < 50) {
            navbar.classList.add('transparent-nav');
        }
    }, 1500); // 1.5s delay

    // 2. Handle Scrolling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.remove('transparent-nav');
        } else {
            navbar.classList.add('transparent-nav');
        }
    });
});

// Interactive Map Tour Logic
document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.getElementById('map-container');
    const photoModal = document.getElementById('photoModal');
    const photoDisplay = document.getElementById('photo-display');
    const photoTitle = document.getElementById('photo-title');

    // Sample Data Points (Replace img with actual paths)
    const tourPoints = [{
        id: 1,
        x: 20,
        y: 40,
        title: "Entrance Gate",
        img: "https://via.placeholder.com/800x600?text=Entrance+View"
    },
    {
        id: 2,
        x: 50,
        y: 50,
        title: "Covered Parking",
        img: "https://via.placeholder.com/800x600?text=Covered+Parking"
    },
    {
        id: 3,
        x: 75,
        y: 30,
        title: "Office",
        img: "https://via.placeholder.com/800x600?text=Office+Front"
    },
    {
        id: 4,
        x: 60,
        y: 80,
        title: "Shuttle Stop",
        img: "https://via.placeholder.com/800x600?text=Shuttle+Bus"
    }
    ];

    if (mapContainer) {
        // Initialize Map Pins
        tourPoints.forEach(point => {
            const pin = document.createElement('div');
            pin.className = 'map-pin';
            pin.style.left = point.x + '%';
            pin.style.top = point.y + '%';
            pin.setAttribute('data-title', point.title);
            pin.innerHTML = '<i class="fa-solid fa-camera"></i>';

            // Click Event
            pin.addEventListener('click', () => {
                openPhotoModal(point);
            });

            mapContainer.appendChild(pin);
        });
    }

    // Modal Functions
    window.openPhotoModal = function (point) {
        if (!photoModal) return;
        photoTitle.textContent = point.title;
        photoDisplay.src = point.img;
        photoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closePhotoModal = function () {
        if (!photoModal) return;
        photoModal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            photoDisplay.src = ''; // Clear source to prevent flash on next open
        }, 200);
    };

    // Close logic already exists in window.onclick for 'bookingModal'
    // We can extend it or relying on the existing pattern:
    const originalOnClick = window.onclick;
    window.onclick = function (event) {
        if (originalOnClick) originalOnClick(event); // Call existing

        if (event.target == photoModal) {
            closePhotoModal();
        }
    };
});
