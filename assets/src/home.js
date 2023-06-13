let informacoes = document.querySelectorAll(".info");

const options = {
  threshold: 1,
};

let iObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
    } else entry.target.style.opacity = 0;
  });
}, options);

informacoes.forEach((e) => {
  iObserver.observe(e);
});


let planet = document.querySelector(".saturn");

let pObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.marginLeft = "2vw";
    } else{
      entry.target.style.opacity = 0;
      entry.target.style.marginLeft = "-20vw";
    } 
  });
}, options);

pObserver.observe(planet);
