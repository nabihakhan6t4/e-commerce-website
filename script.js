var typed = new Typed(".auto-type", {
  strings: [
    "Fully Customizable ",
    "High Converting",
    "Next Generation",
    "Fastest",
    "Responsive",
    "Clean & Modern",
  ],
  typeSpeed: 50, // Speed of typing (ms)
  backSpeed: 25, // Speed of backspacing (ms)
  loop: true, // Loops the typing effect
});

let obj = {
  picture: "images/fashion-3.jpg",
};

// Using Object.keys to iterate through the object's keys
for (var key of Object.keys(obj)) {
  var box = document.querySelector(".box");
  box.innerHTML = `<div>
  <img src = '${key}' alt=''/>
  </div>`;
  console.log(key + ": " + obj[key]); // logs the key and its value
}

// Alternatively, using for...in
for (var key in obj) {
  console.log(key + ": " + obj[key]); // logs the key and its value
}

console.log("hi");
