import axios from "axios";

const form = document.querySelector(".forms");
const input1 = document.querySelector(".value1");
const input2 = document.querySelector(".value2");
const input3 = document.querySelector(".value3");
const input4 = document.querySelector(".value4");
const input5 = document.querySelector(".value5");
const passwordE = document.querySelector(".passwordE");
const passwordError = document.createElement("p");
const emailError = document.createElement("p");

passwordE.appendChild(passwordError);
passwordE.appendChild(emailError);
passwordError.className = "passwordError";
emailError.className = "emailError";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const password = input4.value;


  if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters long";
    return; 
  } else {
    passwordError.textContent = "";
  }


  axios.post("https://social-backend-kzy5.onrender.com/auth/sign-up", {
    first_name: input1.value,
    last_name: input2.value,
    email: input5.value,
    password: password,
    username: input3.value
  })
  .then((response) => {
    console.log("POST javobi:", response.data);
    location.href = './logo.html';
  })
  .catch((error) => {
    if (error.response) {
      const errorData = error.response.data;
      if (errorData.message === 'Incorrect password') {
        passwordError.textContent = "Incorrect password";
      } else if (errorData.message === 'Account already created') {
        emailError.textContent = "This account already exists";
      }
      console.error("POST xatosi:", errorData);
    }
  });
});
