import ItemCard from "./productCard.js";

const url_base_path = "https://fakestoreapi.com/products";
const getProducts = (path) => {
  fetch(path)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((e) => console.log(e))
    .finally("products fetched");
};

getProducts(url_base_path);

const new_ITEMCARD = new ItemCard(
  "dfg",
  "dfg",
  "sdvgfd",
  "dfg",
  "dsfdgb",
  "df",
  "7"
);

const product_placement = document.querySelector(".products_aligning");
product_placement.append(new_ITEMCARD);
document.body.append(product_placement);
