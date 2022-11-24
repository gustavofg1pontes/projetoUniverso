const cursor = document.querySelector(".cursor")


/* document.addEventListener('mousemove', (e) => {
    cursor.style.top = `${e.clientY}px`
    cursor.style.left = `${e.clientX}px`
    console.log(window.innerHeight)
    cursor.style.transform = `translate(-50%, -50%)`
}) */

let infos = document.querySelectorAll('.info')

document.addEventListener('scroll', (e) => {
    let offSetY = document.body.getBoundingClientRect().top;
    for (let i = 0; i < infos.length; i++) {
        let info = infos[i]
        if (-offSetY >= info.offsetTop - (window.innerHeight / 2)) {
            info.style.opacity = 1
            info.style.animation = 'sobe 1s'
        }
    }
})