const cartToggler = document.querySelector(".cart-icon");
const shopcartitems = document.querySelector(".shop-cart-items");
/**
 * This function is triggered when a cart icon i clicked
 * it subscribes from localstorage and parese tha data to render in the DOM
 */
function viewCart() {
  const cartItems = localStorage.getItem("cartitems");

  const jsonCartitems = JSON.parse(cartItems); // parsing to JASON
  shopcartitems.append(jsonCartitems);
}

// events on cartToggler
cartToggler.onclick = viewCart;
