export class ItemCard {
  constructor(category, description, id, image, price, rating, title) {
    this.category = category;
    this.description = description;
    this.id = id;
    this.image = image;
    this.price = price;
    this.rating = rating;
    this.title = title;
  }
  /**
   *
   */
  createDOMBody = () => {
    const card_body = document.createElement("div");
    const product_image = document.createElement("img");
    const product_title = document.createElement("h3");
    const product_price = document.createElement("p");
    const ratings_tag = document.createElement("div");
    const add_to_cart_btn = document.createElement("button");

    // Set up the card structure
    card_body.className = "product-card";

    // Image setup
    product_image.src = `${this.image}`;
    product_image.alt = this.title;
    product_image.className = "product-image";

    // Title setup
    product_title.textContent = this.title;
    product_title.className = "product-title";

    // Price setup
    product_price.textContent = `R${this.price}`;
    product_price.className = "product-price";

    // Rating setup
    ratings_tag.className = "product-rating";
    ratings_tag.innerHTML = `⭐ ${this.rating?.rate || this.rating || "4.0"}`;

    // Add to cart button setup
    add_to_cart_btn.textContent = "Add to Cart";
    add_to_cart_btn.className = "add-to-cart-btn";
    add_to_cart_btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Add to cart functionality
      if (window.cart) {
        const item = {
          id: this.id,
          name: this.title,
          price: this.price,
          img: this.image,
        };
        
        // Add item to cart
        window.cart.addItem(item);
        
        // Visual feedback
        add_to_cart_btn.textContent = "Added!";
        add_to_cart_btn.style.backgroundColor = "#27ae60";
        add_to_cart_btn.style.transform = "scale(0.95)";
        
        setTimeout(() => {
          add_to_cart_btn.textContent = "Add to Cart";
          add_to_cart_btn.style.backgroundColor = "";
          add_to_cart_btn.style.transform = "";
        }, 2000);
      } else {
        console.error('Cart not initialized');
        add_to_cart_btn.textContent = "Error!";
        add_to_cart_btn.style.backgroundColor = "#e74c3c";
        setTimeout(() => {
          add_to_cart_btn.textContent = "Add to Cart";
          add_to_cart_btn.style.backgroundColor = "";
        }, 2000);
      }
    };

    // Append elements to card
    card_body.appendChild(product_image);
    card_body.appendChild(product_title);
    card_body.appendChild(product_price);
    card_body.appendChild(ratings_tag);
    card_body.appendChild(add_to_cart_btn);

    return card_body;
  };
}

export class FeatureCard extends ItemCard {
  constructor() {
    super();
  }
}
