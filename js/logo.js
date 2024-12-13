import "../css/logo.css";

const logodiv = document.querySelector(".logodiv");
const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

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
  ldiv.appendChild(commit);
  commit.appendChild(commitp);

  const likecommit = document.createElement("div");
  const span1 = document.createElement("button");
  const span2 = document.createElement("button");
  ldiv.appendChild(likecommit);
  likecommit.appendChild(span1);
  likecommit.appendChild(span2);

  span1.type = "button";  // type="button" bo'lishi kerak
  span2.type = "button";  // type="button" bo'lishi kerak
  p2.type = "button";  // type="button" bo'lishi kerak
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

  p2.textContent = "Follow";
  commitp.textContent = "aaaaaaaaa";
  span1.textContent = `❤ ${0}`;
  span2.textContent = `🗨 ${0}`;

  const username = localStorage.getItem("username");
  const profileNameElement = document.querySelector(".p1");

  if (profileNameElement && username) {
    profileNameElement.textContent = `${username}`;
  } else {
    console.error("Foydalanuvchi aniqlanmadi yoki element topilmadi.");
  }

  p2.addEventListener("click", () => {
    if (p2.textContent === "Follow") {
      p2.textContent = "Unfollow";
    } else {
      p2.textContent = "Follow";
    }
  });

  let liked = 0;
  span1.addEventListener("click", () => { 
    if (span1.textContent === `❤ ${0}`) {
      liked += 1;
      span1.style.color = "red";  
    }else{
        liked -=1
        span1.style.color='#fff'
    }
    span1.textContent = `❤ ${liked}`;
  });

  let com = 0;
  span2.addEventListener("click", () => { 
    location.href = "./commit.html"; 
    
  });
});
