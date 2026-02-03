// ==========================================================================
// LAMA TATTOO STUDIO - MAIN JAVASCRIPT
// ==========================================================================

// ==========================================================================
// CURRENT YEAR
// ==========================================================================
document.getElementById('current-year').textContent = new Date().getFullYear();

// ==========================================================================
// CAMPAIGN BANNER
// ==========================================================================
function initCampaignBanner() {
    const banner = document.querySelector('.campaign-banner');
    const closeBtn = document.querySelector('.campaign-close');
    
    // Check if user has previously closed the banner
    const bannerClosed = localStorage.getItem('campaignBannerClosed');
    
    if (bannerClosed) {
        banner.classList.add('hidden');
        document.body.classList.remove('has-campaign');
    } else {
        document.body.classList.add('has-campaign');
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            banner.classList.add('hidden');
            document.body.classList.remove('has-campaign');
            localStorage.setItem('campaignBannerClosed', 'true');
            
            // Track close event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'campaign_banner_close', {
                    'event_category': 'engagement'
                });
            }
        });
    }
}

// ==========================================================================
// THEME TOGGLE (Dark/Light Mode)
// ==========================================================================
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeIcon.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
    
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        
        // Track theme change
        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_change', {
                'theme': newTheme
            });
        }
    });
}

// ==========================================================================
// LANGUAGE SWITCHER
// ==========================================================================
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('language') || 'tr';
    
    // Set initial language
    document.documentElement.setAttribute('lang', currentLang);
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        }
    });
    
    // Update content based on language
    function updateLanguage(lang) {
        document.querySelectorAll('[data-tr]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }
    
    updateLanguage(currentLang);
    
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            
            // Update active state
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update language
            document.documentElement.setAttribute('lang', lang);
            localStorage.setItem('language', lang);
            updateLanguage(lang);
            
            // Track language change
            if (typeof gtag !== 'undefined') {
                gtag('event', 'language_change', {
                    'language': lang
                });
            }
        });
    });
}

// ==========================================================================
// HAMBURGER MENU
// ==========================================================================
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Update aria-expanded
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

// ==========================================================================
// FAQ ACCORDION
// ==========================================================================
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Close all FAQs
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
                q.setAttribute('aria-expanded', 'false');
            });
            
            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
            
            // Track FAQ interaction
            if (typeof gtag !== 'undefined' && !isActive) {
                gtag('event', 'faq_click', {
                    'question': question.textContent.trim()
                });
            }
        });
    });
}

// ==========================================================================
// SCROLL REVEAL ANIMATION
// ==========================================================================
function initScrollReveal() {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// ==========================================================================
// NAVBAR SCROLL EFFECT
// ==========================================================================
function initNavbarScroll() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const theme = document.documentElement.getAttribute('data-theme');
        
        if (window.scrollY > 100) {
            if (theme === 'dark') {
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            }
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            if (theme === 'dark') {
                navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
            navbar.style.backdropFilter = 'none';
        }
    });
}

// ==========================================================================
// INSTAGRAM FEED (Simulated - Replace with real Instagram API)
// ==========================================================================
function loadInstagramFeed() {
    const instagramGrid = document.getElementById('instagram-grid');
    
    if (!instagramGrid) return;
    
    // Simulated Instagram posts - Replace with real Instagram Graph API
    const posts = [
        {
            id: 1,
            image: 'https://via.placeholder.com/400x400/222222/CCCCCC?text=Instagram+1',
            link: 'https://instagram.com/lamatattooer'
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/400x400/222222/CCCCCC?text=Instagram+2',
            link: 'https://instagram.com/lamatattooer'
        },
        {
            id: 3,
            image: 'https://via.placeholder.com/400x400/222222/CCCCCC?text=Instagram+3',
            link: 'https://instagram.com/lamatattooer'
        },
        {
            id: 4,
            image: 'https://via.placeholder.com/400x400/222222/CCCCCC?text=Instagram+4',
            link: 'https://instagram.com/lamatattooer'
        },
        {
            id: 5,
            image: 'https://via.placeholder.com/400x400/222222/CCCCCC?text=Instagram+5',
            link: 'https://instagram.com/lamatattooer'
        },
        {
            id: 6,
            image: 'https://via.placeholder.com/400x400/222222/CCCCCC?text=Instagram+6',
            link: 'https://instagram.com/lamatattooer'
        }
    ];
    
    instagramGrid.innerHTML = posts.map(post => `
        <a href="${post.link}" class="instagram-item" target="_blank" rel="noopener noreferrer" aria-label="Instagram gönderisi ${post.id}">
            <img src="${post.image}" alt="Instagram gönderisi ${post.id}" loading="lazy">
            <div class="instagram-overlay">📷</div>
        </a>
    `).join('');
}

// ==========================================================================
// ANALYTICS EVENT TRACKING
// ==========================================================================
function initAnalyticsTracking() {
    // Track button clicks
    document.querySelectorAll('.btn, .nav-cta').forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const buttonHref = this.getAttribute('href');
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'button_click', {
                    'button_text': buttonText,
                    'button_url': buttonHref
                });
            }
        });
    });
    
    // Track form submissions
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'form_name': 'contact_form'
                });
            }
        });
    }
    
    // Track WhatsApp button clicks
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'whatsapp_click', {
                    'event_category': 'engagement',
                    'event_label': 'WhatsApp Contact'
                });
            }
        });
    });
    
    // Track Instagram clicks
    document.querySelectorAll('a[href*="instagram.com"]').forEach(link => {
        link.addEventListener('click', function() {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'instagram_click', {
                    'event_category': 'engagement',
                    'event_label': 'Instagram Profile'
                });
            }
        });
    });
}

