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
const categories = document.querySelectorAll(".category");

// Add click event listeners to each category
categories.forEach((category) => {
  category.addEventListener("click", () => {
    // Remove active class from all categories
    categories.forEach((cat) => cat.classList.remove("active-category"));
    // Add active class to the clicked category
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
                <p>${item.name} - ${item.price}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
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
  alert(`${product.name} has been added to the cart!`);
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
    };

    // Call function to add to cart
    addToCart(product);
  });
});


