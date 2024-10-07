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
          <img src="${item.image}" class="card-img-top custom-img" alt="${item.name}" />
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

document.addEventListener("DOMContentLoaded", function () {
  const products = document.documentElement.querySelector(".products");

  async function fetchProducts(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      let productsHTML = "";
  
      for (let i = 0; i < data.length; i++) {
        const imageUrl = data[i].images.length > 0 ? data[i].images[0] : 'placeholder.jpg'; // First image or placeholder
        const description = data[i].description;
  
        productsHTML += `
          <div class="card" data-id="${data[i].id}" style="width: 18rem; height:18rem;">
            <div class="card-img-container">
              <img src="${imageUrl}" loading="eager" class="card-img-top product-img" alt="${data[i].title}" />
            </div>
            <div class="card-body text-center">
              <h5 class="product-title">${data[i].title}</h5>
              <h6 class="product-category">${data[i].category.name}</h6>
              <p class="product-description">${description.length > 20 ? description.substring(0, 20).concat("...more") : description}</p>
              <div class="product-price-container">
                <h3 class="product-price">Rs.${data[i].price}</h3>
                <a href="#" type="button" data-productID="${data[i].id}" class="btn btn-custom addCart">
                  Add to Cart
                  <i class="fa-solid fa-cart-shopping"></i>
                </a>
              </div>
            </div>
          </div>`;
      }
  
      products.innerHTML = productsHTML;
      attachAddToCartListeners(); // Attach listeners here
    } catch (error) {
      console.error("Fetch error:", error);
      products.innerHTML = "<p>Failed to load products. Please try again later.</p>";
    }
  }
  


  fetchProducts(`https://api.escuelajs.co/api/v1/products`);

  function attachAddToCartListeners() {
    document.querySelectorAll(".addCart").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const card = button.closest(".card");
        const product = {
          id: card.getAttribute("data-id"),
          name: card.querySelector(".product-title").textContent,
          price: card.querySelector(".product-price").textContent,
          image: card.querySelector("img").src,
        };
        addToCart(product);
      });
    });
  }
});
