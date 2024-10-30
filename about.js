// Product Details

function getProductDetails(){

 fetch("data.json")
    .then(resposne => {
        if(!resposne.ok){
            throw new Error("HTTP eror", resposne.status)
        }
       
         return resposne.json()
    }).then(data => {
        console.log(data)
         renderProductDetails(data)
    })
 


    
}

function renderProductDetails(data){
    const details =  data // product details list
    const productDetails = document.querySelector(".about-product")
    const brandDetails = Object.entries(details[0])
    
    brandDetails.forEach(detail => {
        console.log(detail[0] , detail[1])

    })


    
 



}

getProductDetails()