import { FeatureCard } from "./productCard.js";
console.log(FeatureCard);
document.addEventListener("DOMContentLoaded", () => {
  const base_path = "features.json";

  // function to get features from json file
  /**
   *
   * @param {*} path
   * @returns {object} data
   * This function fetches data from a json file and parse to the render features
   */
  function getFeatures(path) {
    fetch(path)
      .then((response) => {
        if (!response.ok) {
          return new Error("Error network response not found", response.status);
        }
        return response.json();
      })
      .then((data) => {
        renderFeatures(data);
      });
  }

  // calling features function to render into the DOM

  function youMightAlsoLike() {
    getFeatures(base_path);
  }

  /**
   * @param {Array} features
   * This functions loops on the features array and for each item i will ctreate a card to
   * render the content
   */
  function renderFeatures(features) {
    const my_features = features["products"];

    // rendering my features
    my_features.forEach((item) => {
      const { name, description, price, ratings, category, stock, image } =
        item;
  // new line again
  // testing again 
      // Create card container
      const card = document.createElement("div");
      card.classList.add("features-card");

      let description__tag = document.createElement("h3");
      const features_image = document.createElement("img");
      const price_tag = document.createElement("p");
      const product_ratings = document.createElement("div");
      const stock_left = document.createElement("span");

      card.classList.add("features-card");

      // Set attributes and content
      features_image.classList.add("features-img");
      features_image.src = `${image}`;
      features_image.alt = name; // Accessibility feature
      description__tag.textContent = `${description.slice(0, 20)}...`; //
      price_tag.textContent = `R${price.toFixed(2)}`; // Format price
      product_ratings.textContent = `Ratings: ${ratings}`;
      stock_left.textContent = `In Stock: ${stock}`;
      const cartButton = document.createElement("button");
      // Button setup
      cartButton.classList.add("adding-to-cart");
      cartButton.textContent = "Add to Cart";
      // adding to cart

      cartButton.onclick = function () {
        addingToCart(this);
        setTimeout(() => {
          this.textContent = "Succesfully Added to Cart !";
          this.style.backgroundColor = "hsl(120, 38%, 44%)";
          this.style.color = "#ffff";
        }, 1000);
        setInterval(() => {
          this.textContent = "Add to Cart";
          this.style.backgroundColor = "";
          this.style.color = "red";
        }, 2000);
      };

      // Append elements to card
      card.appendChild(features_image);
      card.appendChild(description__tag);
      card.appendChild(price_tag);
      card.appendChild(product_ratings);
      card.appendChild(stock_left);
      card.appendChild(cartButton);

      // Append the card to a parent container in the DOM

      document.querySelector(".features-rendered").appendChild(card);
    });
    // Adding features to Cart

    let cartiItems = [];

    /**
     * @param {*} button
     * this function takes a  a closest button to the targeted element and use it to add the data to
     * localstorage
     * @constant {object} my_item
     * it creates an item with properties required to be used in order to manipulate that item
     */
    function addingToCart(button) {
      if (button && button.closest) {
        const item = button.closest(".features-card");

        // item image
        const imageItem = item.querySelector("img");
        const itemPrice = item.querySelector("p");
        const nameOfItem = item.querySelector("h3");

        if (imageItem && itemPrice) {
          const imageSRC = imageItem.src;
          const price = itemPrice.textContent;
          const my_item = {
            id: Date.now(),
            pri: price,
            img: imageSRC,
            name: nameOfItem.textContent,
          };
          //  adding to the cart list
          cartiItems.push(my_item);

          // Setting to localstorage database
          localStorage.setItem("cartitems", JSON.stringify(cartiItems));
          console.log(cartiItems);
        }
      }
    }
  }

  //
  youMightAlsoLike();
});
