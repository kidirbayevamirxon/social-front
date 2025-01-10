// import "/css/comment.css";

const commitccc = document.querySelector(".commitccc");
const compro = document.createElement("div");
commitccc.appendChild(compro);

let com = 1;
const div = document.createElement("div");
const p1 = document.createElement("p");
compro.appendChild(div);
compro.appendChild(p1);

const p2 = document.createElement("p");
commitccc.appendChild(p2);
p2.textContent = "aaaaaaa";
const likecommit = document.createElement("div");
commitccc.appendChild(likecommit);
const span1 = document.createElement("button");
const span2 = document.createElement("button");
likecommit.appendChild(span1);
likecommit.appendChild(span2);
span1.textContent = `❤ ${0}`;
span2.textContent = `🗨 ${com}`;

const inputdiv = document.createElement("div");
commitccc.appendChild(inputdiv);
const input = document.createElement("input");
const submit = document.createElement("button");
inputdiv.appendChild(input);
inputdiv.appendChild(submit);

const committext = document.createElement("div");
commitccc.appendChild(committext);
const committexttop = document.createElement("div");
committext.appendChild(committexttop);
const committexttopleft = document.createElement("div");
committexttop.appendChild(committexttopleft);
const topleftimg = document.createElement("div");
committexttopleft.appendChild(topleftimg);
const topleftuser = document.createElement("p");
committexttopleft.appendChild(topleftuser);
const ahlat = document.createElement("button");
committexttop.appendChild(ahlat);
const comdiv = document.createElement("div");
const commentarya = document.createElement("p");
committext.appendChild(comdiv);
comdiv.appendChild(commentarya);
commentarya.textContent = "aaaaaa";
const commentBtn = document.createElement("p");
committext.appendChild(commentBtn);

commentarya.textContent = input.value;

ahlat.type = "submit";
input.placeholder = "comment";
submit.textContent = "Submit";
submit.type = "submit";
span1.type = "button";
span2.type = "button";
// Elementlarga class berish
compro.className = "compro";
div.className = "div";
p1.className = "p1";
p2.className = "p2";
span1.className = "span1";
span2.className = "span2";
likecommit.className = "likecommit";
inputdiv.className = "inputdiv";
input.className = "input";
submit.className = "submit";
committext.className = "committext";
committexttop.className = "committexttop";
committexttopleft.className = "committexttopleft";
topleftimg.className = "topleftimgg";
topleftuser.className = "topleftuser";
ahlat.className = "ahlat";
commentarya.className = "commentarya";
commentBtn.className = "commentBtn";
comdiv.className = "comdiv";
const username = localStorage.getItem("username");

if (username) {
  p1.textContent = `${username}`;
} else {
  console.error("Foydalanuvchi aniqlanmadi.");
}

if (username) {
  topleftuser.textContent = `${username}`;
} else {
  console.error("Foydalanuvchi aniqlanmadi.");
}

let liked = 0;
span1.addEventListener("click", () => {
  if (span1.textContent === `❤ ${0}`) {
    liked += 1;
    span1.style.color = "red";
  } else {
    liked -= 1;
    span1.style.color = "#000";
  }
  span1.textContent = `❤ ${liked}`;
});

span2.addEventListener("click", () => {
  location.href = "./commit.html";
});

// submit.addEventListener("click", () => {

//   const commentText = input.value
//   if (commentText) {
//     commentarya.textContent = commentText;
//     input.value = "";
//     committext.style.display="block"
//   } else {
//     alert("Iltimos, sharh matnini kiriting.");
//   }
// });

submit.addEventListener("click", () => {
  const commentText = input.value.trim();
  if (commentText) {
    let vaqt = new Date();
    let vaqtt = `${vaqt.getDate()}/${vaqt.getMonth()}/${vaqt.getFullYear()}, ${vaqt.getHours()}:${vaqt.getMinutes()}:${vaqt.getSeconds()}`;

    const newComment = document.createElement("div");
    newComment.className = "newComment";
    newComment.innerHTML = `
      <div class="committext">
        <div class="committexttop">
          <div class="committexttopleft">
            <div class="topleftimgg"></div>
            <p class="topleftuser">${username || "Anonim"}</p>
          </div>
          <button class="ahlat"></button>
        </div>
        <div class="comdiv">
        <p class="commentarya">${commentText}</p>
        <br>
        <p class="commentBtn">${vaqtt}</p>
        </div>
        
      </div>
    `;
    commitccc.appendChild(newComment);

    const event = new CustomEvent("incrementCom", {
      detail: { comment: commentText },
    });
    window.dispatchEvent(event);

    input.value = "";
  } else {
    alert("Iltimos, sharh matnini kiriting.");
  }

  com += 1;
  span2.textContent = `🗨 ${com}`;
});

commitccc.addEventListener("click", (e) => {
  if (e.target && e.target.classList.contains("ahlat")) {
    const commentDiv = e.target.closest(".committext");
    if (commentDiv) {
      commentDiv.style.display = "none";
    }
    com -= 1;
  }
});
