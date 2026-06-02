// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Scroll progress bar
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Scroll Animation
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Parallax Effect for Hero Images
document.addEventListener('mousemove', (e) => {
    const mainImg = document.querySelector('.main-img');
    const subImg = document.querySelector('.sub-img');
    const badge = document.querySelector('.floating-badge');
    
    // Only apply if elements exist and screen is large enough
    if(mainImg && window.innerWidth > 992) {
        // Calculate position based on mouse coordinates relative to center
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;
        
        // Apply transform with smooth translation
        mainImg.style.transform = `translate(${x}px, ${y}px)`;
        subImg.style.transform = `translate(${x * -1.5}px, ${y * -1.5}px)`;
        badge.style.transform = `translate(${x * 2}px, ${y * 2}px)`;
    }
});

// 3D Tilt Effect for Menu Cards
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        // Only apply on desktop
        if(window.innerWidth > 992) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Limit rotation to 10 degrees max
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.boxShadow = `0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(242, 101, 34, 0.15)`;
            card.style.borderColor = `rgba(242, 101, 34, 0.4)`;
            card.style.zIndex = `10`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = ``;
        card.style.boxShadow = ``;
        card.style.borderColor = ``;
        card.style.zIndex = ``;
    });
});

// Floating Embers Effect
const embersContainer = document.querySelector('.embers-container');
if (embersContainer) {
    for (let i = 0; i < 35; i++) {
        const ember = document.createElement('div');
        ember.classList.add('ember');
        ember.style.left = Math.random() * 100 + 'vw';
        ember.style.animationDuration = (Math.random() * 4 + 3) + 's';
        ember.style.animationDelay = Math.random() * 5 + 's';
        ember.style.opacity = Math.random() * 0.8 + 0.2;
        embersContainer.appendChild(ember);
    }
}

// Auto-scrolling Reviews Carousel (with manual scroll support)
const reviewsCarousel = document.querySelector('.reviews-carousel');
if (reviewsCarousel) {
    let scrollInterval;
    let isHoveredOrTouched = false;

    const startAutoScroll = () => {
        // Clear any existing interval to prevent speeding up
        clearInterval(scrollInterval);
        scrollInterval = setInterval(() => {
            if (!isHoveredOrTouched) {
                reviewsCarousel.scrollLeft += 1; // Adjust speed (higher = faster)
                
                // If we've scrolled past half the track (the duplicated part), reset to 0 for infinite loop
                if (reviewsCarousel.scrollLeft >= reviewsCarousel.scrollWidth / 2) {
                    reviewsCarousel.scrollLeft = 0;
                }
            }
        }, 30); // 30ms interval = smooth slow scroll
    };

    startAutoScroll();

    // Pause on hover or touch so user can read/scroll manually
    reviewsCarousel.addEventListener('mouseenter', () => isHoveredOrTouched = true);
    reviewsCarousel.addEventListener('mouseleave', () => isHoveredOrTouched = false);
    reviewsCarousel.addEventListener('touchstart', () => isHoveredOrTouched = true, {passive: true});
    reviewsCarousel.addEventListener('touchend', () => {
        setTimeout(() => isHoveredOrTouched = false, 1500); // Resume 1.5s after touch ends
    });
}
