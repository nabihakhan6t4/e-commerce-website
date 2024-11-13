// Selecting the custom cursor elements
import { signOut, auth, deleteUser } from "./firebase.js";
let signOutBtn = document.getElementById("signOut");

let signout = () => {
  // Check if the user is authenticated
  const user = auth.currentUser;

  if (user) {
    // User is signed in, proceed with sign out
    signOut(auth)
      .then(() => {
        // Signed out successfully
        Swal.fire("Success", "Signed out successfully!", "success");

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = "../login/login.html"; // Adjust the URL for the login page if needed
        }, 4000); // Delay for 4 seconds
      })
      .catch((error) => {
        // Handle sign-out error
        Swal.fire(
          "Error",
          "Something went wrong during sign-out. Please try again.",
          "error"
        );
        console.log(error);
      });
  } else {
    // No user is signed in
    Swal.fire("Error", "No user is currently signed in.", "error");
  }
};

signOutBtn.addEventListener("click", signout);

let dltBtn = document.getElementById("dltAccount");

let deleteuser = () => {
  // Get the current authenticated user
  const user = auth.currentUser;

  if (user) {
    // Proceed with deleting the user
    deleteUser(user)
      .then(() => {
        console.log("User deleted successfully");

        // Success alert
        Swal.fire("Success", "Account deleted successfully!", "success");

        // Redirect to the login page after 2 seconds
        setTimeout(() => {
          window.location.href = "../index.html"; // Adjust the URL for the login page if needed
        }, 4000);
      })
      .catch((error) => {
        // Handle error
        Swal.fire(
          "Error",
          "Something went wrong during account deletion. Please try again.",
          "error"
        );
        console.log(error);
      });
  } else {
    // No user is logged in
    Swal.fire("Error", "No user is currently logged in.", "error");
  }
};

let cursor = document.querySelector(".cursor");
let cursor2 = document.querySelector(".cursor2");

// Mousemove event to update cursor position
if (cursor && cursor2) {
  document.addEventListener("mousemove", function (e) {
    // Updating the position of the custom cursors based on mouse position
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursor2.style.left = e.clientX + "px";
    cursor2.style.top = e.clientY + "px";
  });
}

// Selecting all category elements
const categories = document.querySelectorAll(".category");

// Adding click event to each category to mark the active category
categories.forEach((category) => {
  category.addEventListener("click", () => {
    // Removing the active class from all categories
    categories.forEach((cat) => cat.classList.remove("active-category"));
    // Adding the active class to the clicked category
    category.classList.add("active-category");
  });
});

// Cart array to hold items added to the cart
let cart = [];

