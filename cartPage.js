const cartToggler = document.querySelector(".cart-icon");
/**
 * This function is triggered when a cart icon i clicked
 * it subscribes from localstorage and parese tha data to render in the DOM
 */
function viewCart() {
  const cartItems = localStorage.getItem("cartitems");
  console.log(JSON.parse(cartItems));
}

// events on cartToggler
cartToggler.onclick = viewCart;
