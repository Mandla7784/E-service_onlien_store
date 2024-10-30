// Product Details


// function to fetch data from json file
function getProductDetails(){

 fetch("data.json")
    .then(resposne => {
        if(!resposne.ok){
            throw new Error("HTTP eror", resposne.status)
        }
       
         return resposne.json()
    }).then(data => {
        console.log(data)
         renderProductDetails(data) // call render and parse data
    })
 
}
//function to display product details
function renderProductDetails(data){
    const details =  data // product details list
    const productDetails = document.querySelector(".about-product")
    const brandDetails = Object.entries(details[0])
    
    brandDetails.forEach(detail => {
        console.log(detail[0], detail[1]);
        
        const html = `
            <p class="details"> <span class="span">${detail[0]}</span>: ${detail[1]}</p>
        `;
    
        // Append the new HTML to the existing content
        productDetails.innerHTML += html; 
    });
     
    // about this item

    const aboutDetails = Object.entries(details[1])
    let detail = aboutDetails[0]
    let header = detail["AboutThisItem"]
    console.log(header)
  


}

getProductDetails()