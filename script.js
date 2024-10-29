document.addEventListener('DOMContentLoaded', function() {
    // Screenshot carousel functionality
    const carousel = document.querySelector('.screenshot-carousel');
    const screenshots = document.querySelector('.screenshots');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    let currentIndex = 0;

    function updateCarousel() {
        const offset = currentIndex * -100;
        screenshots.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        const maxIndex = screenshots.children.length - 1;
        currentIndex = Math.min(currentIndex + 1, maxIndex);
        updateCarousel();
    });

    // Form submission handling
    const suggestionForm = document.getElementById('suggestionForm');
    const issueForm = document.getElementById('issueForm');

    function handleFormSubmit(event, formType) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const message = formData.get('message');

        // Open the user's default email client
        const subject = encodeURIComponent(`${formType} from ${email}`);
        const body = encodeURIComponent(message);
        window.location.href = `mailto:RimarApp@montulet.nl?subject=${subject}&body=${body}`;

        alert(`Thank you for your ${formType.toLowerCase()}! We'll review it soon.`);
        event.target.reset();
    }

    suggestionForm?.addEventListener('submit', (e) => handleFormSubmit(e, 'Suggestion'));
    issueForm?.addEventListener('submit', (e) => handleFormSubmit(e, 'Issue'));
});
