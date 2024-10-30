// Product Details

function getProductDeatls(){
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


function renderProductDetails(){
    const details = getProductDeatls()
    console.log(details)


}

renderProductDetails()