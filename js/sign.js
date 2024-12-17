import axios from "axios";

const form = document.querySelector(".forms");
const input1 = document.querySelector(".value1");
const input2 = document.querySelector(".value2");
const input3 = document.querySelector(".value3");
const input4 = document.querySelector(".value4");
const input5 = document.querySelector(".value5");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  axios.post("https://social-backend-kzy5.onrender.com/auth/sign-up", {
  first: input1.value,
  last: input2.value,
  name: input3.value,
  password: input4.value,
  email: input5.value,
})

    .then((response) => {
      localStorage.setItem('first',input1.value)
      localStorage.setItem('last',input2.value)
      localStorage.setItem('username',input3.value)
      localStorage.setItem('email',input5.value)
      console.log("POST javobi:", response.data);
      location.href='./logo.html'
    })
    .catch((error) => {
      console.error("POST xatosi:", error);
    });

  axios
    .get("https://social-backend-kzy5.onrender.com/auth/sign-up")
    .then((res) => {
        
      console.log("GET javobi:", res.data);
    })
    .catch((err) => {
      console.error("GET xatosi:", err);
    });
});
