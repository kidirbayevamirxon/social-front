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
      const spanP1=document.createElement('p')
      ldiv.appendChild(likecommit);
      likecommit.appendChild(span1);
      likecommit.appendChild(span2);
      span1.appendChild(spanP1)

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

      
      commitp.textContent = post.text || "No description available";
      p1.textContent = post.username;
      span1.textContent = `❤`;
      span2.textContent = `🗨 0`;
      spanP1.textContent=post.likes
      
      followed.addEventListener("click", (e) => {
        e.preventDefault();

        if (followed.innerText === "Follow") {
          axiosInstance
            .post("/followings/follow", { username: post.username })
            .then((respons) => {
              followed.innerText = "Unfollow";
              followed.classList.add("Unfollow");
              followed.classList.remove("Follow");
            })
            .catch((error) => {
              console.log("followda xato :", error);
            });
        } else if (followed.innerText === "Unfollow") {
          axiosInstance
            .post("/followings/unfollow", { username: post.username })
            .then((res) => {
              followed.innerText = "Follow";
              followed.classList.add("Follow");
              followed.classList.remove("Unfollow");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });

     
      span1.addEventListener("click", () => {
  
        span1.style.color ="red";
        span1.textContent = `❤ ${likes}`;

        
        axiosInstance
          .post("/posts/like")
          .then((response) => {
             if (response.data.success) {
            span1.innerText = `❤ ${response.data.likes}`;
             }
          })
          .catch((error) => {
            console.log(error);
          });
      });
      

      
      span2.addEventListener("click", () => {
        location.href = "./commit.html";
      });

      
      const imageId = post.image_id || localStorage.getItem("imageId");
      if (imageId) {
        axiosInstance
          .get(`/image/${imageId}`)
          .then((res) => {
            const imageUrl = post.image;
            commitImg.src = imageUrl;
          })
          .catch((error) => {
            console.error(error);
          });
      }
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
