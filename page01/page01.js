// Cursor animation
let cursor = document.querySelector(".cursor");
let cursor2 = document.querySelector(".cursor2");

document.addEventListener("mousemove", function (e) {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  cursor2.style.left = e.clientX + "px";
  cursor2.style.top = e.clientY + "px";
});


// Select all categories
const categories = document.querySelectorAll('.category');

// Add click event listeners to each category
categories.forEach(category => {
  category.addEventListener('click', () => {
    // Remove active class from all categories
    categories.forEach(cat => cat.classList.remove('active-category'));
    // Add active class to the clicked category
    category.classList.add('active-category');
  });
});



alert("hello world")