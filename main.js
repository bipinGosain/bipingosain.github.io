window.onload = ()=>{
    listenToCSSEvents();
}


function listenToCSSEvents(){

    //TECH EVENTS
    document.querySelectorAll('.tech-img').forEach(
        x=> x.addEventListener('mouseover', (eve)=>{
            eve.target.classList.add('jello-horizontal');
        })
    )

    document.querySelectorAll('.tech-img').forEach(
        x=> x.addEventListener('mouseleave', (eve)=>{
            eve.target.classList.remove('jello-horizontal');
        })
    )
    
    
    //PORTFOLIO EVENTS

    document.querySelectorAll('.project-img').forEach(
        x=> x.addEventListener('mouseover', (eve)=>{
            eve.target.classList.add('jello-horizontal');
        })
    )

    document.querySelectorAll('.project-img').forEach(
        x=> x.addEventListener('mouseleave', (eve)=>{
            eve.target.classList.remove('jello-horizontal');
        })
    )
}