import { axiosInstance } from "./request";

const input = document.getElementById("value");
const fileInput = document.getElementById("value1");
const displayImg = document.getElementById("displayimg");
const form = document.querySelector(".formms");

fileInput.addEventListener("change", function (i) {
  i.preventDefault()
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      displayImg.src = e.target.result;
      displayImg.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    displayImg.style.display = "none";
    displayImg.src = "";
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("image", file);

    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.log("Iltimos, tizimga kirganingizni tekshiring.");
      return;
    }
});
axiosInstance
  .post("https://social-backend-kzy5.onrender.com/posts/upload", {
    text: input.value,
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error.response);
  });

