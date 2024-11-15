import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser,
  signInWithPopup,
  googleProvider,
  GoogleAuthProvider,
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
            window.location.href = "../login/register.html"; // Adjust path if needed
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


let signOutBtn = document.getElementById("signOut");

let signout = () => {
  // Check if the user is authenticated
  const user = auth.currentUser;

  if (user) {
    // User is signed in, proceed with sign out
    signOut(auth)
      .then(() => {
        // Signed out successfully
        Swal.fire("Success", "Signed out successfully!", "success");

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          window.location.href = "../login/login.html"; // Adjust the URL for the login page if needed
        }, 4000); // Delay for 4 seconds
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
  } else {
    // No user is signed in
    Swal.fire("Error", "No user is currently signed in.", "error");
  }
};

signOutBtn.addEventListener("click", signout);

let dltBtn = document.getElementById("dltAccount");

let deleteuser = () => {
  // Get the current authenticated user
  const user = auth.currentUser;

  if (user) {
    // Proceed with deleting the user
    deleteUser(user)
      .then(() => {
        console.log("User deleted successfully");

        // Success alert
        Swal.fire("Success", "Account deleted successfully!", "success");

        // Redirect to the login page after 2 seconds
        setTimeout(() => {
          window.location.href = "../index.html"; // Adjust the URL for the login page if needed
        }, 4000);
      })
      .catch((error) => {
        // Handle error
        Swal.fire(
          "Error",
          "Something went wrong during account deletion. Please try again.",
          "error"
        );
        console.log(error);
      });
  } else {
    // No user is logged in
    Swal.fire("Error", "No user is currently logged in.", "error");
  }
};

dltBtn.addEventListener("click", deleteuser);

let googleBtn = document.getElementById("googleBtn");

let loginWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      console.log("token", token);
      console.log("user", user);

      Swal.fire("Success", "Signed in successfully!", "success"); // Success alert

      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        window.location.href = "../Fashion 1/Fashion-1.html"; // Adjust the URL if needed
      }, 2000); // Delay for 2 seconds
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log("errorCode", errorCode, credential);
    });
};

googleBtn.addEventListener("click", loginWithGoogle);
