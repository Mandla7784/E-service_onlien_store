const base_path = "features.json"

function getFeatures(path){
    fetch(path)
    .then(response => {
        if(! response.ok){
            return new Error("Error network response not found" , response.status)
        }
    return response.json()

    }).then(data => {
        console.log(data)
    })


}
function youMightAlsoLike(){
    getFeatures(base_path)
    
   
}

youMightAlsoLike(0)