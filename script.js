document.addEventListener('DOMContentLoaded', function() {
    // Screenshot carousel functionality
    const carousel = document.querySelector('.screenshot-carousel');
    const screenshots = document.querySelector('.screenshots');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    let currentIndex = 0;

    // Function to load images from the /imgs/views/ directory
    async function loadScreenshots() {
        try {
            const response = await fetch('imgs/views/manifest.json');
            const images = await response.json();
            
            images.forEach(imageName => {
                const slide = document.createElement('div');
                slide.className = 'screenshot-slide';
                
                const img = document.createElement('img');
                img.src = `imgs/views/${imageName}`;
                img.alt = 'App Screenshot';
                img.loading = 'lazy'; // Enable lazy loading
                
                slide.appendChild(img);
                screenshots.appendChild(slide);
            });
        } catch (error) {
            console.error('Error loading screenshots:', error);
        }
    }

    function updateCarousel() {
        const slideWidth = document.querySelector('.screenshot-slide')?.offsetWidth || 0;
        const gap = 16; // 1rem gap
        const offset = currentIndex * -(slideWidth + gap);
        screenshots.style.transform = `translateX(${offset}px)`;
    }

    function updateButtonsVisibility() {
        const totalSlides = screenshots.children.length;
        const slidesPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        
        prevButton.style.visibility = currentIndex <= 0 ? 'hidden' : 'visible';
        nextButton.style.visibility = currentIndex >= maxIndex ? 'hidden' : 'visible';
    }

    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCarousel();
        updateButtonsVisibility();
    });

    nextButton.addEventListener('click', () => {
        const totalSlides = screenshots.children.length;
        const slidesPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
        const maxIndex = Math.max(0, totalSlides - slidesPerView);
        currentIndex = Math.min(currentIndex + 1, maxIndex);
        updateCarousel();
        updateButtonsVisibility();
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        updateCarousel();
        updateButtonsVisibility();
    });

    // Load screenshots when the page loads
    loadScreenshots();

    // Form submission handling
    var submitted = false;
    const gform = document.getElementById('gform');
    
    if (gform) {
        gform.addEventListener('submit', function(e) {
            const formElements = gform.querySelectorAll('input, textarea, button');
            formElements.forEach(element => {
                element.style.transition = 'opacity 2s';
                element.style.opacity = '0';
            });
            
            setTimeout(() => {
                gform.innerHTML = '<p class="success-message">Thank you for your feedback!</p>';
            }, 2000);
        });
    }
});
