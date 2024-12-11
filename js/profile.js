const fileInput = document.getElementById('fileInput');
const displayImg = document.getElementById('displayimg');

fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            displayImg.src = e.target.result;
            displayImg.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        displayImg.style.display = 'none';
        displayImg.src = '';
    }
});

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

  const img=document.createElement('img')
  btndivtop.appendChild(img)
  img.src='https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png'
  img.width=70
  img.height=70

  const h1div=document.createElement('div')
  btndivtop.appendChild(h1div)
  
  const h1 = document.createElement("h1");
  h1div.appendChild(h1);
  const p1=document.createElement('p')
  h1div.appendChild(p1)
  
  const p2div=document.createElement('div')
  btndivtop.appendChild(p2div)

  const p2=document.createElement('p')
  p2div.appendChild(p2)
  
  const p3=document.createElement('p')
  p2div.appendChild(p3)

  const btn1 = document.createElement("button");
  btndivtop.appendChild(btn1);

  const span1 = document.createElement("span");
  btndivbtn.appendChild(span1);

  const span2 = document.createElement("span");
  btndivbtn.appendChild(span2);

  btndiv.className = "btndiv";
  btndivtop.className = "btndivtop";
  btndivbtn.className = "btndivbtn";
  h1div.className="h1div"
  p2div.className="p2div"
  h1.className = "h1";
  p1.className="p1"
  p2.className="p2"
  p3.className="p3"
  btn1.className = "btn1";
  span1.className = "span1";
  span2.className = "span2";

  btn1.type = "button";
  span1.textContent = `Followers ${0}`;
  span2.textContent = `Following ${0}`;
  btn1.textContent = "Follow";

  const username = localStorage.getItem("username");
  const profileNameElement = document.querySelector(".h1");
  
  const email=localStorage.getItem('email')
  const email1=document.querySelector('.p1')
  
  const first=localStorage.getItem('first')
  const first1=document.querySelector('.p2')

  const last=localStorage.getItem('last')
  const last1=document.querySelector('.p3')

  if (profileNameElement && username) {
    profileNameElement.textContent = `${username}`;
  } else {
    console.error("Foydalanuvchi aniqlanmadi yoki element topilmadi.");
  }
  if (email1 && email) {
    email1.textContent = `${email}`;
  } else {
    console.error("Foydalanuvchi aniqlanmadi yoki element topilmadi.");
  }
  if (first1 && first) {
    first1.textContent = `${first}`;
  } else {
    console.error("Foydalanuvchi aniqlanmadi yoki element topilmadi.");
  }
  if (last1 && last) {
    last1.textContent = `${last}`;
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
