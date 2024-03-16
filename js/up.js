const goTop = document.querySelector(".up");

window.addEventListener("scroll", chekHeight);

function chekHeight() {
  if (window.scrollY > 150) {
    goTop.style.display = "flex";
  } else {
    goTop.style.display = "none";
  }
}

goTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
