document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Product 1", price: 29.991 },
    { id: 2, name: "Product 2", price: 99.993 },
    { id: 3, name: "Product 3", price: 49.99 },
  ];

  const cart = JSON.parse(localStorage.getItem("P")) || [];
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotalMessage = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span>${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id="${product.id}">Add To Cart</button>
    `;
    productList.appendChild(productDiv);
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const pro = products.find((p) => p.id === productId);
      addToCart(pro);
    }
  });

  function addToCart(P) {
    cart.push(P);
    renderCart();
  }
  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");
      cart.forEach((item) => {
        totalPrice += item.price;
        const cartItm = document.createElement("div");
        cartItm.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)}
            <button class="rmvBtn" data-id ="${item.id}">Remove</button>  
            `;
        cartItems.appendChild(cartItm);
      });
      totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
    }
    localStorage.setItem("P", JSON.stringify(cart));
  }

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const prdctId = parseInt(e.target.getAttribute("data-id"));
      const Index = cart.findIndex((R) => R.id === prdctId);
      cart.splice(Index, 1);
      renderCart();
    }
  });

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Checkout Success");
    renderCart();
  });
  renderCart();
});
