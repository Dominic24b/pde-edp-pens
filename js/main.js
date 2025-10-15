/**
 * Main JavaScript file for UPT PDE Website
 * Handles navigation, interactions, and dynamic functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initSidebarFunctionality();
    initAccessibility();
    initPerformanceOptimizations();
    initDashboard();
    initThemeToggle();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active navigation link
                updateActiveNavLink(this);
            }
        });
    });

    // Active navigation link highlighting on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    updateActiveNavLink(activeLink);
                }
            }
        });
    });
}

/**
 * Update active navigation link
 */
function updateActiveNavLink(activeLink) {
    // Remove active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to current link
    activeLink.classList.add('active');
}

/**
 * Scroll effects and animations
 */
function initScrollEffects() {
    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            if (scrolled > 50) {
                navbar.style.backgroundColor = 'rgba(3, 141, 152, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = '#038D98';
                navbar.style.backdropFilter = 'none';
            }
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .employee-card, .timeline-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Sidebar functionality for About, Karya, and POB sections
 */
function initSidebarFunctionality() {
    // Handle sidebar link clicks
    const sidebarLinks = document.querySelectorAll('.about-link, .sidebar-menu a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links in this sidebar
            const sidebar = this.closest('.about-sidebar, .karya-sidebar');
            if (sidebar) {
                sidebar.querySelectorAll('.about-link, a').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }

            // Handle special cases
            if (this.getAttribute('onclick')) {
                // Let the onclick handler work
                return true;
            }
        });
    });

    // Services Sidebar functionality
    initServicesSidebar();

    // POB Sidebar functionality
    initPOBSidebar();

    // Struktur Organisasi Sidebar functionality
    initStrukturOrganisasiSidebar();

    // Visi/Misi toggle functionality
    const visiMisiSection = document.getElementById('visi-misi');
    if (visiMisiSection) {
        // Add click handlers for Visi/Misi content toggling
        const contentSections = visiMisiSection.querySelectorAll('section');
        contentSections.forEach(section => {
            section.style.cursor = 'pointer';
            section.addEventListener('click', function() {
                toggleContent(this);
            });
        });
    }
}

/**
 * Toggle content visibility
 */
function toggleContent(element) {
    const content = element.querySelector('ol, p:last-of-type');
    if (content) {
        if (content.style.display === 'none') {
            content.style.display = 'block';
            element.style.backgroundColor = '#e8f5e8';
        } else {
            content.style.display = 'none';
            element.style.backgroundColor = 'transparent';
        }
    }
}

/**
 * Toggle scroll functionality for Visi/Misi section
 */
function toggleScroll() {
    const visiMisiSection = document.getElementById('visi-misi');
    if (visiMisiSection) {
        visiMisiSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Accessibility improvements
 */
function initAccessibility() {
    // Add skip navigation link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        border-radius: 4px;
    `;

    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });

    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content landmark
    const mainContent = document.querySelector('.hero-section') || document.querySelector('main');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }

    // Improve keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key to close any open dropdowns or modals
        if (e.key === 'Escape') {
            // Close any open submenus
            document.querySelectorAll('.submenu').forEach(submenu => {
                submenu.style.display = 'none';
            });
        }
    });

    // Add ARIA labels where needed
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .employee-card');
    cards.forEach((card, index) => {
        if (!card.getAttribute('aria-label')) {
            card.setAttribute('aria-label', `Card ${index + 1}`);
        }
    });
}

/**
 * Performance optimizations
 */
function initPerformanceOptimizations() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Preload critical resources
    const criticalResources = [
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

/**
 * Utility functions
 */

// Debounce function for scroll events
function debounce(func, wait) {
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

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Animate counter numbers
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);

        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Handle responsive navigation
function handleResponsiveNav() {
    const navbar = document.querySelector('.navbar-collapse');
    if (window.innerWidth < 992) {
        // Mobile view adjustments
        navbar.classList.add('collapse');
    } else {
        // Desktop view adjustments
        navbar.classList.remove('collapse');
    }
}

// Initialize responsive navigation on load and resize
window.addEventListener('load', handleResponsiveNav);
window.addEventListener('resize', throttle(handleResponsiveNav, 250));

/**
 * Dashboard functionality
 */
function initDashboard() {
    const dashboardCards = document.getElementById('dashboardCards');
    const dashboardDots = document.getElementById('dashboardDots');

    if (!dashboardCards || !dashboardDots) return;

    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.dashboard-card').length;
    const cardsPerView = getCardsPerView();

    // Initialize dots
    updateDots();

    // Auto-scroll functionality
    let autoScrollInterval = setInterval(() => {
        if (currentSlide < totalSlides - cardsPerView) {
            currentSlide++;
            updateDashboard();
        } else {
            currentSlide = 0;
            updateDashboard();
        }
    }, 5000); // Auto-scroll every 5 seconds

    // Pause auto-scroll on hover
    const dashboardContainer = document.querySelector('.dashboard-container');
    if (dashboardContainer) {
        dashboardContainer.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });

        dashboardContainer.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(() => {
                if (currentSlide < totalSlides - cardsPerView) {
                    currentSlide++;
                    updateDashboard();
                } else {
                    currentSlide = 0;
                    updateDashboard();
                }
            }, 5000);
        });
    }
}

/**
 * Scroll dashboard cards
 */
function scrollDashboard(direction) {
    const dashboardCards = document.getElementById('dashboardCards');
    if (!dashboardCards) return;

    const totalSlides = document.querySelectorAll('.dashboard-card').length;
    const cardsPerView = getCardsPerView();

    if (direction === 'left' && currentSlide > 0) {
        currentSlide--;
    } else if (direction === 'right' && currentSlide < totalSlides - cardsPerView) {
        currentSlide++;
    }

    updateDashboard();
}

/**
 * Go to specific slide
 */
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateDashboard();
}

/**
 * Update dashboard position and dots
 */
function updateDashboard() {
    const dashboardCards = document.getElementById('dashboardCards');
    const dashboardDots = document.getElementById('dashboardDots');

    if (!dashboardCards || !dashboardDots) return;

    const cardWidth = 320; // 300px card + 20px gap
    const translateX = -currentSlide * cardWidth;

    dashboardCards.style.transform = `translateX(${translateX}px)`;
    updateDots();
}

/**
 * Update navigation dots
 */
function updateDots() {
    const dashboardDots = document.getElementById('dashboardDots');
    if (!dashboardDots) return;

    const dots = dashboardDots.querySelectorAll('.dot');
    const totalSlides = document.querySelectorAll('.dashboard-card').length;
    const cardsPerView = getCardsPerView();
    const totalDots = Math.ceil(totalSlides / cardsPerView);

    // Update dots display
    dots.forEach((dot, index) => {
        if (index === Math.floor(currentSlide / cardsPerView)) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

/**
 * Get number of cards per view based on screen size
 */
function getCardsPerView() {
    if (window.innerWidth <= 480) {
        return 1;
    } else if (window.innerWidth <= 768) {
        return 2;
    } else if (window.innerWidth <= 1024) {
        return 3;
    } else {
        return 4;
    }
}

/**
 * Handle dashboard resize
 */
function handleDashboardResize() {
    const cardsPerView = getCardsPerView();
    updateDashboard();
    updateDots();
}

/**
 * POB Sidebar functionality
 */
function initPOBSidebar() {
    const pobSidebar = document.querySelector('.pob-section .about-sidebar');
    const pobLinks = document.querySelectorAll('.pob-section .about-link');

    if (!pobSidebar || pobLinks.length === 0) return;

    // Handle POB sidebar link clicks
    pobLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all POB links
            pobLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Smooth scroll to target section
                const offsetTop = targetSection.offsetTop - 100; // Account for navbar and some padding

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active navigation highlighting
                updatePOBActiveSection(targetId);
            }
        });
    });

    // Update active section on scroll
    window.addEventListener('scroll', debounce(function() {
        const monitoringContents = document.querySelectorAll('.monitoring-content');
        const scrollPos = window.scrollY + 150; // Account for navbar

        monitoringContents.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                updatePOBActiveSection(`#${sectionId}`);
            }
        });
    }, 100));

    // Set initial active state
    if (pobLinks.length > 0) {
        pobLinks[0].classList.add('active');
    }
}

