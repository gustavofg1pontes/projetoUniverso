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
