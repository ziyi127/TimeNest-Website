// TimeNest Website - Linear Style JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all elements are visible first
    ensureElementsVisible();

    // Initialize all components in Linear style
    initThemeToggle();
    initNavigation();
    initAnimations();
    initTimeDisplay();
    initSmoothScroll();
    initLinearEffects();
    initPageAnimations();
    initAdvancedAnimations();

    console.log('TimeNest website initialized with Linear design system!');
});

// Ensure all critical elements are visible
function ensureElementsVisible() {
    // Force navbar to be visible and positioned correctly
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.left = '0';
        navbar.style.right = '0';
        navbar.style.zIndex = '9999';
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
        navbar.style.display = 'block';
        navbar.style.transform = 'none';
    }

    // Ensure all navigation elements are visible
    const navElements = document.querySelectorAll('.nav-logo, .nav-link, .theme-toggle, .nav-menu');
    navElements.forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.display = el.classList.contains('nav-menu') ? 'flex' : 'inline-flex';
    });

    // Ensure hero content is visible
    const heroElements = document.querySelectorAll('.hero-content, .hero-visual, .hero-buttons, .btn');
    heroElements.forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
    });

    // Ensure all sections are visible
    const sections = document.querySelectorAll('section, .feature-card, .widget-container');
    sections.forEach(el => {
        el.style.opacity = '1';
        el.style.visibility = 'visible';
        el.style.transform = 'none';
    });
}

// Linear Theme Toggle - Light mode first (Linear's approach)
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to light mode (Linear's default)
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Apply initial theme
    applyTheme(currentTheme);
    updateThemeIcon(currentTheme);

    // Theme toggle click handler with smooth animation
    themeToggle.addEventListener('click', function() {
        // Add rotation animation to the toggle button
        themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);

        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
        updateThemeIcon(currentTheme);
        localStorage.setItem('theme', currentTheme);

        // Add page transition effect
        document.body.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Listen for system theme changes (but still prefer dark as default)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            // Still default to dark even if system prefers light
            currentTheme = 'dark';
            applyTheme(currentTheme);
            updateThemeIcon(currentTheme);
        }
    });
}

function applyTheme(theme) {
    const root = document.documentElement;

    if (theme === 'dark') {
        root.classList.add('dark-theme');
    } else {
        root.classList.remove('dark-theme');
    }

    // Linear's smooth transition
    document.body.style.transition = 'background-color 0.2s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s cubic-bezier(0.16, 1, 0.3, 1)';
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#theme-toggle i');
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

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
    
    // Force navbar to stay at top with higher z-index
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.left = '0';
        navbar.style.right = '0';
        navbar.style.width = '100%';
        navbar.style.zIndex = '9999';
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
        navbar.style.display = 'block';
    }

    // Simple scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            // Maintain positioning
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.zIndex = '9999';
        }
    });
}

// Simplified scroll animations to avoid disappearing elements
function initAnimations() {
    // Simple fade-in animation for elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Only animate elements that are initially hidden
    const animateElements = document.querySelectorAll('.widget-container');
    animateElements.forEach((el) => {
        el.style.opacity = '0.8';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Removed counter functionality for cleaner Linear-style design

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

// Linear-style button interactions
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn')) {
        const button = e.target.closest('.btn');
        // Linear-style subtle press effect
        button.style.transform = 'translateY(1px)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
});

// Linear-style effects and interactions
function initLinearEffects() {
    // Add enhanced hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.nav-link, .btn, .feature-card');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (this.classList.contains('feature-card')) {
                this.style.transform = 'translateY(-4px)';
            }
        });

        element.addEventListener('mouseleave', function() {
            if (this.classList.contains('feature-card')) {
                this.style.transform = '';
            }
        });
    });

    // Add Linear-style focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add parallax effect to hero section and scroll indicator
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        const heroContent = document.querySelector('.hero-content');
        const scrollIndicator = document.getElementById('scroll-indicator');

        // Parallax effect
        if (heroVisual && heroContent) {
            heroVisual.style.transform = `translateY(${scrolled * 0.1}px)`;
            heroContent.style.transform = `translateY(${scrolled * 0.05}px)`;
        }

        // Scroll progress indicator
        if (scrollIndicator) {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = scrolled / windowHeight;
            scrollIndicator.style.transform = `scaleX(${scrollProgress})`;
        }
    });
}

