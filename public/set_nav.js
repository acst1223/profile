let dropdowns = document.querySelectorAll("header nav ul li ul.dropdown");
let navLis = document.querySelectorAll("header nav ul li");

setTimeout(() => {
  dropdowns.forEach((dropdown) => {
    dropdown.style.transition = "all 0.3s ease";
  });
}, 0);

navLis.forEach((navLi) => {
  navLi.addEventListener("click", (e) => {
    navLi.classList.toggle("clicked");
  });
});
