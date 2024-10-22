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

const intervalId = setInterval(updateCountDown, 1000);

function updateCountDown() {
  const now = new Date();
  const distance = targetDate - now; // Time difference

  // Calculate days, hours, minutes, seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update countdown display
  document.getElementById("days").innerHTML = days; // For days
  document.getElementById("hours").innerHTML = hours; // For hours
  document.getElementById("minutes").innerHTML = minutes; // For minutes
  document.getElementById("seconds").innerHTML = seconds; // For seconds

  // Update countdown in cards
  document.getElementById("days1").innerHTML = days;
  document.getElementById("hours1").innerHTML = hours;
  document.getElementById("minutes1").innerHTML = minutes;
  document.getElementById("seconds1").innerHTML = seconds;

  // If the countdown is finished, display a message
  if (distance < 0) {
    clearInterval(intervalId); // Correctly clear the interval
    document
      .querySelectorAll(".time")
      .forEach((time) => (time.innerHTML = "0"));
    // Optionally display a finished message
    document.getElementById("finished-message").innerHTML =
      "Countdown finished!";
  }
}

// Optionally, you can initialize the countdown immediately if you want to show real-time updates
updateCountDown(); // Call once to set the initial values

let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let scrollPercentage = document.getElementById("scroll-percentage"); // Target the percentage span
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);

  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }

  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });

  // Update the percentage next to the arrow

  scrollProgress.style.background = `conic-gradient(#03012e ${scrollValue}%, #01c7f6 ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggle = document.querySelector(".dropdown-toggle");

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
      dropdownToggle.nextElementSibling.style.display = "none";
    }
  });
});

// let arr = [3, 5, 89, 656, 2, 76, 92];
// let [a, , c, ...rest] = arr;
// console.log("a", arr[a]); //incorrect usage  arr[a]   arr[3]  => 656
// // console.log( "b", b);  //incorrect usage arr[b] arr[5]  => 76
// try {
//   console.log("b", arr[b]); //incorrect usage arr[b] arr[5]  => 76
// } catch (err) {
//   console.log(err);
// }
// console.log("c", arr[c]); //incorrect usage arr[c]  arr[89]  => undefined
// console.log("rest", rest); //correct usage



// let arr = [3, 5, 89, 656, 2, 76, 92];
// let [a, , c, ...rest] = arr;
// console.log("a", a); 
// // console.log( "b", b);  
// try {
//   console.log("b", b ); 
// } catch (err) {
//   console.log(err);
// }
// console.log("c", c); 
// console.log("rest", rest); //correct usage



// let obj1 = {...arr}
// console.log(obj1);

//   let arr1 = Object.values(obj1)
//   let arr2 = Object.keys(obj1)
//   let arr3 = Object.entries(obj1)

//   console.log(arr1);
//   console.log(arr2);
//   console.log(arr3);


  
 


//  let arr = [0,2,4,6,]
//  let arr1 = [9,10,76,93]
//  let combinedArr = [...arr,...arr1]
//  console.log(combinedArr);
 