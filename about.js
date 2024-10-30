// Product Details

function getProductDeatls(){
    
}



function renderProductDetails(){

    fetch("data.json")
    .then(resposne => {
        if(!resposne.ok){
            throw new Error("HTTP eror", resposne.status)
        }
         return resposne.json()
    })
    .then(data => {
        console.log(data)
    }).catch(error => {
        console.log(error)
    })

}

renderProductDetails()