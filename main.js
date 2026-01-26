/**
 * Lama Tattoo Studio - Coming Soon Page
 * Main JavaScript File
 * Vanilla JS only, no dependencies
 */

(function() {
    'use strict';
    
    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
        
        // 1. Set current year in footer
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // 2. Smooth scroll for anchor links (if any added in future)
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // 3. Add loading class to body for animations
        // This ensures animations play on load
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
        
        // 4. Performance: Lazy load any future images
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
        
        // 5. Console welcome message (optional, can remove)
        console.log('%c🦙 Lama Tattoo Studio', 'color: #d4af37; font-size: 18px; font-weight: bold;');
        console.log('%cYakında İzmit\'te açılıyoruz!', 'color: #888;');
        
    });
    
    // 6. Handle reduced motion preference
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleReduceMotionChange(e) {
        if (e.matches) {
            document.documentElement.style.setProperty('--transition-base', '0ms');
        } else {
            document.documentElement.style.setProperty('--transition-base', '300ms ease');
        }
    }
    
    // Initial check
    handleReduceMotionChange(reduceMotionQuery);
    // Listen for changes
    reduceMotionQuery.addEventListener('change', handleReduceMotionChange);
    
})();