// Cart functionality
class ShoppingCart {
  constructor() {
    this.cartToggler = document.querySelector(".cart-icon");
    this.closeCart = document.querySelector(".closeCartbutton");
    this.shopCartDiv = document.querySelector(".shopping-cart");
    this.shopcartitems = document.querySelector(".shop-cart-items");
    this.cartItems = this.loadCart();

    console.log("Cart elements found:", {
      cartToggler: !!this.cartToggler,
      closeCart: !!this.closeCart,
      shopCartDiv: !!this.shopCartDiv,
      shopcartitems: !!this.shopcartitems,
    });

    // Initialize cart UI
    this.initializeCartUI();
    this.initializeEventListeners();
    this.updateCartCount();
  }

  initializeCartUI() {
    // Add cart count badge if it doesn't exist
    if (!document.querySelector(".cart-count")) {
      const cartCount = document.createElement("span");
      cartCount.className = "cart-count";
      this.cartToggler?.appendChild(cartCount);
    }

    // Ensure cart is initially hidden
    if (this.shopCartDiv) {
      this.shopCartDiv.classList.remove("visible");
    }
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
    // Toggle cart visibility with proper event delegation
    console.log("Setting up cart icon click listener on:", this.cartToggler);
    this.cartToggler?.addEventListener("click", (e) => {
      console.log("Cart icon clicked!");
      this.toggleCart(e);
    });
    this.closeCart?.addEventListener("click", () => {
      console.log("Close cart clicked!");
      this.hideCart();
    });

    // Close cart when clicking outside or pressing Escape
    document.addEventListener("click", (e) => {
      if (
        this.shopCartDiv?.classList.contains("visible") &&
        !this.shopCartDiv.contains(e.target) &&
        e.target !== this.cartToggler &&
        !this.cartToggler.contains(e.target)
      ) {
        this.hideCart();
      }
    });

    // Handle keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        this.shopCartDiv?.classList.contains("visible")
      ) {
        this.hideCart();
      }
    });

    // Delegate quantity and remove button events
    document.addEventListener("click", (e) => {
      const target = e.target.closest(".quantity-btn, .remove-item");
      if (!target) return;

      e.preventDefault();

      const itemId = target.dataset.id;
      const action =
        target.dataset.action || target.classList.contains("remove-item")
          ? "remove"
          : null;

      if (action === "increase") {
        this.updateQuantity(itemId, 1);
      } else if (action === "decrease") {
        this.updateQuantity(itemId, -1);
      } else if (action === "remove" || target.closest(".remove-item")) {
        this.removeItem(itemId);
      }
    });
  }

  toggleCart(e) {
    if (e) e.preventDefault();
    console.log(
      "Toggling cart, current state:",
      this.shopCartDiv?.classList.contains("visible")
    );

    // Remove debug class first
    this.shopCartDiv?.classList.remove("debug");

    // Force show cart with all necessary styles
    if (!this.shopCartDiv?.classList.contains("visible")) {
      this.shopCartDiv?.classList.add("visible");
      this.shopCartDiv.style.display = "flex";
      this.shopCartDiv.style.opacity = "1";
      this.shopCartDiv.style.visibility = "visible";
      this.shopCartDiv.style.transform = "translateX(0)";
    } else {
      this.shopCartDiv?.classList.remove("visible");
      this.shopCartDiv.style.display = "";
      this.shopCartDiv.style.opacity = "";
      this.shopCartDiv.style.visibility = "";
      this.shopCartDiv.style.transform = "";
    }

    console.log(
      "Cart toggled, new state:",
      this.shopCartDiv?.classList.contains("visible")
    );
    document.body.style.overflow = this.shopCartDiv?.classList.contains(
      "visible"
    )
      ? "hidden"
      : "";
  }

  hideCart() {
    this.shopCartDiv?.classList.remove("visible");
    this.shopCartDiv?.classList.remove("debug");
    this.shopCartDiv.style.display = "";
    this.shopCartDiv.style.opacity = "";
    this.shopCartDiv.style.visibility = "";
    this.shopCartDiv.style.transform = "";
    document.body.style.overflow = "";
    // Reset any active states
    const activeButtons = document.querySelectorAll(".quantity-btn:active");
    activeButtons.forEach((btn) => btn.blur());
  }

  addItem(item) {
    // Check if item already exists in cart
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      // If item exists, increase quantity
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // If item doesn't exist, add it with quantity 1
      this.cartItems.push({ ...item, quantity: 1 });
    }

    this.saveCart();
    this.viewCart();
    this.updateCartCount();

    // Show success feedback
    console.log("Item added to cart:", item);
  }

  removeItem(itemId) {
    this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
    this.saveCart();
    this.viewCart();
  }

  updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      const totalItems = this.cartItems.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      );
      cartCount.textContent = totalItems;
      cartCount.style.display = totalItems > 0 ? "flex" : "none";
    }
  }

  viewCart() {
    if (!this.shopCartDiv || !this.shopcartitems) return;

    // Show cart with smooth transition
    if (!this.shopCartDiv.classList.contains("visible")) {
      this.shopCartDiv.classList.add("visible");
    }

    this.shopcartitems.innerHTML = "";

    if (!this.cartItems.length) {
      this.shopcartitems.innerHTML = `
        <div class="empty-cart-state">
          <i class="fas fa-shopping-cart"></i>
          <p>Your cart is empty</p>
          <button class="btn-continue-shopping" onclick="cart.hideCart()">Continue Shopping</button>
        </div>`;
      this.updateCartCount();
      return;
    }

    let totalPrice = 0;

    this.cartItems.forEach((item) => {
      const { price, name, img, id } = item;
      totalPrice += this.parsePrice(price) * (item.quantity || 1);

      const itemElement = document.createElement("div");
      itemElement.className = "cart-item";
      const itemPrice = (this.parsePrice(price) * (item.quantity || 1)).toFixed(
        2
      );
      itemElement.innerHTML = `
        <img class="cart-item-image" src="${img || ""}" alt="${
        name || "Product"
      }" 
             onerror="this.src=\\"https://via.placeholder.com/80?text=No+Image\\"" />
        <div class="cart-item-details">
          <div class="cart-item-header">
            <h4>${name || "Unnamed Product"}</h4>
            <button class="remove-item" aria-label="Remove item" data-id="${id}">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="cart-item-controls">
            <div class="quantity-controls">
              <button class="quantity-btn" data-action="decrease" data-id="${id}" aria-label="Decrease quantity">-</button>
              <span class="quantity">${item.quantity || 1}</span>
              <button class="quantity-btn" data-action="increase" data-id="${id}" aria-label="Increase quantity">+</button>
            </div>
            <p class="cart-item-price">R${itemPrice}</p>
          </div>
        </div>
      `;
      this.shopcartitems.appendChild(itemElement);
    });

    const totalElement = document.createElement("div");
    totalElement.className = "cart-total";
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
    if (typeof priceStr === "number") return priceStr;
    if (!priceStr) return 0;
    return parseFloat(priceStr.replace(/[^0-9.-]+/g, "")) || 0;
  }

  addCartEventListeners() {
    // Delete buttons
    this.shopcartitems.querySelectorAll(".deletebutton").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const itemId = e.target.getAttribute("data-id");
        this.removeItem(itemId);
      });
    });

    // Quantity controls
    this.shopcartitems.querySelectorAll(".quantity-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const action = e.target.getAttribute("data-action");
        const itemId = e.target.getAttribute("data-id");
        this.updateQuantity(itemId, action);
      });
    });

    // Checkout button
    const checkoutBtn = this.shopcartitems.querySelector(".checkout");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => this.handleCheckout());
    }
  }

  updateQuantity(itemId, action) {
    const item = this.cartItems.find((item) => item.id === itemId);
    if (!item) return;

    if (action === "increase") {
      item.quantity = (item.quantity || 1) + 1;
    } else if (action === "decrease" && (item.quantity || 1) > 1) {
      item.quantity -= 1;
    }

    this.saveCart();
    this.viewCart();
  }

  handleCheckout() {
    // Add your checkout logic here
    if (this.cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Redirect to checkout page
    window.location.href = "checkout.html";
  }
}

// Initialize the shopping cart when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing shopping cart...");

  // Debug: Check if cart elements exist
  const cartElement = document.querySelector(".shopping-cart");
  const cartIcon = document.querySelector(".cart-icon");
  console.log("Cart element found:", cartElement);
  console.log("Cart icon found:", cartIcon);

  if (!cartElement) {
    console.error("CRITICAL: Cart element not found in DOM!");
    return;
  }

  window.cart = new ShoppingCart();
  console.log("Cart initialized:", window.cart);

  // Initialize cart view if we're on the cart page
  const isCartPage = document
    .querySelector("body")
    .classList.contains("cart-page");
  if (isCartPage) {
    cart.viewCart();
  }
});
