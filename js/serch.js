import { axiosInstance } from "./request";

const form = document.getElementById("form");
const search = document.getElementById("search");
const resultsContainer = document.getElementById("results-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = search.value.trim();
  if (username) {
    axiosInstance
      .get("/search", { params: { username } })
      .then((res) => {
        resultsContainer.innerHTML = "";
        res.data.forEach((result) => {
          const userElement = document.createElement("div");
          userElement.classList.add("user");

          const userImage = document.createElement("img");
          userImage.src = result.user_img || "./user-solid.svg";
          userImage.alt = result.username;
          userImage.className = "userImage";
          userElement.appendChild(userImage);

          const userName = document.createElement("a");
          userName.href = `/user.html?username=${result.username}`;
          userName.textContent = result.username;
          userName.className = "userName";
          userElement.appendChild(userName);

          resultsContainer.appendChild(userElement);
        });
      })
      .catch((error) => console.error("Search error:", error));
  } else {
    console.log("Username is empty.");
  }
});
