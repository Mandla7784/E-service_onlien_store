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
        const {name , description , price , ratings , category ,stock , image } = item

    const card = document.createElement("div")
    
    const description__tag = document.createElement("h3")
    const features_image = document.createElement("img")
    const price_tag = document.createElement("p")
    const product_ratings = document.createElement("div")
    const stock_left = document.createElement("span")
    card.classList.add("features-card")
     

    // Elemenets classes
    features_image.classList.add("features-img")




    // details
 
    features_image.src = `${image}`
    description__tag.textContent = `${description}`
    price_tag.textContent = `${price}`
    product_ratings.textContent = `${ratings}`
    stock_left.textContent = `${stock}`


  
    //  appending to card


    card.append(features_image , description ,price_tag , product_ratings , stock_left)
    features_div.append(card)
        
    });


   
   


}
youMightAlsoLike()
