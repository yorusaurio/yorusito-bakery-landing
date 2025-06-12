// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const smoothScroll = function(target) {
        const element = document.querySelector(target);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 80, // Offset for header
                behavior: 'smooth'
            });
        }
    };

    // Apply smooth scrolling to all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });

    // Navbar scroll effect
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Animation for product cards
    const animateCards = function() {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('card-animated');
            }, 150 * index);
        });
    };

    // Reveal elements on scroll
    const revealElements = function() {
        const elements = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - 50) {
                element.classList.add('revealed');
            }
        });
    };

    // Add animation classes to elements
    document.querySelectorAll('.feature').forEach(feature => {
        feature.classList.add('reveal');
    });

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.classList.add('reveal');
    });

    document.querySelectorAll('.product-card').forEach(card => {
        card.classList.add('reveal');
    });

    document.querySelector('.about-image').classList.add('reveal');
    document.querySelector('.hero-image').classList.add('reveal');

    // Initial animations
    setTimeout(animateCards, 500);

    // Run reveal on scroll
    window.addEventListener('scroll', revealElements);
    revealElements(); // Run once on load

    // Cupcake cursor animation
    const createCupcake = () => {
        const cupcake = document.createElement('div');
        cupcake.classList.add('cupcake-cursor');
        document.body.appendChild(cupcake);

        // Set initial position
        const initialX = Math.random() * window.innerWidth;
        const initialY = -50;
        cupcake.style.left = initialX + 'px';
        cupcake.style.top = initialY + 'px';

        // Animate falling
        const fallAnimation = cupcake.animate([
            { top: initialY + 'px', opacity: 0 },
            { opacity: 0.8, offset: 0.2 },
            { top: window.innerHeight + 'px', opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 3000,
            easing: 'ease-in',
            iterations: 1
        });

        // Remove from DOM when animation completes
        fallAnimation.onfinish = () => {
            cupcake.remove();
        };
    };

    // Create cupcakes periodically
    setInterval(createCupcake, 5000);

    // Cake counter animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const duration = 2000;
        const increment = target / (duration / 30);
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = target;
            }
        };

        // Start the animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
    
    // Form submission animation
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add sending class for animation
            form.classList.add('sending');
            
            // Simulate sending (would be an actual API call in production)
            setTimeout(() => {
                form.classList.remove('sending');
                form.classList.add('sent');
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    form.classList.remove('sent');
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.classList.add('success-message');
                    successMsg.textContent = '¡Mensaje enviado con éxito!';
                    form.appendChild(successMsg);
                    
                    // Remove success message after delay
                    setTimeout(() => {
                        successMsg.classList.add('fade-out');
                        setTimeout(() => {
                            successMsg.remove();
                        }, 500);
                    }, 3000);
                }, 1500);
            }, 1500);
        });
    }
});
