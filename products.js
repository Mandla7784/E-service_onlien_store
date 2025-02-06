const url_base_path = "https://fakestoreapi.com/products"
const getProducts= (path)=> {

fetch(url_base_path).then(res => res.json())
.then(data => console.log(data))
.catch(e => console.log(e))
.finally("products fetched")

}

(getProducts(url_base_path))