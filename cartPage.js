document.addEventListener("DOMContentLoaded", function () {
  function readingDataFromLocalStorage() {
    const items_to_be_rendered_on_cart_page =
      JSON.parse(localStorage.getItem("cartitems")) || [];
    const items = Object.values(items_to_be_rendered_on_cart_page);
    return items;
  }

  const cartPAGE = document.querySelector(".shopping-cart");

  function renderCartItems() {
    let cartItemsToBeRendered = readingDataFromLocalStorage();
    cartItemsToBeRendered.forEach((item) => {
      console.log("Current Item", item);
      const { pri, img, name } = item;
      cartPAGE.innerHTML += /*html*/ `
    
        <div class="product">
          <div class="product-image">
            <img src="${img}">
          </div>
          <div class="product-details">
            <div class="product-title">${name}</div>
            <p class="product-description"></p>
          </div>
          <div class="product-price">${pri}</div>
          <div class="product-quantity">
            <input type="number" value="2" min="1">
          </div>
          <div class="product-removal">
            <button class="remove-product">
              Remove
            </button>
          </div>
          <div class="product-line-price"></div>
        </div>
      `;
    });
    const renderItemsfromCart = document.querySelector(".shop-cart-items");
    renderItemsfromCart.append(cartPAGE);
  }

  const viewCart = document.querySelector(".cart-icon");
  viewCart.addEventListener("click", () => {
    cartPAGE.classList.add("active");
    renderCartItems();
  });
});
