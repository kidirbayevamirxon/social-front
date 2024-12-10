import "../css/logo.css";

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

  const h1 = document.createElement("h1");
  btndivtop.appendChild(h1);

  const btn1 = document.createElement("button");
  btndivtop.appendChild(btn1);

  const span1 = document.createElement("span");
  btndivbtn.appendChild(span1);

  const span2 = document.createElement("span");
  btndivbtn.appendChild(span2);

  btndiv.className = "btndiv";
  btndivtop.className = "btndivtop";
  btndivbtn.className = "btndivbtn";
  h1.className = "h1";
  btn1.className = "btn1";
  span1.className = "span1";
  span2.className = "span2";

  btn1.type = "button";
  span1.textContent = `Followers ${0}`;
  span2.textContent = `Following ${0}`;
  btn1.textContent = "Follow";

  const username = localStorage.getItem("username");
  const profileNameElement = document.querySelector(".h1");

  if (profileNameElement && username) {
    profileNameElement.textContent = `${username}`;
  } else {
    console.error("Foydalanuvchi aniqlanmadi yoki element topilmadi.");
  }

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
});
