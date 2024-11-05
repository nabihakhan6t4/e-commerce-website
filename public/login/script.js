import { auth, createUserWithEmailAndPassword } from "./firebase.js";

let signUp = (event) => {
  let email = document.getElementById("signUpEmail");
  let password = document.getElementById("signUpPassword");
  let confirmPassword = document.getElementById("signUpConfirmPassword");
  let fullName = document.getElementById("signUpFullName");
  let phoneNumber = document.getElementById("signUpPhoneNumber");

  event.preventDefault();
  createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value,
    confirmPassword.value,
    fullName.value,
    phoneNumber.value
  )
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("user", user);
    })
    .catch((error) => {
      console.log("error", error);
      if (password === confirmPassword) {
        Swal.fire({
          title: "Oops!",
          text: "Your confirm Password Does not Match your Password",
          icon: "info",
        });
      }
    });
};

let signupBtn = document.getElementById("signupBtn");
signupBtn.addEventListener("click", signUp);
