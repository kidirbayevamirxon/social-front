import { axiosInstance } from "./request";
import "../css/logo.css";

const logodiv = document.querySelector(".logodiv");
const form = document.querySelector(".form");

function createPostElement() {
  axiosInstance.get("/posts").then((res) => {
    res.data.forEach((post) => {
      const ldiv = document.createElement("div");
      logodiv.appendChild(ldiv);

      const topdiv = document.createElement("div");
      ldiv.appendChild(topdiv);

      const img = document.createElement("img");
      const p1 = document.createElement("p");

      // -----------------------------
      const followed = document.createElement("a");
      followed.className = "p2";
      followed.id = "Follow";
      followed.innerText = post.has_followed ? "Unfollow" : "Follow";
      // -----------------------------

      topdiv.appendChild(img);
      topdiv.appendChild(p1);
      topdiv.appendChild(followed);

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
      ldiv.className = "ldiv";
      topdiv.className = "topdiv";
      img.className = "lrimg";
      p1.className = "p1";

      commitp.className = "commitp";
      commit.className = "commit";
      span1.className = "span1";
      span2.className = "span2";
      likecommit.className = "likecommit";
      commitImg.className = "commitImg";

      commitp.textContent = "aaaaaaaaa";
      span1.textContent = `❤ 0`;
      span2.textContent = `🗨 0`;

      const username = localStorage.getItem("username");
      if (username) {
        p1.textContent = `${username}`;
      } else {
        console.error("Foydalanuvchi aniqlanmadi yoki element topilmadi.");
      }

      followed.addEventListener("click", (e) => {
        e.preventDefault();
        if (followed.innerText === "Follow") {
          axiosInstance
            .post("/followings/follow", { username: post.username })
            .then((respons) => {
              if (respons.status === 200) {
                followed.innerText = "Unfollow";
                followed.classList.add("Unfollow");
                followed.classList.remove("Follow");
              }
            })
            .catch((error) => {
              console.log("followda xato :", error);
            });
        } else if (followed.innerText === "Unfollow") {
          axiosInstance
            .post("/followings/unfollow", { username: post.username })
            .then((res) => {
              if (res.status === 200) {
                followed.innerText = "Follow";
                followed.classList.add("Follow");
                followed.classList.remove("Unfollow");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
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
      axiosInstance.get("/posts").then((res) => {
        console.log(res.data);
      });
    });
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
