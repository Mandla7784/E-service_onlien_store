const cartToggler = document.querySelector(".cart-icon");
const shopcartitems = document.querySelector(".shop-cart-items");
/**
 * This function is triggered when a cart icon i clicked
 * it subscribes from localstorage and parese tha data to render in the DOM
 */
function viewCart() {
  const cartItems = localStorage.getItem("cartitems");
  const totalTag = document.createElement("h2"); //grand toatl tag

  const jsonCartitems = JSON.parse(cartItems); // parsing to JASON

  shopcartitems.append(totalTag);
  jsonCartitems.forEach((item) => {
    const { pri, name, img } = item;
    let totalPrice = 0;

    const price = Number(pri.slice(1, 5));
    totalPrice += price;
    console.log(totalPrice, "This is total price");

    shopcartitems.innerHTML += /*html*/ `
        <div class="cart-card">
        <h4>${name}</h4>
        <p>R${price.toFixed(2)}</p>
       <img  style="inline-size: 100px;block-size: 100px;" src= ${img}  />
      <button class="deletebutton" style="background-color: rgb(212, 42, 42);color: white;">delete</button>
        </div>
     
     
     `;
  });
  totalTag.innerHTML = `Grand TOTAL:`;
}

// events on cartToggler
cartToggler.onclick = viewCart;
