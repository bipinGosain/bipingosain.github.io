let menu = document.querySelector('.menu');
let mobileNav = document.querySelector('.nav-burger');
let  backButton = document.querySelector('#back-btn');

let anchors = document.querySelectorAll('.nav-burger__list__item__a');
for(let a of anchors){
    a.addEventListener('click', ()=>{
        mobileNav.classList.remove("show");
    });
}


menu.addEventListener('click', ()=>{
    mobileNav.classList.add("show");
});

backButton.addEventListener('click', ()=>{
    mobileNav.classList.remove("show");
});