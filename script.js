document.addEventListener('DOMContentLoaded', () => {
    // 1. Preloader Logic
    const preloader = document.getElementById('preloader');
    const loaderProgress = document.getElementById('loader-progress');
    
    // Simulate loading progress
    let loadProgress = 0;
    const loadInterval = setInterval(() => {
        loadProgress += Math.random() * 20 + 10;
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(loadInterval);
        }
        if(loaderProgress) {
            loaderProgress.style.width = `${loadProgress}%`;
        }
    }, 100);

    // Hide preloader completely on window load
    window.addEventListener('load', () => {
        clearInterval(loadInterval);
        if(loaderProgress) loaderProgress.style.width = '100%';
        
        setTimeout(() => {
            if (preloader) {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
            }
            document.body.classList.remove('loading');
        }, 800);
    });

    // 2. Scroll Progress Indicator
    const scrollProgress = document.getElementById('scroll-progress');
    const updateScrollProgress = () => {
        if (!scrollProgress) return;
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = `${(scrollPx / winHeightPx) * 100}%`;
        scrollProgress.style.width = scrolled;
    };
    window.addEventListener('scroll', updateScrollProgress);
    
    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        if(mobileNav) {
            mobileNav.classList.toggle('open');
            document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
        }
    };

    if (mobileMenuBtn && closeMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
        closeMenuBtn.addEventListener('click', toggleMenu);
        mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));
    }

    // 4. Sticky Navbar Styling on Scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 5. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.fade-in-scroll, .slide-up, .slide-left, .slide-right, .slide-in-bottom'
    );
    animatedElements.forEach(el => scrollObserver.observe(el));

    // 6. Menu Tabs Logic
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuPanes = document.querySelectorAll('.menu-pane');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs & panes
            menuTabs.forEach(t => t.classList.remove('active'));
            menuPanes.forEach(p => p.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding pane
            const target = tab.getAttribute('data-target');
            const targetPane = document.getElementById(target);
            if(targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // 7. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 90; // Adjust for sticky nav height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 8. Handle Reservation Form Submit
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Processing...';
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                alert('Success! Your reservation request has been submitted. Our team will contact you shortly to confirm.');
                bookingForm.reset();
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
            }, 1500);
        });
    }
});