// Page-wide animation effects
function initPageAnimations() {
    // Add floating animation to widget
    const widget = document.querySelector('.widget-container');
    if (widget) {
        widget.classList.add('float');
    }

    // Add glow pulse to primary buttons
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.classList.add('glow-pulse');
        });
        btn.addEventListener('mouseleave', function() {
            this.classList.remove('glow-pulse');
        });
    });

    // Add magnetic effect to buttons
    const magneticButtons = document.querySelectorAll('.btn-primary');
    magneticButtons.forEach(btn => {
        btn.classList.add('btn-magnetic');

        btn.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });

        btn.addEventListener('mouseleave', function(e) {
            this.style.transform = '';
        });
    });

    // Add ripple effect to buttons
    const rippleButtons = document.querySelectorAll('.btn');
    rippleButtons.forEach(btn => {
        btn.classList.add('ripple');
    });

    // Simplified reveal animations - ensure elements are visible
    const revealElements = document.querySelectorAll('.feature-card, .section-title, .download-content, .contact-content');
    revealElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
}

// Advanced animations and effects
function initAdvancedAnimations() {
    // Add floating animation to widget
    const widget = document.querySelector('.widget-container');
    if (widget) {
        widget.classList.add('floating-element');
    }

    // Add pulse effect to interactive elements
    const interactiveElements = document.querySelectorAll('.feature-icon, .nav-logo');
    interactiveElements.forEach(el => {
        el.classList.add('pulse-on-hover');
    });

    // Smooth scroll with easing
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

    // Ensure navigation elements are visible
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
    });

    // Ensure theme toggle is visible
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.style.opacity = '1';
        themeToggle.style.transform = 'scale(1)';
    }

    // Mouse move parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            heroVisual.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });

    // Ensure all content is visible - remove problematic animations
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    });

    // Ensure hero content is visible
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');

    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateX(0)';
    }

    if (heroVisual) {
        heroVisual.style.opacity = '1';
        heroVisual.style.transform = 'translateX(0)';
    }

    heroButtons.forEach(btn => {
        btn.style.opacity = '1';
        btn.style.transform = 'translateY(0)';
    });

    // Create cursor trail effect
    createCursorTrail();
}

// Fixed cursor trail effect
function createCursorTrail() {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return; // Don't create trail for users who prefer reduced motion
    }

    const trail = [];
    const trailLength = 8;
    const dotSize = 12; // Size of each trail dot

    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';

        // Set initial properties
        dot.style.position = 'fixed';
        dot.style.width = dotSize + 'px';
        dot.style.height = dotSize + 'px';
        dot.style.borderRadius = '50%';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9998';
        dot.style.opacity = '0';
        dot.style.background = `radial-gradient(circle, var(--primary) 0%, transparent 70%)`;
        dot.style.transform = `scale(${(trailLength - i) / trailLength * 0.8})`;
        dot.style.transition = 'opacity 0.2s ease';

        document.body.appendChild(dot);
        trail.push(dot);
    }

    let mouseX = 0, mouseY = 0;
    let positions = [];
    let isMouseMoving = false;

    // Track mouse movement with precise positioning
    document.addEventListener('mousemove', (e) => {
        // Get accurate mouse position relative to viewport
        const rect = document.documentElement.getBoundingClientRect();
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Add current position to trail
        positions.unshift({
            x: mouseX,
            y: mouseY,
            timestamp: Date.now()
        });

        // Keep only recent positions
        if (positions.length > trailLength) {
            positions.pop();
        }

        isMouseMoving = true;
    });

    // Smooth animation loop for trail
    function updateTrail() {
        trail.forEach((dot, index) => {
            if (positions[index]) {
                // Calculate precise center position
                const centerX = positions[index].x - (dotSize / 2);
                const centerY = positions[index].y - (dotSize / 2);

                // Use transform for better performance
                dot.style.transform = `translate(${centerX}px, ${centerY}px) scale(${(trailLength - index) / trailLength * 0.8})`;
                dot.style.left = '0px';
                dot.style.top = '0px';

                // Calculate opacity based on position in trail
                const opacity = isMouseMoving ? (trailLength - index) / trailLength * 0.7 : 0;
                dot.style.opacity = opacity;
            }
        });

        requestAnimationFrame(updateTrail);
    }

    updateTrail();

    // Hide trail when mouse stops moving
    let hideTimeout;
    document.addEventListener('mousemove', () => {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            isMouseMoving = false;
            trail.forEach(dot => {
                dot.style.opacity = '0';
            });
        }, 500);
    });

    // Handle mouse leave
    document.addEventListener('mouseleave', () => {
        trail.forEach(dot => {
            dot.style.opacity = '0';
        });
    });

    // Handle mouse enter
    document.addEventListener('mouseenter', () => {
        if (isMouseMoving) {
            trail.forEach((dot, index) => {
                if (positions[index]) {
                    const opacity = (trailLength - index) / trailLength * 0.6;
                    dot.style.opacity = opacity;
                }
            });
        }
    });
}

// Removed parallax scroll effects for cleaner Linear-style design

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
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
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
