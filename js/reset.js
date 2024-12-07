import axios from "axios";

const form = document.querySelector(".formm");
const input1 = document.querySelector(".value1");
const input2 = document.querySelector(".value2");
const input3 = document.querySelector(".value3");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  axios
    .post("http://localhost:3000/users", {
      name: input1.value,
      password: input2.value,
      new: input3.value,
    })
    .then((respons) => {
      console.log(respons.data);
    })
    .catch((error) => {
      console.error("POST xatosi:", error);
    });

  axios
    .get("http://localhost:3000/users")
    .then((res) => {
        location.href='./logo.html'
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
});

