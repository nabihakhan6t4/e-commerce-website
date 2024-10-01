// Ensure DOM is fully loaded before running scripts
document.addEventListener("DOMContentLoaded", function () {
  // Check if the .auto-type element exists for Typed.js animation
  const autoTypeElement = document.querySelector(".auto-type");
  if (autoTypeElement) {
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
  } else {
    console.error(".auto-type element not found");
  }

  // Check if .marquee__inner exists for GSAP animation
  const marqueeInnerElement = document.querySelector(".marquee__inner");
  if (marqueeInnerElement) {
    gsap.to(".marquee__inner", {
      xPercent: -100,
      repeat: -1,
      duration: 20,
      ease: "linear",
    });
  } else {
    console.error(".marquee__inner element not found");
  }

  // Hide arrows on scroll
  const arrows = document.querySelectorAll(".arrow");
  window.addEventListener("scroll", () => {
    arrows.forEach(
      (el) => (el.style.display = window.scrollY > 100 ? "none" : "flex")
    );
  });

  // Cursor animation
  const cursor = document.querySelector(".cursor");
  const cursor2 = document.querySelector(".cursor2");

  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursor2.style.left = e.clientX + "px";
    cursor2.style.top = e.clientY + "px";
  });


})