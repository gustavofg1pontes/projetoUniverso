const saturn = document.querySelector(".saturn")
let saturnpos = -150
let infos = document.querySelectorAll('.info')
var lastScrollTop = 0;


document.addEventListener('scroll', (e) => {
    let offSetY = document.body.getBoundingClientRect().top;
    for (let i = 0; i < infos.length; i++) {
        let info = infos[i]
        if (-offSetY >= info.offsetTop - (window.innerHeight / 1.5)) {
            info.style.opacity = 1
            info.style.animation = 'sobe 1s'
        }
    }



    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
        if (saturnpos < -90) saturnpos++
        saturn.style.left = `${saturnpos}vw`
    } else {
        if (saturnpos >= -150) saturnpos--
        saturn.style.left = `${saturnpos}vw`
    }
    lastScrollTop = st <= 0 ? 0 : st;
})