let listProductHTML = document.querySelector(".listProduct");
let listCartHTML = document.querySelector(".listCart");
let iconCart = document.querySelector(".icon-cart");
let iconCartSpan = document.querySelector(".icon-cart span");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let modal = document.querySelector(".modal");
let openModal = document.querySelector(".open-modal");
let closeModal = document.querySelector(".close-modal");
let products = [];
let cart = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const addDataToHTML = () => {
  // remove datas default from HTML

  // add new datas
  if (products.length > 0) {
    // if has data
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.dataset.id = product.id;
      newProduct.classList.add("item");
      newProduct.setAttribute("data-filter", product.category);
      newProduct.innerHTML = `
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="">
                <p class="description">${product.description}</p>
                <div class="price">قیمت:تومان${product.price}</div>
                <button class="addCart">خرید</button>
                <button class="open-modal">بیشتر</button>`;
      listProductHTML.appendChild(newProduct);
    });
  }
};

const modalAddDataToHTML = () => {
  // remove datas default from HTML

  // add new datas
  if (products.length > 0) {
    // if has data
    products.forEach((product) => {
      let newModal = document.createElement("dialog");
      newModal.dataset.id = product.id;
      newModal.classList.add("modal");
      newModal.setAttribute("close", "");
      newModal.innerHTML = `
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="">
                <p class="description">${product.description}</p>
                <div class="price">قیمت:تومان${product.price}</div>
                <button class="close-modal">بستن</button>`;
      listProductHTML.appendChild(newModal);
    });
  }
};
const displayModal = (product) => {
  let modal = document.querySelector(".modal");
  modal.innerHTML = `
    <img src="${product.image}" alt="">
    <h2>${product.name}</h2>
    <p class="description">${product.description}</p>
    <div class="price">قیمت:تومان${product.price}</div>
    <button class="close-modal">⨉</button>
    <button class="addCart">خرید</button>
  `;
  modal.style.display = "flex";
};
const initApp = () => {
  // get data product
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      addDataToHTML();
      modalAddDataToHTML();

      // get data cart from memory
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("open-modal")) {
    let productId = event.target.parentElement.dataset.id;
    let product = products.find((item) => item.id == productId);
    displayModal(product);
  }
});

document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("close-modal")) {
    let modal = document.querySelector(".modal");
    modal.style.display = "none";
  }
});

listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addCart")) {
    let id_product = positionClick.parentElement.dataset.id;
    addToCart(id_product);
  }
});
const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity =
      cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.dataset.id = item.product_id;

      let positionProduct = products.findIndex(
        (value) => value.id == item.product_id
      );
      let info = products[positionProduct];
      listCartHTML.appendChild(newItem);
      newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
    });
  }
  iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantityCart(product_id, type);
  }
});
const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    let info = cart[positionItemInCart];
    switch (type) {
      case "plus":
        cart[positionItemInCart].quantity =
          cart[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = cart[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
};

initApp();

const category = document.querySelectorAll(".category-container a");
const Item = document.querySelectorAll(".listProduct");

function newFunction() {
  return "click";
}
category.forEach((a) => {
  a.onclick = function () {
    //active
    category.forEach((a) => {
      a.className = "";
    });
    a.className = "active";
    //Filter
    // console.log("hello world");

    const value = a.id;
    // console.log(value);
    // console.log(Item);

    Item.forEach((div) => {
      div.forEach((d) => {
        d.style.display = "none";
        if (d.getAttribute("data-filter") == value.toLowerCase()) {
          d.style.display = "flex";
        }
        console.log(d);
      });
    });
  };
});
