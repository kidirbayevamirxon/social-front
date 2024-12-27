import { axiosInstance } from "./request";
import "../css/profile.css";

const more = document.querySelector(".form");
const fileInput = document.getElementById("fileInput");
const displayImg = document.getElementById("displayimg");

const bdiv = document.querySelector(".button-div");

const btndiv = document.createElement("div");
bdiv.appendChild(btndiv);

const btndivtop = document.createElement("div");
btndiv.appendChild(btndivtop);

const btndivbtn = document.createElement("div");
btndiv.appendChild(btndivbtn);

const img = document.createElement("img");
btndivtop.appendChild(img);
img.src = "user-solid (4).svg";
img.width = 70;
img.height = 70;

const h1div = document.createElement("div");
btndivtop.appendChild(h1div);

const h1 = document.createElement("h1");
h1div.appendChild(h1);

const p1 = document.createElement("p");
h1div.appendChild(p1);

const p2div = document.createElement("div");
btndivtop.appendChild(p2div);

const p2 = document.createElement("p");
p2div.appendChild(p2);

const p3 = document.createElement("p");
p2div.appendChild(p3);

const btn1 = document.createElement("button");
btndivtop.appendChild(btn1);

const span1 = document.createElement("span");
btndivbtn.appendChild(span1);

const span2 = document.createElement("span");
btndivbtn.appendChild(span2);

// -------------------------------------------------------------------------------------------------------------------------

btndiv.className = "btndiv";
btndivtop.className = "btndivtop";
btndivbtn.className = "btndivbtn";
h1div.className = "h1div";
p2div.className = "p2div";
h1.className = "h1";
p1.className = "p1";
p2.className = "p2";
p3.className = "p3";
btn1.className = "btn1";
span1.className = "span1";
span2.className = "span2";
img.className = "img";

btn1.type = "button";
span1.textContent = `Followers ${0}`;
span2.textContent = `Following ${0}`;
btn1.textContent = "Follow";

// -------------------------------------------------------------------------------------------------------------------------

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      displayImg.src = e.target.result;
      displayImg.style.display = "block"; 
    };

    reader.readAsDataURL(file);
  }
});

// -------------------------------------------------------------------------------------------------------------------------

more.addEventListener("submit", (event) => {
  event.preventDefault();

  const file = fileInput.files[0];

  if (file) {
    const formData = new FormData();
    formData.append("image", file); 
    formData.append("text", "Image description or any text");  
    formData.append("image_id", "your-image-id");

    
    const reader = new FileReader();
    reader.onload = function (e) {
      img.src = e.target.result;
      img.style.display = "block";
    };
    reader.readAsDataURL(file);

    
    axiosInstance
      .post("https://social-backend-kzy5.onrender.com/posts/upload", formData)
      .then((response) => {
    
        const imageUrl = response.data.imageUrl;
        console.log("Rasm URL:", imageUrl);
        localStorage.setItem("profileImage", imageUrl);
        img.src = imageUrl;
        img.style.display = "block";
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
  }
});


// ---------------------------------------------------------------------------------------------------------------------

let followersCount = 0;

btn1.addEventListener("click", () => {
  if (btn1.textContent === "Follow") {
    followersCount += 1;
    btn1.textContent = "Unfollow";
  } else {
    followersCount -= 1;
    btn1.textContent = "Follow";
  }

  span1.textContent = `Followers ${followersCount}`;
});

// -----------------------------------------------------------------------------------------------------------------------

axiosInstance.get("/auth/me").then((res) => {
  h1.textContent = res.data.username;
  p1.textContent = res.data.email;
  p2.textContent = res.data.first_name;
  p3.textContent = res.data.last_name;

 
  const profileImage = localStorage.getItem("profileImage");
  if (profileImage) {
    img.src = profileImage;
  }
}).catch((error) => {
  console.log("Error");
});
