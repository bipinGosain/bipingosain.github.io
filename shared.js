let menu = document.querySelector('.menu');
let mobileNav = document.querySelector('.nav-burger');
let backdrop = document.querySelector('.backdrop');

let anchors = document.querySelectorAll('.nav-burger__list__item__a');
for(let a of anchors){
    a.addEventListener('click', ()=>{
        mobileNav.classList.remove("show");
        backdrop.classList.remove('show');
    });
}


menu.addEventListener('click', ()=>{
    mobileNav.classList.add("show");
    mobileNav.classList.add("slide-right");
    backdrop.classList.add('show')
});

backdrop.addEventListener('click' ,()=>{
    mobileNav.classList.remove("show");
    backdrop.classList.remove('show')
})