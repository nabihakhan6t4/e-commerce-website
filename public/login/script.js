import { auth, createUserWithEmailAndPassword, onAuthStateChanged } from "./firebase.js";

// Get the sign-up button element
let signUpBtn = document.getElementById("signupBtn");

// Event listener for the sign-up button click
signUpBtn.addEventListener("click", signUp);

function signUp(event) {
  event.preventDefault(); // Prevent form from submitting
  console.log("Sign-Up Button Clicked!"); // Debugging log to check if the button is clicked

  // Get the email, password, and display name input values
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const displayName = document.getElementById("displayName").value.trim();

  // Check if fields are empty
  if (!email || !password || !displayName) {
    Swal.fire("Error", "Please fill in all the fields.", "error");
    return;
  }

  // Try signing up the user
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed up:", user);

      // Update user's display name
      user.updateProfile({
        displayName: displayName,
      }).then(() => {
        // Successfully updated display name
        console.log("Display name updated:", displayName);

        Swal.fire("Success", "Signed up successfully!", "success");

        // Redirect to homepage after a short delay
        setTimeout(() => {
          window.location.href = "../Fashion 1/Fashion-1.html"; // Adjust the URL if needed
        }, 2000); // Delay for 2 seconds
      }).catch((error) => {
        // Handle any errors with updating the profile
        console.error("Error updating profile:", error.message);
        Swal.fire("Error", error.message, "error");
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      // Handle sign-up errors
      Swal.fire("Error", errorMessage, "error");
    });
}

// Handle user icon and display user data after login
let userIcon = document.getElementById('user-icon');

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
