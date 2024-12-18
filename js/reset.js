import axios from "axios";

const form = document.querySelector(".formm");
const input1 = document.querySelector(".value1");
const input2 = document.querySelector(".value2");
const input3 = document.querySelector(".value3");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  axios
    .post("https://social-backend-kzy5.onrender.com/auth/reset-pass", {
      username: input1.value,
      code: input2.value,
      new_pass: input3.value,
    })
    .then((respons) => {
     if (respons.status===200) {
      console.log(respons.data);
      location.href = "./logo.html";
     }
    })
    .catch((error) => {
      console.error("POST xatosi:", error);
    });
});
