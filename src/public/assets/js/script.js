// High-Performance WanderLust Script
(function () {
    'use strict';

    // 🚀 Performance: Early DOM Ready Check
    const isDocumentReady = document.readyState === 'complete' || document.readyState === 'interactive';
    
    // 🚀 Performance: Debounce function for search
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

    // 🚀 Performance: Intersection Observer for Lazy Loading
    const createLazyImageObserver = () => {
        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            loadAllImages();
            return;
        }

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            // Load images when they're 50px away from viewport
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        return imageObserver;
    };

    // 🚀 Performance: Optimized Image Loading
    const loadImage = (img) => {
        const src = img.dataset.src;
        if (!src) return;

        // Create a new image element for preloading
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            // Add fade-in effect
            img.style.transition = 'opacity 0.3s ease-in-out';
            img.style.opacity = '0';
            img.src = src;
            
            // Force reflow then fade in
            img.offsetHeight;
            img.style.opacity = '1';
            
            // Remove data-src to prevent reprocessing
            delete img.dataset.src;
            img.classList.add('loaded');
        };
        
        imageLoader.onerror = () => {
            // Fallback for broken images
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250"%3E%3Crect width="100%" height="100%" fill="%23f8f9fa"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy="0.3em" fill="%23dee2e6"%3EImage unavailable%3C/text%3E%3C/svg%3E';
            img.classList.add('error');
        };
        
        imageLoader.src = src;
    };

    // 🚀 Performance: Load all images (fallback)
    const loadAllImages = () => {
        const lazyImages = document.querySelectorAll('.lazy-image');
        lazyImages.forEach(loadImage);
    };

    // 🚀 Performance: Initialize Lazy Loading
    const initLazyLoading = () => {
        const lazyImages = document.querySelectorAll('.lazy-image[data-src]');
        if (lazyImages.length === 0) return;

        const imageObserver = createLazyImageObserver();
        if (imageObserver) {
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    };

    // 🚀 Performance: Optimize Search Functionality
    const initSearch = () => {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        const debouncedSearch = debounce((query) => {
            if (query.length >= 3 || query.length === 0) {
                // Trigger search with minimal DOM manipulation
                const searchForm = document.getElementById('searchForm');
                if (searchForm) {
                    // Use requestAnimationFrame for smooth UI updates
                    requestAnimationFrame(() => {
                        searchForm.submit();
                    });
                }
            }
        }, 300);

        searchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });
    };

    // 🚀 Performance: Form Validation
    const initFormValidation = () => {
        const forms = document.querySelectorAll('.needs-validation');
        
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                
                form.classList.add('was-validated');
            }, false);
        });
    };

    // 🚀 Performance: Critical Path Loading
    const initCriticalFeatures = () => {
        initFormValidation();
        initLazyLoading();
        initSearch();
    };

    // 🚀 Performance: Enhanced Navbar Functionality
    const initNavbarFeatures = () => {
        // Enhanced hamburger menu functionality
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarToggler && navbarCollapse) {
            // Ensure Bootstrap functionality is working
            navbarToggler.addEventListener('click', function() {
                console.log('🍔 Hamburger menu clicked');
                
                // Fallback if Bootstrap isn't working
                if (!window.bootstrap && !window.Bootstrap) {
                    navbarCollapse.classList.toggle('show');
                    console.log('🔧 Using fallback toggle functionality');
                }
            });
            
            // Add smooth transition for mobile menu
            navbarCollapse.addEventListener('shown.bs.collapse', () => {
                navbarCollapse.style.animation = 'slideDown 0.3s ease-out';
                console.log('📱 Mobile menu opened');
            });
            
            navbarCollapse.addEventListener('hidden.bs.collapse', () => {
                navbarCollapse.style.animation = 'slideUp 0.3s ease-out';
                console.log('📱 Mobile menu closed');
            });
        }

        // Enhanced explore dropdown functionality
        const exploreDropdown = document.getElementById('exploreDropdown');
        if (exploreDropdown) {
            // Add click analytics (optional)
            exploreDropdown.addEventListener('click', () => {
                console.log('🌍 Explore dropdown accessed');
            });
            
            // Add keyboard navigation support
            exploreDropdown.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    exploreDropdown.click();
                }
            });
        }

        // Enhanced navigation loaded
        console.log('Navigation features initialized');
    };

    // Global functions for navbar dropdown items
    window.scrollToFilters = function() {
        // Try to find filter/category section on the page
        const filtersSection = document.querySelector('.filters-container, .category-filters, .search-filters, .filter-section');
        if (filtersSection) {
            filtersSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // If no filters found, redirect to listings page
            window.location.href = '/listings#filters';
        }
        console.log('🎯 Scrolling to filters section');
    };

    window.focusSearchInput = function() {
        // Try to find search input on the page
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"], .search-input, #search');
        if (searchInput) {
            searchInput.focus();
            searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            // If no search input found, redirect to listings page
            window.location.href = '/listings';
        }
        console.log('🔍 Focusing search input');
    };

    // 🚀 Performance: Non-critical features (load after)
    const initNonCriticalFeatures = () => {
        initNavbarFeatures();
        console.log('Performance optimizations loaded');
    };

    // 🚀 Performance: Initialize based on document state
    if (isDocumentReady) {
        initCriticalFeatures();
        setTimeout(initNonCriticalFeatures, 100);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            initCriticalFeatures();
            setTimeout(initNonCriticalFeatures, 100);
        });
    }

    // 🚀 Performance: Handle page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            // Page became visible - check for any unloaded images
            const unloadedImages = document.querySelectorAll('.lazy-image[data-src]');
            if (unloadedImages.length > 0) {
                initLazyLoading();
            }
        }
    });

})();

// 🚀 Global Navigation Functions (for enhanced Explore dropdown)
function scrollToFilters() {
    const filtersSection = document.querySelector('#filters');
    if (filtersSection) {
        filtersSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
        
        // Add a visual highlight to show the user where they are
        filtersSection.style.transition = 'all 0.3s ease';
        filtersSection.style.transform = 'scale(1.02)';
        filtersSection.style.boxShadow = '0 0 20px rgba(254, 66, 77, 0.3)';
        
        setTimeout(() => {
            filtersSection.style.transform = 'scale(1)';
            filtersSection.style.boxShadow = 'none';
        }, 1000);
        
        console.log('Scrolled to filters');
    }
}

function focusSearchInput() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        setTimeout(() => {
            searchInput.focus();
            searchInput.placeholder = '🔍 Start typing to search amazing places...';
            
            // Add a gentle glow effect
            searchInput.style.transition = 'all 0.3s ease';
            searchInput.style.boxShadow = '0 0 15px rgba(102, 126, 234, 0.4)';
            
            setTimeout(() => {
                searchInput.style.boxShadow = 'none';
            }, 2000);
        }, 500);
        
        console.log('Search focused');
    }
}