import { axiosInstance } from "./request";

const input = document.getElementById("value");
const fileInput = document.getElementById("value1");
const displayImg = document.getElementById("displayimg");
const form = document.querySelector(".formms");

fileInput.addEventListener("change", function (i) {
  i.preventDefault();
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
  if (!file) {
    console.log("Faylni tanlang.");
    return; 
  }

  const formData = new FormData();
  formData.append("image", file); 
  formData.append("text", input.value);
  formData.append("image_id", 123);

  
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.log("Iltimos, tizimga kirganingizni tekshiring.");
    return;
  }

  
  axiosInstance
    .post("/posts/upload", formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      if (error.response) {
        console.log("Xatolik:", error.response.data); 
        console.log("Status:", error.response.status);
        console.log("Detail:", error.response.data.detail);
      } else {
        console.log("Tarmoq xatosi yoki server javob bermadi.");
      }
    });
});
