import axios from "axios";

const form = document.querySelector(".form");
const input1 = document.querySelector(".value1");
const input2 = document.querySelector(".value2");
const uspas=document.getElementById("uspasError")
uspas.style.display="none"
form.addEventListener("submit", (e) => {
  e.preventDefault();

  axios
    .post("https://social-backend-kzy5.onrender.com/auth/login", {
      username: input1.value,
      password: input2.value,
    })
    .then((response) => {
      console.log("POST javobi:", response.data);

      localStorage.setItem("username", input1.value);

      location.href = "./logo.html";
    })
    .catch((error) => {
      console.error("POST xatosi:", error);
      uspas.style.display="block"
    });

  axios
    .get("https://social-backend-kzy5.onrender.com/auth/login")
    .then((res) => {
      location.href = "./logo.html";
      console.log("GET javobi:", res.data);
    })
    .catch((err) => {
      console.error("GET xatosi:", err);
    });
});

