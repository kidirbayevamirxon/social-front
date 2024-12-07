import axios from "axios";

const form = document.querySelector(".form");
const input1 = document.querySelector(".value1");
const input2 = document.querySelector(".value2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  axios
    .post("http://localhost:3000/users", {
      name: input1.value,
      password: input2.value,
    })
    .then((response) => {
      console.log("POST javobi:", response.data);
    })
    .catch((error) => {
      console.error("POST xatosi:", error);
    });

  axios
    .get("http://localhost:3000/users")
    .then((res) => {
        location.href='./logo.html'
      console.log("GET javobi:", res.data);
    })
    .catch((err) => {
      console.error("GET xatosi:", err);
    });
});
