import axios from "axios";
import "../css/profile.css";


const form = document.querySelector(".form");
const fileInput = document.getElementById("fileInput");
const displayImg = document.getElementById("displayimg");


fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      displayImg.src = e.target.result;
      displayImg.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    displayImg.style.display = "none";  // Fayl tanlanmasa rasmni yashirish
  }
});


// API'dan foydalanuvchi ma'lumotlarini olish va sahifada ko'rsatish
axios
  .get("https://social-backend-kzy5.onrender.com/auth/me")
  .then((res) => {
    console.log(res.data);

    const h1 = document.querySelector(".h1");
    const p1 = document.querySelector(".p1");
    const p2 = document.querySelector(".p2");
    const p3 = document.querySelector(".p3");

    if (h1) h1.textContent = `${res.data.username}`;
    if (p1) p1.textContent = `${res.data.email}`;
    if (p2) p2.textContent = `${res.data.first_name}`;
    if (p3) p3.textContent = `${res.data.last_name}`;

    // Foydalanuvchi rasm (agar mavjud bo'lsa) ni ko'rsatish
    const userImg = document.getElementById("userImg");
    if (userImg) {
      // Foydalanuvchi rasmni ko'rsatish
      userImg.src = res.data.user_img || "./images/user-solid (1).svg"; // Default rasm
    }
  })
  .catch((error) => {
    console.error("API'dan foydalanuvchi ma'lumotlarini olishda xato:", error);
  });

// Form va follow/unfollow funksiyasini bajarish
const more = document.querySelector(".form");
const bdiv = document.querySelector(".button-div");

more.addEventListener("submit", (e) => {
  e.preventDefault();

  const btndiv = document.createElement("div");
  bdiv.appendChild(btndiv);

  const btndivtop = document.createElement("div");
  btndiv.appendChild(btndivtop);

  const btndivbtn = document.createElement("div");
  btndiv.appendChild(btndivbtn);

  const img = document.createElement("img");
  btndivtop.appendChild(img);
  img.src =
    "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png";
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
  img.className="img"

  btn1.type = "button";
  span1.textContent = `Followers ${0}`;
  span2.textContent = `Following ${0}`;
  btn1.textContent = "Follow";

  let followersCount = 0;

  // Follow/Unfollow tugmasining funksiyasi
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
});
