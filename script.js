// TimeNest Website - Linear Style JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components in Linear style
    initThemeToggle();
    initNavigation();
    initAnimations();
    initTimeDisplay();
    initSmoothScroll();
    initLinearEffects();

    console.log('TimeNest website initialized with Linear design system!');
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Apply initial theme
    applyTheme(currentTheme);
    updateThemeIcon(currentTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
        updateThemeIcon(currentTheme);
        localStorage.setItem('theme', currentTheme);
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            currentTheme = e.matches ? 'dark' : 'light';
            applyTheme(currentTheme);
            updateThemeIcon(currentTheme);
        }
    });
}

function applyTheme(theme) {
    const root = document.documentElement;

    if (theme === 'dark') {
        root.style.setProperty('--bg-primary', 'var(--dark-bg-primary)');
        root.style.setProperty('--bg-secondary', 'var(--dark-bg-secondary)');
        root.style.setProperty('--bg-tertiary', 'var(--dark-bg-tertiary)');
        root.style.setProperty('--bg-overlay', 'var(--dark-bg-overlay)');
        root.style.setProperty('--bg-elevated', 'var(--dark-bg-elevated)');
        root.style.setProperty('--text-primary', 'var(--dark-text-primary)');
        root.style.setProperty('--text-secondary', 'var(--dark-text-secondary)');
        root.style.setProperty('--text-tertiary', 'var(--dark-text-tertiary)');
        root.style.setProperty('--text-placeholder', 'var(--dark-text-placeholder)');
        root.style.setProperty('--border-primary', 'var(--dark-border-primary)');
        root.style.setProperty('--border-secondary', 'var(--dark-border-secondary)');
        document.body.classList.add('dark-theme');
    } else {
        root.style.setProperty('--bg-primary', '#FFFFFF');
        root.style.setProperty('--bg-secondary', 'var(--neutral-1)');
        root.style.setProperty('--bg-tertiary', 'var(--neutral-2)');
        root.style.setProperty('--bg-overlay', 'rgba(255, 255, 255, 0.8)');
        root.style.setProperty('--bg-elevated', '#FFFFFF');
        root.style.setProperty('--text-primary', 'var(--neutral-12)');
        root.style.setProperty('--text-secondary', 'var(--neutral-9)');
        root.style.setProperty('--text-tertiary', 'var(--neutral-7)');
        root.style.setProperty('--text-placeholder', 'var(--neutral-6)');
        root.style.setProperty('--border-primary', 'var(--neutral-3)');
        root.style.setProperty('--border-secondary', 'var(--neutral-4)');
        document.body.classList.remove('dark-theme');
    }
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

// Linear-style scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add Linear-style animations to elements
    const animateElements = document.querySelectorAll('.feature-card, .widget-container, .section-title');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
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
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.nav-link, .btn, .feature-card');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (this.classList.contains('feature-card')) {
                this.style.transform = 'translateY(-1px)';
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
