import axios from "axios";

const fileInput = document.getElementById("value1");
const displayImg = document.getElementById("displayimg");
const form = document.querySelector(".formms");

fileInput.addEventListener("change", function () {
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

  if (file) {
    const formData = new FormData();
    formData.append("image", file);

    const token = localStorage.getItem("authToken");

    if (!token) {
      console.log("Iltimos, tizimga kirganingizni tekshiring.");
      return;
    }

    axios
      .post("https://social-backend-kzy5.onrender.com/posts/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response ? error.response.data : error);
      });
  }
});
