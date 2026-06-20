// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. Preloader Fade Out
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 800); // Small delay for visual elegance
        });
        
        // Fallback in case window load event already fired or is delayed
        setTimeout(() => {
            if (!preloader.classList.contains('fade-out')) {
                preloader.classList.add('fade-out');
            }
        }, 3000);
    }

    /* ==========================================================================
       2. Custom Interactive Cursor
       ========================================================================== */
    const cursor = document.querySelector('.custom-cursor');
    const cursorGlow = document.querySelector('.custom-cursor-glow');

    if (cursor && cursorGlow && window.innerWidth > 992) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instantly position the small dot
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        // Smooth trailing effect for the outer glow ring
        const animateGlow = () => {
            const dx = mouseX - glowX;
            const dy = mouseY - glowY;
            
            // Lerping: 0.15 represents the interpolation speed factor
            glowX += dx * 0.15;
            glowY += dy * 0.15;
            
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            
            requestAnimationFrame(animateGlow);
        };
        animateGlow();

        // Hover events for buttons and links
        const interactiveElements = document.querySelectorAll('a, button, select, input, .spicy-btn, .option-pill, .qty-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
                cursorGlow.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
                cursorGlow.classList.remove('hovered');
            });
        });
    }

    /* ==========================================================================
       3. Scroll Effects & Progress Bar
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    const navLinksList = document.querySelectorAll('.nav-links a:not(.order-btn-nav)');
    const sections = document.querySelectorAll('header, section');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar scrolled background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress Bar calculation
        if (scrollProgress) {
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            if (height > 0) {
                const scrolled = (scrollY / height) * 100;
                scrollProgress.style.width = scrolled + "%";
            }
        }

        // Active link highlighting on scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       4. Mobile Navigation Menu
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });
    }

    /* ==========================================================================
       5. Parallax Effect for Hero Images
       ========================================================================== */
    document.addEventListener('mousemove', (e) => {
        const mainImg = document.querySelector('.main-img');
        const subImg = document.querySelector('.sub-img');
        const badge = document.querySelector('.floating-badge');
        const stamp = document.querySelector('.stamp-badge');
        
        if (window.innerWidth > 992) {
            // Calculate mouse coordinates offset from center
            const x = (window.innerWidth / 2 - e.clientX) / 45;
            const y = (window.innerHeight / 2 - e.clientY) / 45;
            
            if (mainImg) mainImg.style.transform = `translate(${x}px, ${y}px)`;
            if (subImg) subImg.style.transform = `translate(${x * -1.6}px, ${y * -1.6}px)`;
            if (badge) badge.style.transform = `translate(${x * 2.2}px, ${y * 2.2}px)`;
            if (stamp) stamp.style.transform = `translate(${x * -0.8}px, ${y * -0.8}px)`;
        }
    });

    /* ==========================================================================
       6. 3D Tilt Effect for Menu Cards
       ========================================================================== */
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth > 992) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -12; // tilt angle scale
                const rotateY = ((x - centerX) / centerX) * 12;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
                card.style.boxShadow = `0 35px 70px rgba(0,0,0,0.55), 0 0 30px rgba(255, 77, 29, 0.15)`;
                card.style.borderColor = `rgba(255, 77, 29, 0.45)`;
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

    /* ==========================================================================
       7. Background Embers Generation
       ========================================================================== */
    const embersContainer = document.querySelector('.embers-container');
    if (embersContainer) {
        const emberCount = window.innerWidth < 768 ? 15 : 35;
        for (let i = 0; i < emberCount; i++) {
            const ember = document.createElement('div');
            ember.classList.add('ember');
            ember.style.left = Math.random() * 100 + 'vw';
            ember.style.animationDuration = (Math.random() * 4 + 4) + 's';
            ember.style.animationDelay = Math.random() * 6 + 's';
            ember.style.opacity = Math.random() * 0.7 + 0.3;
            ember.style.transform = `scale(${Math.random() * 0.8 + 0.4})`;
            embersContainer.appendChild(ember);
        }
    }

    /* ==========================================================================
       8. Scroll Animation (Reveal Elements)
       ========================================================================== */
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });


    /* ==========================================================================
       10. Search & Filters Logic
       ========================================================================== */
    const searchInput = document.getElementById('menu-search');
    const clearSearchBtn = document.getElementById('clear-search');
    const filterTabsList = document.querySelectorAll('.filter-tab');
    const menuGrid = document.getElementById('menu-grid');
    const menuCardItems = document.querySelectorAll('.menu-card-item');
    const noResultsMsg = document.getElementById('no-results-msg');

    let currentFilter = 'all';
    let searchQuery = '';

    const filterMenu = () => {
        let visibleCount = 0;
        
        // Temporarily fade out grid content for transition feel
        menuGrid.style.opacity = '0.3';
        menuGrid.style.transform = 'scale(0.99)';

        setTimeout(() => {
            menuCardItems.forEach(item => {
                const category = item.dataset.category;
                const name = item.dataset.name.toLowerCase();
                
                const matchesCategory = currentFilter === 'all' || category === currentFilter;
                const matchesSearch = name.includes(searchQuery.toLowerCase());
                
                if (matchesCategory && matchesSearch) {
                    item.style.display = 'block';
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });

            // Handle empty results display
            if (visibleCount === 0) {
                noResultsMsg.style.display = 'block';
            } else {
                noResultsMsg.style.display = 'none';
            }

            menuGrid.style.opacity = '1';
            menuGrid.style.transform = 'scale(1)';
        }, 250);
    };

    // Filter tab toggler
    filterTabsList.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabsList.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            filterMenu();
        });
    });

    // Search input handler
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            searchQuery = searchInput.value.trim();
            
            if (searchQuery.length > 0) {
                clearSearchBtn.style.display = 'flex';
            } else {
                clearSearchBtn.style.display = 'none';
            }
            filterMenu();
        });
    }

    // Clear search handler
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchQuery = '';
            clearSearchBtn.style.display = 'none';
            filterMenu();
        });
    }



});
