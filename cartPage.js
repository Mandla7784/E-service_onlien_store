const cartToggler = document.querySelector(".cart-icon");
const cartItems = localStorage.getItem("cartitems");
const jsonCartitems = JSON.parse(cartItems); // parsing to JASON

const shopcartitems = document.querySelector(".shop-cart-items");

/**
 *
 * @param {} itemkey
 * this function removes an item by id from localstorage
 */
function deleteitem(itemkey) {
  jsonCartitems.pop(itemkey);
  let updated = localStorage.setItem(
    "cartitems",
    JSON.stringify(jsonCartitems)
  );
  console.log(updated);
}
/**
 * This function is triggered when a cart icon i clicked
 * it subscribes from localstorage and parese tha data to render in the DOM
 */

function viewCart() {
  const totalTag = document.createElement("h2"); //grand toatl tag

  shopcartitems.append(totalTag);
  jsonCartitems.forEach((item) => {
    console.log(item.id);
    const { pri, name, img, id } = item;
    let totalPrice = 0;

    const price = Number(pri.slice(1, 5));
    totalPrice += price;

    shopcartitems.innerHTML += /*html*/ `
        <div class="cart-card">
        <h4>${name}</h4>
        <p>R${price.toFixed(2)}</p>
       <img  style="inline-size: 100px;block-size: 100px;" src= ${img}  />
      <button onclick=deleteitem(${id}) class="deletebutton" style="background-color: rgb(212, 42, 42);color: white;">delete</button>
        </div>
     
     
     `;
    return totalPrice;
  });
  // totalTag.innerHTML = `Grand TOTAL: ${}`;
}

// events on cartToggler
cartToggler.onclick = viewCart;
