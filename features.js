const base_path = "features.json"

// function to get features from json file
function getFeatures(path){
    fetch(path)
    .then(response => {
        if(! response.ok){
            return new Error("Error network response not found" , response.status)
        }
    return response.json()

    }).then(data => {
       
        renderFeatures(data)
    })
}

// calling features function to render into the DOM

function youMightAlsoLike(){
    getFeatures(base_path)
    
   
}

function renderFeatures (features) {
    const my_features  = features["products"]
    const features_div = document.querySelector(".features-rendered")

    console.log(my_features)
    // rendering my features 
    my_features.forEach(item => {
    const { name, description, price, ratings, category, stock, image } = item;

    // Create card container
    const card = document.createElement("div");
    card.classList.add("features-card");

    // Create elements for the card
    const features_image = document.createElement("img");
    const description_tag = document.createElement("h3");
    const price_tag = document.createElement("p");
    const product_ratings = document.createElement("div");
    const stock_left = document.createElement("span");
    const addToCartButton = document.createElement("button");

    // Set attributes and content
    features_image.classList.add("features-img");
    features_image.src = image;
    features_image.alt = name; // Accessibility feature
    description_tag.textContent = name; // 
    price_tag.textContent = `$${price.toFixed(2)}`; // Format price
    product_ratings.textContent = `Ratings: ${ratings}`;
    stock_left.textContent = `In Stock: ${stock}`;
    
    // Button setup
    addToCartButton.classList.add("add-to-cart");
    addToCartButton.textContent = "Add to Cart";
    
    // Append elements to card
    card.appendChild(features_image);
    card.appendChild(description_tag);
    card.appendChild(price_tag);
    card.appendChild(product_ratings);
    card.appendChild(stock_left);
    card.appendChild(addToCartButton);

    // Append the card to a parent container in the DOM
    document.querySelector(".features-rendered").appendChild(card);
});
  
}
youMightAlsoLike()
