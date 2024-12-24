import { axiosInstance } from './request';

const form = document.querySelector(".forms");
const input1 = document.querySelector(".value1");
const input2 = document.querySelector(".value2");
const input3 = document.querySelector(".value3");
const input4 = document.querySelector(".value4");
const input5 = document.querySelector(".value5");
const passwordE = document.querySelector(".passwordE");
const passwordError = document.createElement("p");
const emailError = document.createElement("p");

// Xatolik elementlarini DOMga qo'shish
passwordE.appendChild(passwordError);
passwordE.appendChild(emailError);
passwordError.className = "passwordError";
emailError.className = "emailError";

// Emailni tekshirish funksiyasi
function isValidEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email);
}

// Formaning yuborilishi
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const password = input4.value;
  const email = input5.value;

  // Parol uzunligini tekshirish
  if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters long";
    return;
  } else {
    passwordError.textContent = "";
  }

  // Emailni tekshirish
  if (!isValidEmail(email)) {
    emailError.textContent = "Please enter a valid email address";
    return;
  } else {
    emailError.textContent = "";
  }

  // Serverga so'rov yuborish
  axiosInstance
    .post("/auth/sign-up", {
      first_name: input1.value,
      last_name: input2.value,
      email: input5.value,
      password: input4.value,  
      username: input3.value,
    })
    .then((response) => {
      console.log(response.data);

      // Tokenni saqlash
      if (response.data.token) {
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }

      // Foydalanuvchi ma'lumotlarini saqlash
      localStorage.setItem("username", input3.value);
      localStorage.setItem("email", input5.value);
      localStorage.setItem("first_name", input1.value);
      localStorage.setItem("last_name", input2.value);

      // Foydalanuvchini logo sahifasiga yo'naltirish
      location.href = "./logo.html";
    })
    .catch((error) => {
      if (error.response) {
        const errorData = error.response.data;

        // Xatolikni ko'rsatish
        if (errorData.message === "Incorrect password") {
          passwordError.textContent = "Incorrect password";
        } else if (errorData.message === "Account already created") {
          emailError.textContent = "This account already exists";
        } else {
          emailError.textContent = errorData.message || "An error occurred. Please try again.";
        }
      } else {
        emailError.textContent = "Network error or server is not responding. Please try again later.";
      }
    });
});
