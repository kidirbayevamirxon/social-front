import { axiosInstance } from "./request";


const form = document.querySelector(".form");
const input1 = document.querySelector(".value1");
const input2 = document.querySelector(".value2");
const uspas = document.getElementById("uspasError");
uspas.style.display = "none";


form.addEventListener("submit", (e) => {
  e.preventDefault();

  axiosInstance
    .post("https://social-backend-kzy5.onrender.com/auth/login", {
      username: input1.value,
      password: input2.value,
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.token) {
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("username", input1.value);
      }
      
      location.href = "./logo.html";
    })
    .catch((error) => {
      console.error(error);
      uspas.style.display = "block";
    });
});


