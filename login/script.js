// Ensure the DOM is fully loaded before running the script

  // Import Firebase functionality
  import { 
    auth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendEmailVerification, 
    signOut, 
    onAuthStateChanged 
  } from "./firebase.js";
document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const signUpBtnLink = document.querySelector(".signUpBtn-link");
    const signInBtnLink = document.querySelector(".signInBtn-link");
    const wrapper = document.querySelector(".wrapper");
    const registerBtn = document.querySelector(".form-wrapper.sign-up button");
    const loginBtn = document.querySelector(".form-wrapper.sign-in button");
    const logoutBtn = document.getElementById("logoutBtn");
    const verifyEmailBtn = document.getElementById("verifyEmail");
  
    // Toggle between sign up and sign in forms
    signUpBtnLink.addEventListener("click", () => {
      wrapper.classList.add("active");
    });
  
    signInBtnLink.addEventListener("click", () => {
      wrapper.classList.remove("active");
    });
  
  
  
    // Register function
    const register = () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("signup-password").value;
  
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User registered:", user);
          // Optionally, send verification email
          sendEmailVerification(auth.currentUser)
            .then(() => {
              console.log("Verification email sent");
              // Inform the user about the verification email
            })
            .catch((error) => {
              console.error("Error sending verification email:", error.message);
            });
        })
        .catch((error) => {
          console.error("Registration error:", error.message);
        });
    };
  
    // Login function
    const login = () => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("register-password").value;
  
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("Login successful:", user);
        })
        .catch((error) => {
          console.error("Login error:", error.message);
        });
    };
  
    // Logout function
    const logout = () => {
      signOut(auth)
        .then(() => {
          console.log("User logged out successfully");
        })
        .catch((error) => {
          console.error("Logout error:", error.message);
        });
    };
  
    // Attach event listeners
    registerBtn.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent form submission
      register();
    });
  
    loginBtn.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent form submission
      login();
    });
  
    if (logoutBtn) {
      logoutBtn.addEventListener("click", logout);
    }
  
    if (verifyEmailBtn) {
      verifyEmailBtn.addEventListener("click", () => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("Verification email sent");
          })
          .catch((error) => {
            console.error("Error sending verification email:", error.message);
          });
      });
    }
  
    // Check user authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user);
      } else {
        console.log("No user logged in");
      }
    });


    // Logout functionality
    document.addEventListener("DOMContentLoaded", () => {
        const logoutBtn = document.getElementById("logoutBtn");
        
        if (logoutBtn) {
          logoutBtn.addEventListener("click", () => {
            signOut(auth)
              .then(() => {
                console.log("User logged out successfully");
                // Optionally, you might want to redirect the user or update the UI
                window.location.href = "../login/login.html"; // Redirect to login page after logout
              })
              .catch((error) => {
                console.error("Logout error:", error.message);
              });
          });
        }
      });
  });
  