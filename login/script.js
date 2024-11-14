import { auth, createUserWithEmailAndPassword, signOut } from "./firebase.js";

let btn = document.getElementById("signupBtn");
let signOutBtn = document.getElementById("signOut");

let signUp = () => {
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;
  let fullName = document.getElementById("displayName").value;
  let phoneNumber = document.getElementById("phoneNumber").value;
  let isConfirmed = document.getElementById("signUpConfirmPassword").value;

  // Regex for password validation (at least 8 characters, 1 uppercase, 1 number, 1 special character)
  var regexPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Check if any field is empty
  if (!email || !password || !fullName || !phoneNumber || !isConfirmed) {
    Swal.fire("Error", "Please fill in all fields.", "error");
    return;
  }

  // Check if passwords match
  if (password !== isConfirmed) {
    Swal.fire("Error", "Passwords do not match.", "error");
    return;
  }

  // Check if password matches the regex pattern
  if (!regexPassword.test(password)) {
    Swal.fire(
      "Error",
      "Password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 special character.",
      "error"
    );
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up successfully
      const user = userCredential.user;

      // Show success message
      Swal.fire(
        "Success",
        "Congratulations, you have signed up successfully!",
        "success"
      );

      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        window.location.href = "../Fashion 1/Fashion-1.html"; // Adjust the URL if needed
      }, 2000); // Delay for 2 seconds
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire(
        "Error",
        errorMessage, // Display the error message returned from Firebase
        "error"
      );
      console.log(error);
    });
};

let signout = () => {
  signOut(auth)
    .then(() => {
      // Signed out successfully
      Swal.fire("Success", "Signed out successfully!", "success"); // Success alert

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = "./login.html"; // Adjust the URL for the login page if needed
      }, 2000); // Delay for 2 seconds
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
};

btn.addEventListener("click", signUp);
signOutBtn.addEventListener("click", signout);




// Selecting the custom cursor elements
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