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
          
          const followed=document.createElement("a")
          userElement.appendChild(followed)
          followed.className="followed"
          followed.textContent="Follow"
          followed.href="#"
          followed.innerText=result.has_followed? "Unfollow":"Follow";
          
          followed.addEventListener("click" , (e)=>{
            e.preventDefault()
            if (followed.innerText="Follow"){
              axiosInstance.post('/followings/follow',{username:result.username}).then((respons)=>{
                if (respons.status===200) {
                  followed.innerText="Unfollow"
                  followed.classList.add="Follow"
                }
              }).catch((error)=>{
                console.log("followda xato :",error);
              })
            }else if(followed.innerText="Unfollow"){
              axiosInstance.post('/followings/unfollow', {username:result.username}).then((res)=>{
                if(res.status===200){
                  followed.innerText="Follow"
                  followed.classList.add="Unfollow"
                }
              }).catch((err)=>{
                console.log(err);
              })
            }
          })

          resultsContainer.appendChild(userElement);
        });
      })
      .catch((error) => console.error("Search error:", error));
  } else {
    console.log("Username is empty.");
  }
});