/**
 * Update active POB section
 */
function updatePOBActiveSection(targetId) {
    const pobLinks = document.querySelectorAll('.pob-section .about-link');

    pobLinks.forEach(link => {
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Struktur Organisasi Sidebar functionality
 */
function initStrukturOrganisasiSidebar() {
    const strukturSidebar = document.querySelector('#struktur-organisasi .about-sidebar');
    const strukturLinks = document.querySelectorAll('#struktur-organisasi .about-link');

    if (!strukturSidebar || strukturLinks.length === 0) return;

    // Handle Struktur Organisasi sidebar link clicks
    strukturLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all Struktur Organisasi links
            strukturLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Smooth scroll to target section
                const offsetTop = targetSection.offsetTop - 100; // Account for navbar and some padding

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update active navigation highlighting
                updateStrukturOrganisasiActiveSection(targetId);
            }
        });
    });

    // Update active section on scroll
    window.addEventListener('scroll', debounce(function() {
        const strukturSections = document.querySelectorAll('#struktur-organisasi, #galeri, #form-mutu, #pob, #karya-kami, #kerja-sama, #galeri-umum, #testimoni');
        const scrollPos = window.scrollY + 150; // Account for navbar

        strukturSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                updateStrukturOrganisasiActiveSection(`#${sectionId}`);
            }
        });
    }, 100));

    // Set initial active state
    if (strukturLinks.length > 0) {
        strukturLinks[0].classList.add('active');
    }
}

/**
 * Update active Struktur Organisasi section
 */
function updateStrukturOrganisasiActiveSection(targetId) {
    const strukturLinks = document.querySelectorAll('#struktur-organisasi .about-link');

    strukturLinks.forEach(link => {
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Theme toggle functionality
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check for saved theme preference or default to light mode
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');

            if (isDark) {
                this.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                this.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

/**
 * Services Sidebar functionality
 */
function initServicesSidebar() {
    const servicesLinks = document.querySelectorAll('.services-link');
    const serviceDetails = document.querySelectorAll('.service-detail');

    servicesLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            servicesLinks.forEach(l => l.classList.remove('active'));
            
            // Hide all service details
            serviceDetails.forEach(detail => detail.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding service detail
            const targetId = this.getAttribute('href').substring(1);
            const targetDetail = document.getElementById(targetId);
            if (targetDetail) {
                targetDetail.classList.add('active');
            }
        });
    });
}

/**
 * POB Section switching functionality
 */
function showPOBSection(sectionId) {
    // Hide all POB sections
    const pobSections = document.querySelectorAll('.pob-section');
    pobSections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }

    // Update active state in navigation
    const pobNavLinks = document.querySelectorAll('#pob .list-group-item');
    pobNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });
}

// Make function globally available
window.showPOBSection = showPOBSection;




