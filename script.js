// Typed.js animation
var typed = new Typed(".auto-type", {
  strings: [
    "Fully Customizable ",
    "High Converting",
    "Next Generation",
    "Fastest",
    "Responsive",
    "Clean & Modern",
  ],
  typeSpeed: 50,
  backSpeed: 25,
  loop: true,
});

// GSAP scrolling animation for marquee
let arrows = document.querySelectorAll(".arrow");

let tween = gsap.to(".marquee__inner", {
  xPercent: -100,
  repeat: -1,
  duration: 20,
  ease: "linear",
});

// Hide arrows on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    arrows.forEach((el) => (el.style.display = "none"));
  } else {
    arrows.forEach((el) => (el.style.display = "flex"));
  }
});

// Initialize AOS
AOS.init({
  duration: 1200,
  once: true,
});

var cursor = document.querySelector(".cursor");
var cursor2 = document.querySelector(".cursor2");

document.addEventListener("mousemove", function (e) {
  // Update cursor position
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  cursor2.style.left = e.clientX + "px";
  cursor2.style.top = e.clientY + "px";
});

// Optional: Add hover effect
document.addEventListener("mouseover", function() {
  cursor.style.backgroundColor = "transparent"; // Change color on hover
});
document.addEventListener("mouseout", function() {
  cursor.style.backgroundColor = "transparent"; // Reset color when not hovering
});