// ==========================================================================
// SERVICE WORKER REGISTRATION (PWA)
// ==========================================================================
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered successfully:', registration.scope);
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        });
    }
}

// ==========================================================================
// SMOOTH PAGE LOAD
// ==========================================================================
function initPageLoad() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Performance optimization
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (link.getAttribute('href')?.startsWith('http')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
    
    // Logo error handling
    const logo = document.querySelector('.site-logo');
    if (logo) {
        logo.onerror = function() {
            console.log('Logo yüklenemedi, fallback başlık gösteriliyor');
            const brandTitle = document.querySelector('.brand-title');
            if (brandTitle) {
                brandTitle.style.fontSize = 'clamp(3.5rem, 7vw, 5rem)';
                brandTitle.style.marginTop = '40px';
            }
        };
    }
    
    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_title': document.title,
            'page_location': window.location.href
        });
    }
}

// ==========================================================================
// STUDIO INFO SLIDER
// ==========================================================================
function initStudioSlider() {
    console.log('🎨 Slider initializing...');
    
    const slider = document.querySelector('.info-slider-wrapper');
    const slides = document.querySelectorAll('.info-card');
    const prevBtn = document.querySelector('.slider-arrow-prev');
    const nextBtn = document.querySelector('.slider-arrow-next');
    const dots = document.querySelectorAll('.slider-dot');
    const progressBar = document.querySelector('.slider-progress');
    
    console.log('📊 Slider elements found:', {
        slider: !!slider,
        slides: slides.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        dots: dots.length,
        progressBar: !!progressBar
    });
    
    if (!slider || slides.length === 0) {
        console.warn('⚠️ Slider elements not found! Check HTML structure.');
        return;
    }
    
    console.log('✅ Slider found! Starting initialization...');
    
    let currentSlide = 0;
    let autoPlayInterval;
    let progressInterval;
    const autoPlayDuration = 5000; // 5 seconds
    const progressUpdateInterval = 50; // Update every 50ms
    
    function goToSlide(index) {
        currentSlide = index;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        console.log(`📍 Moved to slide ${currentSlide + 1}/${slides.length}`);
        
        // Update dots
        dots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        // Reset progress
        resetProgress();
        
        // Track slide change
        if (typeof gtag !== 'undefined') {
            gtag('event', 'slider_change', {
                'slide_index': currentSlide,
                'slide_title': slides[currentSlide].querySelector('h3')?.textContent || 'Unknown'
            });
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }
    
    function resetProgress() {
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        clearInterval(progressInterval);
        startProgress();
    }
    
    function startProgress() {
        if (!progressBar) return;
        
        let progress = 0;
        const increment = (100 / (autoPlayDuration / progressUpdateInterval));
        
        progressInterval = setInterval(() => {
            progress += increment;
            if (progress >= 100) {
                progress = 100;
                clearInterval(progressInterval);
            }
            progressBar.style.width = progress + '%';
        }, progressUpdateInterval);
    }
    
    function startAutoPlay() {
        stopAutoPlay(); // Clear any existing interval
        autoPlayInterval = setInterval(nextSlide, autoPlayDuration);
        startProgress();
        console.log('▶️ Autoplay started');
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
        clearInterval(progressInterval);
    }
    
    // Event Listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('⬅️ Previous button clicked');
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('➡️ Next button clicked');
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            console.log(`⚪ Dot ${index + 1} clicked`);
            stopAutoPlay();
            goToSlide(index);
            startAutoPlay();
        });
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoPlay();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                console.log('👆 Swiped left');
                nextSlide(); // Swipe left
            } else {
                console.log('👆 Swiped right');
                prevSlide(); // Swipe right
            }
        }
    }
    
    // Pause on hover
    const sliderContainer = document.querySelector('.info-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            console.log('⏸️ Autoplay paused (hover)');
            stopAutoPlay();
        });
        sliderContainer.addEventListener('mouseleave', () => {
            console.log('▶️ Autoplay resumed');
            startAutoPlay();
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            console.log('⌨️ Arrow Left pressed');
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            console.log('⌨️ Arrow Right pressed');
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        }
    });
    
    // Initialize
    console.log('🚀 Starting slider...');
    goToSlide(0);
    startAutoPlay();
    console.log('✅ Slider initialized successfully!');
}

// ==========================================================================
// INITIALIZE ALL FUNCTIONS ON DOM CONTENT LOADED
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
    initPageLoad();
    initCampaignBanner();
    initThemeToggle();
    initLanguageSwitcher();
    initHamburgerMenu();
    initFAQ();
    initScrollReveal();
    initNavbarScroll();
    initAnalyticsTracking();
    loadInstagramFeed();
    registerServiceWorker();
    initStudioSlider(); // NEW: Initialize slider
});

// ==========================================================================
// INSTALL PROMPT FOR PWA
// ==========================================================================
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Optionally, show your own install promotion UI here
    console.log('PWA install prompt available');
});

window.addEventListener('appinstalled', () => {
    console.log('PWA installed successfully');
    
    // Track installation
    if (typeof gtag !== 'undefined') {
        gtag('event', 'pwa_install', {
            'event_category': 'engagement'
        });
    }
});
