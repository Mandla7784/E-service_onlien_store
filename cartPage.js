document.addEventListener("DOMContentLoaded", function () {
  function readingDataFromLocalStorage() {
    const itemsToBeRenderedOnCartPage =
      JSON.parse(localStorage.getItem("cartitems")) || [];
    return Object.values(itemsToBeRenderedOnCartPage);
  }

  const cartPAGE = document.querySelector(".shopping-cart");
  const renderItemsFromCart = document.querySelector(".shop-cart-items");

  function renderCartItems() {
    const cartItemsToBeRendered = readingDataFromLocalStorage();
    renderItemsFromCart.innerHTML = ""; // Clearing previous items

    let grandTotal = 0;
    document.addEventListener("DOMContentLoaded", () => {
      const quantity = document.getElementById("quan").value;
      cartItemsToBeRendered.forEach((item) => {
        const { pri, img, name } = item;
        let itemPrice = pri.split("$")[1];

        const newPrice = Number(itemPrice);
        const totalPrice = newPrice * quantity;
        console.log(totalPrice);

        grandTotal += totalPrice; // Adding to grand total
        console.log(grandTotal, "This is price");

        renderItemsFromCart.innerHTML += /*html*/ `
        <div class="product">
          <div class="product-image">
            <img class="item-image" src="${img}" alt="${name}">
          </div>
          <div class="product-details">
            <div class="product-title">${name}</div>
            <p class="product-description"></p>
          </div>
          <div class="product-price">${newPrice}</div>
          <div class="product-quantity">
            <input id="quan" placeholder="quantity..." type="number" value="${quantity}" min="1">
          </div>
          <div class="product-removal">
            <button class="remove-product" data-name="${name}">
              Remove
            </button>
          </div>
          <div class="product-line-price">${totalPrice}</div>
        </div>
      `;
      });
    });

    // Updating grand total in the totals section
    updateGrandTotal(grandTotal);
  }

  function updateGrandTotal(grandTotal) {
    const cartTotalElement = document.getElementById("cart-total");
    cartTotalElement.textContent = grandTotal.toFixed(2);
  }

  function removeProduct(name) {
    let cartItems = readingDataFromLocalStorage();
    cartItems = cartItems.filter((item) => item.name !== name); // Removing item by name
    localStorage.setItem("cartitems", JSON.stringify(cartItems)); // Updating local storage
    renderCartItems(); // Re-render cart items
  }

  renderItemsFromCart.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-product")) {
      const productName = event.target.dataset.name;
      removeProduct(productName);
    }
  });

  const viewCart = document.querySelector(".cart-icon");
  viewCart.addEventListener("click", () => {
    cartPAGE.classList.add("active");
    cartPAGE.classList.remove("page");

    renderCartItems();
  });
});
