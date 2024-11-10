import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "./firebase.js";

// Get the sign-in button element
let signInBtn = document.getElementById("signInBtn");

// Event listener for the sign-in button click
signInBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form from submitting
  console.log("Sign-In Button Clicked!"); // Debugging log to check if the button is clicked

  // Get the email and password input values and trim any extra spaces
  const email = document.getElementById("signInEmail").value.trim();
  const password = document.getElementById("signInPassword").value.trim();

  // Check if email or password fields are empty
  if (!email || !password) {
    Swal.fire(
      "Error",
      "Please fill in both email and password fields.", // Alert for empty fields
      "error"
    );
    return;
  }

  // Try signing in with the provided email and password
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in:", user); // Log the user object for debugging
      Swal.fire("Success", "Signed in successfully!", "success"); // Success alert

      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        window.location.href = "../Fashion 1/Fashion-1.html"; // Adjust the URL if needed
      }, 2000); // Delay for 2 seconds

      // Clear input fields after successful login
      document.getElementById("signInEmail").value = "";
      document.getElementById("signInPassword").value = "";
    })
    .catch((error) => {
      const errorCode = error.code; // Get error code
      const errorMessage = error.message; // Get error message

      // Custom error handling based on the error code
      if (errorCode === "auth/user-not-found") {
        // If user is not found, show message to register
        Swal.fire({
          title: "Error",
          text: "You are not registered. Please sign up first.",
          icon: "error",
          confirmButtonText: "Go to Sign Up",
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to sign-up page when the user clicks "Go to Sign Up"
            window.location.href = "/signup.html"; // Make sure the path is correct
          }
        });
      } else if (errorCode === "auth/invalid-credential") {
        // If credentials are invalid, show message
        Swal.fire(
          "Error",
          "Invalid credentials provided. Please check your email and password.",
          "error"
        );
      } else {
        // Catch all other errors
        Swal.fire("Error", errorMessage, "error");
      }
    });
});


// Handle user icon and display user data after login
let userIcon = document.getElementById("user-icon");

let userCheck = () => {
  // Firebase Authentication state listener
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // If user is signed in, update the user icon with the user's display name
      userIcon.innerHTML = user.displayName || "User"; // Fallback to "User" if no displayName is available
    } else {
      // If user is signed out, clear the user icon
      userIcon.innerHTML = "";
    }
  });
};

// Call userCheck when page loads to check if user is logged in
userCheck();