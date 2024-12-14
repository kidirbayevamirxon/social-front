import "../css/comment.css";

const commitccc = document.querySelector(".commitccc");
const compro = document.createElement("div");
commitccc.appendChild(compro);

const div = document.createElement("div");
const p1 = document.createElement("p");
compro.appendChild(div);
compro.appendChild(p1);

const p2 = document.createElement("p");
commitccc.appendChild(p2);
const likecommit=document.createElement("div")
commitccc.appendChild(likecommit)
const span1 = document.createElement("button");
const span2 = document.createElement("button");
likecommit.appendChild(span1)
likecommit.appendChild(span2)
span1.textContent = `❤ ${0}`;
span2.textContent = `🗨 ${0}`;

const inputdiv=document.createElement('div')
commitccc.appendChild(inputdiv)
const input=document.createElement('input')
const submit=document.createElement('button')
inputdiv.appendChild(input)
inputdiv.appendChild(submit)

const committext=document.createElement('div')
commitccc.appendChild(committext)
const committexttop=document.createElement('div')
committext.appendChild(committexttop)
const committexttopleft=document.createElement('div')
committexttop.appendChild(committexttopleft)
const topleftimg=document.createElement('div')
committexttopleft.appendChild(topleftimg)
const topleftuser=document.createElement('p')
committexttopleft.appendChild(topleftuser)
const ahlat=document.createElement('button')
committexttop.appendChild(ahlat)
const commentarya=document.createElement('p')
committext.appendChild(commentarya)
const commentBtn=document.createElement('p')
committext.appendChild(commentBtn)


commentarya.textContent=input.value



ahlat.type="submit"
input.placeholder="comment"
submit.textContent='Submit'
submit.type="submit"
span1.type = "button"; 
span2.type = "button";
// Elementlarga class berish
compro.className = "compro";
div.className = "div";
p1.className = "p1";
p2.className = "p2";
span1.className = "span1";
span2.className = "span2";
likecommit.className='likecommit'
inputdiv.className="inputdiv"
input.className="input"
submit.className="submit"
committext.className="committext"
committexttop.className="committexttop"
committexttopleft.className="committexttopleft"
topleftimg.className="topleftimgg"
topleftuser.className="topleftuser"
ahlat.className="ahlat"
commentarya.className="commentarya"
commentBtn.className="commentBtn"

// Foydalanuvchi ismini olish va p1 elementiga qo'shish
const username = localStorage.getItem("username");

if (username) {
  p1.textContent = `${username}`; // Foydalanuvchi ismini `p1`ga joylash
} else {
  console.error("Foydalanuvchi aniqlanmadi.");
}

if (username) {
  topleftuser.textContent = `${username}`; // Foydalanuvchi ismini `p1`ga joylash
} else {
  console.error("Foydalanuvchi aniqlanmadi.");
}

p2.textContent = "aaaaaaa";

let liked = 0;
span1.addEventListener("click", () => { 
  if (span1.textContent === `❤ ${0}`) {
    liked += 1;
    span1.style.color = "red";  
  }else{
      liked -=1
      span1.style.color='#000'
  }
  span1.textContent = `❤ ${liked}`;

});

  let com = 0;
  span2.addEventListener("click", () => { 
    location.href = "./commit.html"; 
    
  });

  ahlat.addEventListener('click',(a)=>{
    a.preventDefault()
    committext.style.display="none"
  })
  submit.addEventListener("click", () => {
    
    const commentText = input.value
    if (commentText) {
      commentarya.textContent = commentText;
      input.value = ""; 
      committext.style.display="block"
    } else {
      alert("Iltimos, sharh matnini kiriting."); 
    }
  });
  

