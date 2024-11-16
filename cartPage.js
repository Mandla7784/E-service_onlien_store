document.addEventListener("DOMContentLoaded", function () {
  function readingDataFromLocalStorage() {}
  const cartPAGE = document.querySelector(".shopping-cart");
  function renderCartItems() {
    cartPAGE.innerHTML = /*html*/ `
    

<div class="shopping-cart">
       <h1>Shopping Cart</h1>

  <div class="column-labels">
    <label class="product-image">Image</label>
    <label class="product-details">Product</label>
    <label class="product-price">Price</label>
    <label class="product-quantity">Quantity</label>
    <label class="product-removal">Remove</label>
    <label class="product-line-price">Total</label>
  </div>

  <div class="product">
    <div class="product-image">
      <img src="./public/01.jbl_tune_670nc_product_image_hero_black_ecommerce_5884.png">
    </div>
    <div class="product-details">
      <div class="product-title">item.name</div>
      <p class="product-description"></p>
    </div>
    <div class="product-price"></div>
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

  <div class="product">
    <div class="product-image">
      <img src="./public/download (2).jpeg">
    </div>
    <div class="product-details">
      <div class="product-title"></div>
      <p class="product-description"></p>
    </div>
    <div class="product-price">45.99</div>
    <div class="product-quantity">
      <input type="number" value="1" min="1">
    </div>
    <div class="product-removal">
      <button class="remove-product">
        Remove
      </button>
    </div>
    <div class="product-line-price">45.99</div>
  </div>

  <div class="totals">
    <div class="totals-item">
      <label>Subtotal</label>
      <div class="totals-value" id="cart-subtotal">71.97</div>
    </div>
    <div class="totals-item">
      <label>Tax (5%)</label>
      <div class="totals-value" id="cart-tax">3.60</div>
    </div>
    <div class="totals-item">
      <label>Shipping</label>
      <div class="totals-value" id="cart-shipping">15.00</div>
    </div>
    <div class="totals-item totals-item-total">
      <label>Grand Total</label>
      <div class="totals-value" id="cart-total">90.57</div>
    </div>
  </div>
      
      <button class="checkout">Checkout</button>

    
    
    `;
  }
  const viewCart = document.querySelector(".cart-icon");
  viewCart.addEventListener("click", () => {
    cartPAGE.classList.add("active");
    renderCartItems();
  });
});
