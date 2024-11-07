import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "./firebase.js";

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  const userDropdown = document.getElementById("userDropdown");
  const authButtons = document.getElementById("authButtons");
  const userName = document.getElementById("userIcon");

  if (user) {
    // User is signed in
    userName.innerText = `Welcome, ${
      user.displayName || user.email.split("@")[0]
    }`; // Display user's name or email
    userDropdown.style.display = "block"; // Show user account dropdown
    authButtons.style.display = "none"; // Hide sign up and sign in buttons
  } else {
    // No user signed in
    userDropdown.style.display = "none"; // Hide user account dropdown
    authButtons.style.display = "block"; // Show sign up and sign in buttons
  }
});

// Sign Up Function
let signUp = (event) => {
  let email = document.getElementById("signUpEmail");
  let password = document.getElementById("signUpPassword");
  let confirmPassword = document.getElementById("signUpConfirmPassword");

  event.preventDefault();

  if (password.value !== confirmPassword.value) {
    Swal.fire({
      title: "Oops!",
      text: "Your confirm password does not match your password",
      icon: "info",
    });
    return;
  }

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      Swal.fire({
        icon: "success",
        title: "Congratulations",
        text: "You are successfully signed up",
      });
      window.location.href = "../Fashion 1/Fashion-1.html"; // Redirect after sign-up
    })
    .catch((error) => {
      Swal.fire({ icon: "error", title: "Oops...", text: error.message });
    });
};

let signIn = (event) => {
  event.preventDefault(); // Prevent the form from submitting

  let email = document.getElementById("signInEmail");
  let password = document.getElementById("signInPassword");

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      Swal.fire({
        icon: "success",
        title: "Congratulations",
        text: "You are successfully signed in",
      });
      window.location.href = "../Fashion 1/Fashion-1.html"; // Redirect after sign-in
    })
    .catch((error) => {
      Swal.fire({ icon: "error", title: "Oops...", text: error.message });
    });
};

// Sign Out Handler
let signOutHandler = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out.");
      const userIcon = document.getElementById("userIcon");
      const userDropdown = document.getElementById("userDropdown");
      const authButtons = document.getElementById("authButtons");

      // Reset the UI after signing out
      userIcon.innerText = "";
      userDropdown.style.display = "none"; // Hide user dropdown
      authButtons.style.display = "block"; // Show sign-up and sign-in buttons
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

// Add Event Listener for Sign Up Button
let signupBtn = document.getElementById("signupBtn");
signupBtn.addEventListener("click", signUp);

// Add Event Listener for Sign In Button
let signInBtn = document.getElementById("signInBtn");
signInBtn.addEventListener("click", signIn);

// Add Event Listener for Sign Out Button
let signOutBtn = document.getElementById("signOut");
signOutBtn.addEventListener("click", signOutHandler);
