
let lastScroll = 0;

window.addEventListener("scroll", function () {
  const currentScroll = window.scrollY;

  if (currentScroll > 100 && currentScroll > lastScroll) {
    mainNav.classList.add("hide");
    scrollNavButton.classList.add("show");
  }

  if (currentScroll < 50) {
    mainNav.classList.remove("hide");
    scrollNavButton.classList.remove("show");
  }

  lastScroll = currentScroll;
});