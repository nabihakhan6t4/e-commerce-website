// Cursor animation
let cursor = document.querySelector(".cursor");
let cursor2 = document.querySelector(".cursor2");

document.addEventListener("mousemove", function (e) {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  cursor2.style.left = e.clientX + "px";
  cursor2.style.top = e.clientY + "px";
});
