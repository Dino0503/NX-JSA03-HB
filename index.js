const prod = document.getElementById("product");
const searchElement = document.getElementById("search");
const login = document.getElementById("login");
const logout = document.getElementById("logout");
const welcome = document.getElementById("welcome");
const user = JSON.parse(localStorage.getItem("user")) || [];
const url = "https://6640b327a7500fcf1a9e76ff.mockapi.io/products";
let cart = JSON.parse(localStorage.getItem("CART")) || [];

checkUser();
function checkUser() {
  if (user) {
    welcome.innerHTML = `Welcome ${user[0].userName}`;
    login.classList.add("hide");
    logout.classList.remove("hide");
  } else {
    login.classList.remove("hide");
    logout.classList.add("hide");
  }
}

getDataProducts();
async function getDataProducts() {
  const response = await fetch(url);
  if (response.ok) {
    try {
      const data = await response.json();
      renderProducts(data);
    } catch (error) {
      console.error(error);
    }
  }
}

function renderProducts(product) {
  product.forEach((item) => {
    prod.innerHTML += `
  <div class="col-md-3 cards">
        <div class="card mt-5" style="width: 18rem">
        <img src="${item.Image}" class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title product-name">${item.productName}</h5>
            <p class="card-text">${item.Price}</p>

        <button class="btn btn-primary" onclick="addToCart(${item.id})" type="submit">Add To Cart</button>
        <button class="btn btn-dark">Dark Mode</button>
        </div>
        </div>
    </div>
    `;
  });
}

searchElement.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchInput = document.getElementById("search-input").value.toUpperCase();
  let cards = document.querySelectorAll(".cards");
  let productName = document.querySelectorAll(".product-name");

  productName.forEach((items, index) => {
    if (items.innerText.includes(searchInput)) {
      cards[index].classList.remove("hide");
    } else {
      cards[index].classList.add("hide");
    }
  });
});

function logOut() {
  localStorage.removeItem("user");
  window.location.reload();
}

async function addToCart(id) {
  const response = await fetch(url);
  if (response.ok) {
    try {
      const data = await response.json();
      data.forEach((item) => {
        if (item.id == id) {
          if (cart.some((item) => item.id == id)) {
            alert("Product already in cart");
          } else {
            cart.push(item);
            localStorage.setItem("CART", JSON.stringify(cart));
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
