import { axiosInstance } from "./request";
import "../css/logo.css";

const logodiv = document.querySelector(".logodiv");
const form = document.querySelector(".form");

function createPostElement() {
  const ldiv = document.createElement("div");
  logodiv.appendChild(ldiv);

  const topdiv = document.createElement("div");
  ldiv.appendChild(topdiv);

  const img = document.createElement("img");
  const p1 = document.createElement("p");
  const p2 = document.createElement("button");
  topdiv.appendChild(img);
  topdiv.appendChild(p1);
  topdiv.appendChild(p2);

  const commit = document.createElement("div");
  const commitp = document.createElement("p");
  const commitImg = document.createElement("img");
  ldiv.appendChild(commit);
  commit.appendChild(commitp);
  commit.appendChild(commitImg);

  const likecommit = document.createElement("div");
  const span1 = document.createElement("button");
  const span2 = document.createElement("button");
  ldiv.appendChild(likecommit);
  likecommit.appendChild(span1);
  likecommit.appendChild(span2);

  span1.type = "button";
  span2.type = "button";
  p2.type = "button";
  ldiv.className = "ldiv";
  topdiv.className = "topdiv";
  img.className = "lrimg";
  p1.className = "p1";
  p2.className = "p2";
  commitp.className = "commitp";
  commit.className = "commit";
  span1.className = "span1";
  span2.className = "span2";
  likecommit.className = "likecommit";
  commitImg.className = "commitImg";

  p2.textContent = "Follow";
  commitp.textContent = "aaaaaaaaa";
  span1.textContent = `❤ ${0}`;
  span2.textContent = `🗨 ${0}`;

  const username = localStorage.getItem("username");
  if (username) {
    p1.textContent = `${username}`;
  } else {
    console.error("Foydalanuvchi aniqlanmadi yoki element topilmadi.");
  }

  p2.addEventListener("click", () => {
    p2.textContent = p2.textContent === "Follow" ? "Unfollow" : "Follow";
  });

  let liked = 0;
  span1.addEventListener("click", () => {
    liked = liked === 0 ? 1 : 0;
    span1.style.color = liked ? "red" : "#fff";
    span1.textContent = `❤ ${liked}`;
  });

  span2.addEventListener("click", () => {
    location.href = "./commit.html";
  });

  return { commitImg, span2 };
}

let com = 0;
window.addEventListener("incrementCom", (event) => {
  com += 1;
  console.log(com);
});

const { commitImg, span2 } = createPostElement();

span2.textContent = `🗨 ${com}`;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createPostElement();
});

const imageId = localStorage.getItem("imageId");

axiosInstance
  .get(`/image/${imageId}`)
  .then((res) => {
    console.log(res.data);
    const imageUrl = res.data.image_id;
    commitImg.src = imageUrl;
    commitImg.alt = "";
  })
  .catch((error) => {
    console.error(error);
  });