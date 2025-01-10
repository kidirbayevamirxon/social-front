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
      const span1 = document.createElement("a");
      const span2 = document.createElement("a");
      const spanP1 = document.createElement("p");
      const spanP2 = document.createElement("p");
      ldiv.appendChild(likecommit);
      likecommit.appendChild(span1);
      likecommit.appendChild(spanP1);
      likecommit.appendChild(span2);
      likecommit.appendChild(spanP2);

      // ------------------------------
      span1.innerText = post.has_liked ? "❤" : "❤";
      span1.style.color = post.has_liked ? "red" : "white";
      // -------------------------------

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
      spanP1.className = "spanP1";
      spanP2.className = "spanP2";

      commitp.textContent = post.text || "No description available";
      p1.textContent = post.username;
      span2.innerHTML = `🗨`; 
      spanP1.textContent = post.likes;
      spanP2.textContent = post.comments;

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
            .catch((error) => {
              console.log("unfollowda xato :", error);
            });
        }
      });

      span1.addEventListener("click", () => {
        if (post.has_liked) {
          post.has_liked = false;
          span1.style.color = "white";
        } else {
          post.has_liked = true;
          span1.style.color = "red";
        }

        console.log("Yuborilayotgan ma'lumotlar:", {
          post_id: post.id,
          hasLiked: post.has_liked,
        });
        location.reload();
        axiosInstance
          .post(
            "/posts/like",
            { post_id: post.id, hasLiked: post.has_liked },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            if (response.data.success) {
              post.likes = response.data.likes;
              span1.innerText = `❤ ${post.likes}`;
              spanP1.innerText = `❤ ${response.data.likes}`;
              console.log(response.data.likes);
            }
          })
          .catch((error) => {
            console.log("Xato yuz berdi:", error);
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

  // return { commitImg, span2 };
}

// let com = 0;
// window.addEventListener("incrementCom", (event) => {
//   com += 1;
//   console.log(com);
// });
// const { commitImg, span2 } = createPostElement();
// span2.textContent = `🗨 ${com}`;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  createPostElement();
});
