let cursor = document.querySelector(".cursor");
let cursor2 = document.querySelector(".cursor2");

if (cursor && cursor2) {
  document.addEventListener("mousemove", function (e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursor2.style.left = e.clientX + "px";
    cursor2.style.top = e.clientY + "px";
  });
}

const categories = document.querySelectorAll(".category");

categories.forEach((category) => {
  category.addEventListener("click", () => {
    categories.forEach((cat) => cat.classList.remove("active-category"));
    category.classList.add("active-category");
  });
});

// Cart array to hold cart items
let cart = [];

// Function to update cart display
function updateCartDisplay() {
  const listCartHTML = document.querySelector(".listCart");
  listCartHTML.innerHTML = ""; // Clear previous cart items

  if (cart.length === 0) {
    listCartHTML.innerHTML = "<p>Your cart is empty!</p>"; // Message for empty cart
  } else {
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

      listCartHTML.appendChild(cartItem);
    });

    // Add event listeners for remove buttons
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index; // Get the index of the item
        removeFromCart(index); // Remove item from cart
      });
    });
  }

  // Update cart count in icon
  const cartCountElement = document.querySelector(".icon-cart span");
  cartCountElement.textContent = cart.length;
}

// Function to add item to the cart
function addToCart(product) {
  cart.push(product);
  updateCartDisplay();

  Swal.fire({
    title: "Item Added!",
    text: "The product has been added to your cart.",
    icon: "success",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Continue Shopping",
  });
}

// Function to remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1); // Remove item at the specified index
  updateCartDisplay(); // Update the display
}

// Function to toggle cart visibility
function toggleCart() {
  document.body.classList.toggle("showCart"); // Show or hide the cart
  updateCartDisplay(); // Ensure cart display is updated when toggling
}

// Add event listener to cart icon
const iconCart = document.querySelector(".icon-cart");
iconCart.addEventListener("click", toggleCart);

// Close button functionality
const closeCart = document.querySelector(".close");
closeCart.addEventListener("click", toggleCart);

// Add event listener to all "Add to Cart" buttons
document.querySelectorAll(".addCart").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default button behavior

    // Get product details
    const card = button.closest(".card");
    const product = {
      id: card.getAttribute("data-id"),
      name: card.querySelector(".card-title").textContent,
      price: card.querySelector(".card-text .text-primary").textContent,
      image: card.querySelector("img").src, // Get the image dynamically
    };

    // Call function to add to cart
    addToCart(product);
  });
});

const targetDate = new Date();
targetDate.setUTCDate(targetDate.getUTCDate() + 23); // 23 days later
targetDate.setUTCHours(targetDate.getUTCHours() + 6); // 6 hours later
targetDate.setUTCMinutes(targetDate.getUTCMinutes() + 55); // 55 minutes later
targetDate.setUTCSeconds(targetDate.getUTCSeconds() + 32); // 32 seconds later

setInterval(updateCountDown, 1000);

function updateCountDown() {
  const now = new Date();
  const distance = targetDate - now; // Time difference

  // Calculate days, hours, minutes, seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update countdown display
  document.querySelectorAll('.time')[0].innerHTML = days; // For days
  document.querySelectorAll('.time')[1].innerHTML = hours; // For hours
  document.querySelectorAll('.time')[2].innerHTML = minutes; // For minutes
  document.querySelectorAll('.time')[3].innerHTML = seconds; // For seconds

  // If the countdown is finished, display a message
  if (distance < 0) {
    clearInterval(updateCountDown);
    document.querySelectorAll('.time').forEach(time => time.innerHTML = "0");
  }
}











