const prod = document.getElementById("product");
const searchElement = document.getElementById("search");
const login = document.getElementById("login");
const logout = document.getElementById("logout");
const welcome = document.getElementById("welcome");
const user = JSON.parse(localStorage.getItem("user"));

checkUser();
getDataCart();
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

function getDataCart() {
  if (user) {
    let cart = JSON.parse(localStorage.getItem("CART")) || [];
    cart.forEach((item) => {
      prod.innerHTML += `
        <div class="col-md-3 cards">
        <div class="card mt-5" style="width: 18rem">
        <img src="${item.img}" class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title product-name">${item.productName}</h5>
            <p class="card-text">${item.price}</p>
            <div class="quantity-controls">
                <button class="btn btn-secondary btn-sm decrement">-</button>
                <span class="quantity">0</span>
                <button class="btn btn-secondary btn-sm increment">+</button>
            </div>
        </div>
        </div>
    </div>
        `;
    });
  }
}

function logOut() {
  localStorage.removeItem("user");
  localStorage.removeItem("CART");
  window.location.reload();
}
