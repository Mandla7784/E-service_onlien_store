document.addEventListener("DOMContentLoaded", () => {
  const base_path = "features.json";

  // function to get features from json file
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

  function renderFeatures(features) {
    const my_features = features["products"];

    // rendering my features
    my_features.forEach((item) => {
      const { name, description, price, ratings, category, stock, image } =
        item;

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
      description__tag.textContent = `${description.slice(0, 10)}...`; //
      price_tag.textContent = `$${price.toFixed(2)}`; // Format price
      product_ratings.textContent = `Ratings: ${ratings}`;
      stock_left.textContent = `In Stock: ${stock}`;
      const cartButton = document.createElement("button");
      // Button setup
      cartButton.classList.add("adding-to-cart");
      cartButton.textContent = "Add to Cart";
      // adding to cart

      cartButton.addEventListener("click", function () {
        addingToCart(this);
        setTimeout(() => {
          this.textContent = "Succesfully Added to Cart !";
          this.style.backgroundColor = "hsl(120, 38%, 44%)";
        }, 1000);
        setInterval(() => {
          this.textContent = "Add to Cart";
          this.style.backgroundColor = "";
        }, 2000);
      });

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
    function addingToCart(button) {
      if (button && button.closest) {
        const item = button.closest(".features-card");

        // item image
        const imageItem = item.querySelector("img");
        if (imageItem) {
          const imageSRC = imageItem.src;

          cartiItems.push(imageSRC);

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
