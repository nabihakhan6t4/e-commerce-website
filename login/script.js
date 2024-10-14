// Function to check if user is logged in
function checkLogin() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const logoutButton = document.getElementById("logoutButton");
  
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      welcomeMessage.innerText = `Hello, ${user.name}`;
      logoutButton.classList.remove("hidden");
    } else {
      welcomeMessage.innerText = "Hello";
      logoutButton.classList.add("hidden");
    }
  }
  
  // Logout function
  function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html"; // Redirect to login page after logout
  }
  
  // Event listener for the logout button
  document.getElementById("logoutButton").addEventListener("click", logout);
  
  // Check login status when page loads
  checkLogin();
  
  // Register form submit event
  document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value.toLowerCase();
    var password = document.getElementById("password").value;
  
    // Store user data in local storage
    const user = {
      name: username,
      email: email,
      password: password, // Save as plain text to hash later on login
    };
    localStorage.setItem(email, JSON.stringify(user));
  
    // Store logged-in user
    localStorage.setItem("loggedInUser", JSON.stringify(user));
  
    // Success Registration
    Swal.fire({
      icon: "success",
      title: "Registered successfully",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.href = "index.html"; // Redirect to home page after registration
    });
  });
  
  // Login form submit event
  document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    var email = document.getElementById("email").value.toLowerCase();
    var password = document.getElementById("password").value;
  
    // Check user credentials
    const userData = localStorage.getItem(email);
    if (userData) {
      const user = JSON.parse(userData);
      if (user.password === password) {
        // Store logged-in user
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        Swal.fire({
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.href = "index.html"; // Redirect to home page after login
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Incorrect password",
          text: "Please check your password.",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "User not found",
        text: "Please register first.",
      });
    }
  });
  