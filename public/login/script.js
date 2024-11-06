import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "./firebase.js"; // Corrected import statement

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
    console.log(uid);
    console.log(user);
  } else {
    console.log("User not signed in");
  }
});

// Sign Up Function
let signUp = (event) => {
  let email = document.getElementById("signUpEmail");
  let password = document.getElementById("signUpPassword");
  let confirmPassword = document.getElementById("signUpConfirmPassword");
  let fullName = document.getElementById("signUpFullName");
  let phoneNumber = document.getElementById("signUpPhoneNumber");

  event.preventDefault();

  if (password.value !== confirmPassword.value) {
    // Check if passwords match
    Swal.fire({
      title: "Oops!",
      text: "Your confirm password does not match your password",
      icon: "info",
    });
    return;
  }

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up successfully
      const user = userCredential.user;
      console.log("User signed up:", user);

      // Clear the form fields after successful sign-up
      email.value = "";
      password.value = "";
      confirmPassword.value = "";
      fullName.value = "";
      phoneNumber.value = "";
      Swal.fire({
        icon: "success",
        title: "Congratulations",
        text: 'You are successfully signed up', 
      });
    })
    .catch((error) => {
      console.error("Error signing up:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message, // Display the error message from Firebase
      });
    });
};

// Sign In Function
let signIn = (event) => {
  let email = document.getElementById("signInEmail");
  let password = document.getElementById("signInPassword");

  event.preventDefault();

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      console.log("User signed in:", user);

      // Clear the form fields after successful sign-in
      email.value = "";
      password.value = "";
      Swal.fire({
        icon: "success",
        title: "Congratulations",
        text: 'You are successfully signed in', 
      });
    })
    .catch((error) => {
      console.error("Error signing in:", error);
      Swal.fire({
        title: "Oops!",
        text: "Invalid email or password",
        icon: "error",
      });
    });
};

// Sign Out Handler
let signOutHandler = () => {
  signOut(auth) // Correct usage of signOut with auth
    .then(() => {
      // Sign-out successful
      console.log("User signed out.");
    })
    .catch((error) => {
      // An error happened during sign-out
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
