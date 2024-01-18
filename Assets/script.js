const themeBtn =document.querySelector("#theme-changer i");
const body=document.querySelector("body");
const nav=document.querySelector("#nav-wrapper");
const navIconBars=document.querySelector(".fa-bars");
const navIconCross=document.querySelector("#cross");

//default theme
body.classList.add("dark-theme");
themeBtn.addEventListener("click",(e)=>{

    if(e.target.classList.contains("fa-sun")){
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
    }
    else{
        body.classList.add("dark-theme");
        body.classList.remove("light-theme");
    }
    e.target.classList.toggle("fa-moon");
    e.target.classList.toggle("fa-sun");

});


navIconBars.addEventListener("click",()=>{
    console.log("show nav");
    nav.classList.toggle("shownav")
});

navIconCross.addEventListener("click",()=>{
    console.log("close nav");
    nav.classList.toggle("shownav")
});



