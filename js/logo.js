import "../css/logo.css";

const logodiv=document.querySelector('.logodiv')
const form=document.querySelector('.form')

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const ldiv=document.createElement('div')
    logodiv.appendChild(ldiv)
    
    const topdiv=document.createElement('div')
    ldiv.appendChild(topdiv)
    
    const img=document.createElement('img')  
    const p1=document.createElement('p')
    const p2=document.createElement('button')
    topdiv.appendChild(img)
    topdiv.appendChild(p1)
    topdiv.appendChild(p2)
    
    p2.type='button'
    ldiv.className="ldiv"
    topdiv.className="topdiv"
    img.className="lrimg"
    p1.className="p1"
    p2.className="p2"
    
    p2.textContent="Follow"

    const username = localStorage.getItem("username");
    const profileNameElement = document.querySelector(".p1");

    if (profileNameElement && username) {
        profileNameElement.textContent = `${username}`;
      } else {
        console.error("Foydalanuvchi aniqlanmadi yoki element topilmadi.");
      }
      p2.addEventListener('click',()=>{
         if (p2.textContent==="Follow") {
        p2.textContent="Unfollow"

    }else{
        p2.textContent="Follow"
    }
      })
      
   
})