// Function to update the cart display
function updateCartDisplay() {
  const listCartHTML = document.querySelector(".listCart");
  listCartHTML.innerHTML = ""; // Clear previous cart items

  if (cart.length === 0) {
    // Display message if cart is empty
    listCartHTML.innerHTML = "<p>Your cart is empty!</p>";
  } else {
    // Loop through the cart and display each item
    cart.forEach((item, index) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
      <div class="card" style="width: 18rem">
        <div class="card-img-container">
          <img src="${item.image}" class="card-img-top " alt="${item.name}" />
        </div>
        <div class="card-body text-center">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">
            <span class="custom-decoration"> Rs.6,000.00</span>
            <span class="text-primary text-white">${item.price}</span>
          </p>
          <button class="btn btn-danger remove-item" data-index="${index}">Remove</button>
        </div>
      </div>
    `;

      // Appending the cart item to the cart display
      listCartHTML.appendChild(cartItem);
    });

    // Adding event listeners for "Remove" buttons in the cart
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index; // Get the index of the item to be removed
        removeFromCart(index); // Call function to remove item from cart
      });
    });
  }

  // Update cart count in the cart icon
  const cartCountElement = document.querySelector(".icon-cart span");
  cartCountElement.textContent = cart.length;
}

// Function to add a product to the cart
function addToCart(product) {
  cart.push(product); // Add product to the cart array
  updateCartDisplay(); // Update the cart display

  // Show a success message after adding item to the cart
  Swal.fire({
    title: "Item Added!",
    text: "The product has been added to your cart.",
    icon: "success",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Continue Shopping",
  });
}

// Function to remove an item from the cart
function removeFromCart(index) {
  cart.splice(index, 1); // Remove the item at the specified index
  updateCartDisplay(); // Update the cart display after removing the item
}

// Function to toggle the cart visibility
function toggleCart() {
  document.body.classList.toggle("showCart"); // Toggle cart visibility
  updateCartDisplay(); // Ensure cart display is updated when toggling
}

// Add event listener to the cart icon to open/close the cart
const iconCart = document.querySelector(".icon-cart");
iconCart.addEventListener("click", toggleCart);

// Close cart functionality
const closeCart = document.querySelector(".close");
closeCart.addEventListener("click", toggleCart);

// Add event listener to all "Add to Cart" buttons
document.querySelectorAll(".addCart").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default button behavior

    // Get product details from the card
    const card = button.closest(".card");
    const product = {
      id: card.getAttribute("data-id"),
      name: card.querySelector(".card-title").textContent,
      price: card.querySelector(".card-text .text-primary").textContent,
      image: card.querySelector("img").src, // Get the image dynamically
    };

    // Add the product to the cart
    addToCart(product);
  });
});

// Setting the target date for the countdown timer
const targetDate = new Date();
targetDate.setUTCDate(targetDate.getUTCDate() + 23); // 23 days later
targetDate.setUTCHours(targetDate.getUTCHours() + 6); // 6 hours later
targetDate.setUTCMinutes(targetDate.getUTCMinutes() + 55); // 55 minutes later
targetDate.setUTCSeconds(targetDate.getUTCSeconds() + 32); // 32 seconds later

// Interval to update the countdown every second
const intervalId = setInterval(updateCountDown, 1000);

// Function to update the countdown timer
function updateCountDown() {
  const now = new Date();
  const distance = targetDate - now; // Calculate the time difference

  // Calculate days, hours, minutes, and seconds remaining
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update countdown display on the page
  document.getElementById("days").innerHTML = days; // For days
  document.getElementById("hours").innerHTML = hours; // For hours
  document.getElementById("minutes").innerHTML = minutes; // For minutes
  document.getElementById("seconds").innerHTML = seconds; // For seconds

  // Update countdown in cards
  document.getElementById("days1").innerHTML = days;
  document.getElementById("hours1").innerHTML = hours;
  document.getElementById("minutes1").innerHTML = minutes;
  document.getElementById("seconds1").innerHTML = seconds;

  // If countdown is finished, display a message
  if (distance < 0) {
    clearInterval(intervalId); // Stop the countdown
    document
      .querySelectorAll(".time")
      .forEach((time) => (time.innerHTML = "0"));
    document.getElementById("finished-message").innerHTML =
      "Countdown finished!";
  }
}

// Call the countdown function once to set initial values
updateCountDown();

// Scroll progress bar functionality
let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let scrollPercentage = document.getElementById("scroll-percentage"); // Target the percentage span
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);

  if (pos > 100) {
    scrollProgress.style.display = "grid"; // Show scroll progress bar when scrolling
  } else {
    scrollProgress.style.display = "none"; // Hide scroll progress bar when near the top
  }

  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0; // Scroll back to top when clicked
  });

  // Update the scroll progress with conic-gradient
  scrollProgress.style.background = `conic-gradient(#03012e ${scrollValue}%, #01c7f6 ${scrollValue}%)`;
};

// Call scroll value calculation on scroll and load
window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// Dropdown functionality
document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggle = document.querySelector(".dropdown-toggle");

  // Toggle dropdown menu on click
  dropdownToggle.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default action
    const dropdownMenu = dropdownToggle.nextElementSibling; // Get the dropdown menu

    // Toggle display of dropdown menu
    if (dropdownMenu.style.display === "block") {
      dropdownMenu.style.display = "none";
    } else {
      dropdownMenu.style.display = "block";
    }
  });

  // Close dropdown when clicking outside
  window.addEventListener("click", function (event) {
    if (
      !dropdownToggle.contains(event.target) &&
      !dropdownToggle.nextElementSibling.contains(event.target)
    ) {
      dropdownToggle.nextElementSibling.style.display = "none"; // Close dropdown
    }
  });
});

// Function for opening the dropdown
function openDropdown() {
  document.querySelector(".dropdown-menu").classList.toggle("show");
}

// Prevent dropdown from closing when clicking inside
function preventClose(event) {
  event.stopPropagation();
}

dltBtn.addEventListener("click", deleteuser);
