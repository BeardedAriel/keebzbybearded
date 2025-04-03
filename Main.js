window.onload = function() {
    // Initial delay before starting preloader fade-out
    setTimeout(function() {
        // Fade out preloader
        document.getElementById("preloader").style.opacity = "0";
        
        // Hide preloader after fade-out
        setTimeout(function() {
            document.getElementById("preloader").style.display = "none";
            document.body.classList.add('fade-in'); // Ensure body has fade-in class after preloader

            // Make banners visible after preloader fade-out
            document.querySelector('.banner-container-left').style.opacity = '1'; // Left banner fade-in
            document.querySelector('.banner-container-right').style.opacity = '1'; // Right banner fade-in
            document.querySelector('.banner-container-middle').style.opacity = '1'; // Middle banner fade-in
        }, 4500); // Delay to match the fade duration of preloader (4.5 seconds)
    }, 500); // Initial delay to show the preloader for 0.5 seconds before fading out
};

// Image Slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slider-container .slide');
const totalSlides = slides.length;

// Event listener for "Next" button to move to the next slide
document.querySelector('.next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
});

// Event listener for "Previous" button to move to the previous slide
document.querySelector('.prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
});

// Function to update the slider position based on current slide
function updateSlider() {
    const offset = -currentSlide * 100; // Calculate the offset for the slide
    document.querySelector('.slider-container').style.transform = `translateX(${offset}%)`; // Move slider container
}
