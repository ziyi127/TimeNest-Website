// TimeNest Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initStarfield();
    initNavigation();
    initAnimations();
    initCounters();
    initTimeDisplay();
    initSmoothScroll();
    initParallaxScroll();

    console.log('TimeNest website initialized successfully!');
});

// Dynamic Starfield Background
function initStarfield() {
    const starfield = document.getElementById('starfield');
    const starCount = 150;

    // Create stars with different sizes and layers
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random size
        const size = Math.random();
        if (size < 0.6) {
            star.classList.add('small');
        } else if (size < 0.9) {
            star.classList.add('medium');
        } else {
            star.classList.add('large');
        }

        // Random layer for parallax effect
        const layer = Math.floor(Math.random() * 3) + 1;
        star.classList.add(`star-layer-${layer}`);

        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        // Random animation delay
        star.style.animationDelay = Math.random() * 3 + 's';

        // Store layer for parallax
        star.dataset.layer = layer;

        starfield.appendChild(star);
    }

    // Add some shooting stars occasionally
    setInterval(createShootingStar, 8000);
}

function createShootingStar() {
    const starfield = document.getElementById('starfield');
    const shootingStar = document.createElement('div');

    shootingStar.style.position = 'absolute';
    shootingStar.style.width = '2px';
    shootingStar.style.height = '2px';
    shootingStar.style.background = 'linear-gradient(45deg, #007ACC, #4FC3F7)';
    shootingStar.style.borderRadius = '50%';
    shootingStar.style.boxShadow = '0 0 10px #4FC3F7';

    // Random starting position
    shootingStar.style.left = Math.random() * 100 + '%';
    shootingStar.style.top = Math.random() * 50 + '%';

    // Animation
    shootingStar.style.animation = 'shootingStar 2s linear forwards';

    starfield.appendChild(shootingStar);

    // Remove after animation
    setTimeout(() => {
        if (shootingStar.parentNode) {
            shootingStar.parentNode.removeChild(shootingStar);
        }
    }, 2000);
}

// Add shooting star animation to CSS
const shootingStarCSS = `
@keyframes shootingStar {
    0% {
        transform: translateX(0) translateY(0);
        opacity: 1;
    }
    100% {
        transform: translateX(300px) translateY(300px);
        opacity: 0;
    }
}
`;

// Inject shooting star CSS
const style = document.createElement('style');
style.textContent = shootingStarCSS;
document.head.appendChild(style);

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(30, 30, 30, 0.95)';
            navbar.style.borderBottomColor = 'rgba(0, 122, 204, 0.4)';
        } else {
            navbar.style.background = 'rgba(30, 30, 30, 0.9)';
            navbar.style.borderBottomColor = 'rgba(0, 122, 204, 0.2)';
        }
    });
}

// Simple scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add animation to feature cards
    const animateElements = document.querySelectorAll('.feature-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(el);
    });
}

// Simplified counter (removed since stats section is removed)
function initCounters() {
    // No longer needed - stats section removed
}

// Real-time clock display
function initTimeDisplay() {
    const timeElement = document.getElementById('current-time');
    
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        
        if (timeElement) {
            timeElement.textContent = `${hours}:${minutes}`;
        }
    }
    
    // Update time immediately and then every minute
    updateTime();
    setInterval(updateTime, 60000);
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// QQ group functionality (now using direct link)
// No longer needed since we're using direct QQ group link

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        // Hide toast after 3 seconds
        setTimeout(function() {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Add loading state to buttons
function addLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="loading"></span> 加载中...';
    button.disabled = true;
    
    // Remove loading state after 2 seconds (simulate loading)
    setTimeout(function() {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

// Simplified button interactions (removed ripple effect)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        // Simple scale effect
        const button = e.target;
        button.style.transform = 'scale(0.98)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);
    }
});

// Parallax scroll effect for starfield
function initParallaxScroll() {
    const stars = document.querySelectorAll('.star');
    let ticking = false;

    function updateParallax() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPercent = scrollTop / (documentHeight - windowHeight);

        stars.forEach(star => {
            const layer = parseInt(star.dataset.layer);
            const speed = layer * 0.3; // Different speeds for different layers

            // Move stars based on scroll position
            const translateY = scrollTop * speed;
            const translateX = Math.sin(scrollPercent * Math.PI * 2) * (layer * 10);

            star.style.transform = `translate(${translateX}px, ${translateY}px)`;

            // Adjust opacity based on scroll
            const opacity = 1 - (scrollPercent * 0.3);
            star.style.opacity = Math.max(0.2, opacity);
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling for external resources
window.addEventListener('error', function(e) {
    console.warn('Resource loading error:', e.target.src || e.target.href);
});

// Preload critical resources
function preloadResources() {
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = url;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();
