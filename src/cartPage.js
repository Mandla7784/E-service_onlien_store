// Cart functionality
class ShoppingCart {
  constructor() {
    this.cartToggler = document.querySelector(".cart-icon");
    this.closeCart = document.querySelector(".closeCartbutton");
    this.shopCartDiv = document.querySelector(".shopping-cart");
    this.shopcartitems = document.querySelector(".shop-cart-items");
    this.cartItems = this.loadCart();
    
    this.initializeEventListeners();
    this.updateCartCount();
  }

  loadCart() {
    try {
      return JSON.parse(localStorage.getItem("cartitems") || "[]");
    } catch (e) {
      console.error("Error loading cart:", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem("cartitems", JSON.stringify(this.cartItems));
      this.updateCartCount();
    } catch (e) {
      console.error("Error saving cart:", e);
    }
  }

  initializeEventListeners() {
    // Toggle cart visibility
    this.cartToggler?.addEventListener('click', () => this.toggleCart());
    this.closeCart?.addEventListener('click', () => this.hideCart());
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.shopCartDiv?.contains(e.target) && e.target !== this.cartToggler) {
        this.hideCart();
      }
    });
  }

  toggleCart() {
    this.shopCartDiv?.classList.toggle('hidden');
  }

  hideCart() {
    this.shopCartDiv?.classList.add('hidden');
  }

  addItem(item) {
    this.cartItems.push(item);
    this.saveCart();
    this.viewCart();
  }

  removeItem(itemId) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.saveCart();
    this.viewCart();
  }

  updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      cartCount.textContent = this.cartItems.length;
      cartCount.style.display = this.cartItems.length > 0 ? 'flex' : 'none';
    }
  }

  viewCart() {
    if (!this.shopCartDiv || !this.shopcartitems) return;
    
    this.shopCartDiv.classList.remove("hidden");
    this.shopcartitems.innerHTML = "";
    
    if (!this.cartItems.length) {
      this.shopcartitems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
      this.updateCartCount();
      return;
    }

    let totalPrice = 0;
    
    this.cartItems.forEach((item) => {
      const { pri, name, img, id } = item;
      const price = this.parsePrice(pri);
      totalPrice += price * (item.quantity || 1);

      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <img class="cart-item-image" src="${img || ''}" alt="${name || 'Product'}" />
        <div class="cart-item-details">
          <h4>${name || 'Unnamed Product'}</h4>
          <div class="quantity-controls">
            <button class="quantity-btn" data-action="decrease" data-id="${id}">-</button>
            <span class="quantity">${item.quantity || 1}</span>
            <button class="quantity-btn" data-action="increase" data-id="${id}">+</button>
          </div>
          <p>R${(price * (item.quantity || 1)).toFixed(2)}</p>
          <button class="deletebutton" data-id="${id}">Remove</button>
        </div>
      `;
      this.shopcartitems.appendChild(itemElement);
    });

    // Add total and checkout button
    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `
      <div class="total-amount">
        <h3>Total: R${totalPrice.toFixed(2)}</h3>
        <button class="checkout">Proceed to Checkout</button>
      </div>
    `;
    this.shopcartitems.appendChild(totalElement);

    // Add event listeners to dynamic elements
    this.addCartEventListeners();
    this.updateCartCount();
  }

  parsePrice(priceStr) {
    if (typeof priceStr === 'number') return priceStr;
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/[^0-9.-]+/g, "")) || 0;
  }

  addCartEventListeners() {
    // Delete buttons
    this.shopcartitems.querySelectorAll('.deletebutton').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.target.getAttribute('data-id');
        this.removeItem(itemId);
      });
    });

    // Quantity controls
    this.shopcartitems.querySelectorAll('.quantity-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.getAttribute('data-action');
        const itemId = e.target.getAttribute('data-id');
        this.updateQuantity(itemId, action);
      });
    });

    // Checkout button
    const checkoutBtn = this.shopcartitems.querySelector('.checkout');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.handleCheckout());
    }
  }

  updateQuantity(itemId, action) {
    const item = this.cartItems.find(item => item.id === itemId);
    if (!item) return;

    if (action === 'increase') {
      item.quantity = (item.quantity || 1) + 1;
    } else if (action === 'decrease' && (item.quantity || 1) > 1) {
      item.quantity -= 1;
    }

    this.saveCart();
    this.viewCart();
  }

  handleCheckout() {
    // Add your checkout logic here
    alert('Proceeding to checkout!');
    // window.location.href = '/checkout.html';
  }
}

// Initialize the shopping cart when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  window.cart = new ShoppingCart();
  
  // Initialize cart view if we're on the cart page
  const isCartPage = document.querySelector('body').classList.contains('cart-page');
  if (isCartPage) {
    cart.viewCart();
  }
});
          delete
        </button>
      </div>
    `;
  });

  totalTag.innerHTML = `Grand TOTAL: R${totalPrice.toFixed(2)}`;
  shopcartitems.append(totalTag);
  return totalPrice;
}

// events on cartToggler
cartToggler.onclick = () => viewCart(jsonCartitems);
export default viewCart();
