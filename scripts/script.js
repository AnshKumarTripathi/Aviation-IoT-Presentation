let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  updateProgress();

  // Add subtle hover effect to cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.4)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
    });
  });

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      document.getElementById("nextBtn").click();
    } else if (e.key === "ArrowLeft") {
      document.getElementById("prevBtn").click();
    }
  });
});

// Navigation
document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentSlide < slides.length - 1) {
    slides[currentSlide].classList.remove("active");
    currentSlide++;
    slides[currentSlide].classList.add("active");
    updateProgress();
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentSlide > 0) {
    slides[currentSlide].classList.remove("active");
    currentSlide--;
    slides[currentSlide].classList.add("active");
    updateProgress();
  }
});

// Progress Bar
function updateProgress() {
  const progress = (currentSlide / (slides.length - 1)) * 100;
  document.getElementById("progressBar").style.width = `${progress}%`;

  // Update button states
  document.getElementById("prevBtn").disabled = currentSlide === 0;
  document.getElementById("nextBtn").disabled =
    currentSlide === slides.length - 1;

  // If we're on the simulation slide, start it
  if (
    slides[currentSlide].id === "simulation" &&
    typeof startSimulation === "function"
  ) {
    startSimulation();
  } else if (
    slides[currentSlide].id !== "simulation" &&
    typeof pauseSimulation === "function"
  ) {
    pauseSimulation();
  }
}

// Handle mobile swipe gestures for navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50; // Minimum distance to be considered a swipe

  if (touchEndX < touchStartX - threshold) {
    // Swipe left - go to next slide
    document.getElementById("nextBtn").click();
  }

  if (touchEndX > touchStartX + threshold) {
    // Swipe right - go to previous slide
    document.getElementById("prevBtn").click();
  }
}
