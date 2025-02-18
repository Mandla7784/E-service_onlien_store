const cartToggler = document.querySelector(".cart-icon");
const closeCart = document.querySelector(".closeCartbutton");
let shopCartDiv = document.querySelector(".shopping-cart");

closeCart.onclick = () => {
  shopCartDiv.classList.add("none");
};

const cartItems = localStorage.getItem("cartitems");
const jsonCartitems = JSON.parse(cartItems); // parsing to JASON
const shopcartitems = document.querySelector(".shop-cart-items");

/**
 *
 * @param {} itemkey
 * this function removes an item by id from localstorage
 */
function deleteitem(itemkey, listOfItems) {
  let updatedItems = listOfItems.filter((item) => item.id != itemkey);
  localStorage.setItem("cartitems", JSON.stringify(updatedItems));
  console.log(updatedItems);
  viewCart(updatedItems ,deleteitem());
}

/**
 * This function is triggered when a cart icon i clicked
 * it subscribes from localstorage and parese tha data to render in the DOM
 */
function viewCart(cartItems , func) {
  const totalTag = document.createElement("h2"); //grand total tag
  shopCartDiv.classList.remove("none");
  shopcartitems.innerHTML = "";
  let totalPrice = 0;

  cartItems.forEach((item) => {
    const { pri, name, img, id } = item;

  const price = Number(pri.slice(1));
    totalPrice += price;

    shopcartitems.innerHTML += /*html*/ `
      <div class="cart-card">
        <h4>${name}</h4>
        <p>R${price.toFixed(2)}</p>
        <img style="inline-size: 100px; block-size: 100px;" src="${img}" />
        <button 
          onclick="(function(){ func(${id}, jsonCartitems) })()"
          class="deletebutton" 
          style="background-color: rgb(212, 42, 42); color: white;">
          delete
        </button>
      </div>
    `;

  });
  
  totalTag.innerHTML = `Grand TOTAL: R${totalPrice.toFixed(2)}`;
  shopcartitems.append(totalTag);
  return totalPrice
}

// events on cartToggler
cartToggler.onclick = () => viewCart(jsonCartitems);
export default viewCart()