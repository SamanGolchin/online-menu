const category = document.querySelectorAll(".category-container a");
const Item = document.querySelectorAll(".listProduct .item");

category.forEach((a) => {
  a.onclick = function () {
    //active
    category.forEach((a) => {
      a.className = "";
    });
    a.className = "active";
    console.log("hello world");
    //Filter
    const value = a.id;
    Item.forEach((div) => {
      div.style.display = "none";
      if (div.getAttribute("data-filter") == value.toLowerCase() || value) {
        div.style.display = "flex";
      }
    });
  };
});
