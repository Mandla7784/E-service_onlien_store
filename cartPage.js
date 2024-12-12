const cartToggler = document.querySelector(".cart-icon");
const shopcartitems = document.querySelector(".shop-cart-items");
/**
 * This function is triggered when a cart icon i clicked
 * it subscribes from localstorage and parese tha data to render in the DOM
 */
function viewCart() {
  const cartItems = localStorage.getItem("cartitems");

  const jsonCartitems = JSON.parse(cartItems); // parsing to JASON

  jsonCartitems.forEach((item) => {
    const { pri, name, img } = item;

    const price = Number(pri.slice(1, 5));

    shopcartitems.innerHTML = /*html*/ `
        <div>
        <p>${name}</p>
        <p>R${price}</p>
       <img  style="inline-size: 100px;block-size: 100px;" src= ${img}  />
        </div>
     
     
     `;
  });

  // creating dom elemsts to render
}

// events on cartToggler
cartToggler.onclick = viewCart;
