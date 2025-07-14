// TimeNest Website - Linear Style JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';

    // Initialize all components in Linear style
    initThemeToggle();
    initNavigation();
    initAnimations();
    initTimeDisplay();
    initSmoothScroll();
    initLinearEffects();
    initPageAnimations();

    // Fade in the page
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);

    console.log('TimeNest website initialized with Linear design system!');
});

// Theme Toggle Functionality - Default to Dark Mode
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Default to dark mode, check for saved preference
    const savedTheme = localStorage.getItem('theme');
    let currentTheme = savedTheme || 'dark'; // Default to dark mode

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
        root.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        root.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    }

    // Add smooth transition effect
    document.body.style.transition = 'background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
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
    
    // Navbar scroll effect with dark mode support
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (window.scrollY > 50) {
            if (isDarkMode) {
                navbar.style.background = 'rgba(15, 15, 15, 0.9)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            }
        } else {
            if (isDarkMode) {
                navbar.style.background = 'rgba(15, 15, 15, 0.8)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            }
        }
    });
}

// Enhanced Linear-style scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'slide-up';

                element.classList.add(animationType);
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) translateX(0) scale(1)';

                // Add staggered animation for child elements
                const children = element.querySelectorAll('.feature-icon, .course-name, .course-location');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Add enhanced animations to different elements
    const animateElements = document.querySelectorAll('.feature-card, .widget-container, .section-title, .hero-content, .hero-visual');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';

        // Different animation types for different elements
        if (el.classList.contains('hero-content')) {
            el.style.transform = 'translateX(-32px)';
            el.dataset.animation = 'slide-in-left';
        } else if (el.classList.contains('hero-visual')) {
            el.style.transform = 'translateX(32px)';
            el.dataset.animation = 'slide-in-right';
        } else if (el.classList.contains('widget-container')) {
            el.style.transform = 'scale(0.9)';
            el.dataset.animation = 'scale-in';
        } else {
            el.style.transform = 'translateY(32px)';
            el.dataset.animation = 'slide-up';
        }

        el.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s,
                              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;

        // Prepare child elements for staggered animation
        const children = el.querySelectorAll('.feature-icon, .course-name, .course-location');
        children.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(16px)';
            child.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        });

        observer.observe(el);
    });

    // Add page load animation
    document.body.classList.add('page-enter');
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

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.title-main');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--primary)';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        };

        setTimeout(typeWriter, 1000);
    }
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
