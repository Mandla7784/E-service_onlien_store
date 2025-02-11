import ItemCard from "./productCard.js";

const url_base_path = "https://fakestoreapi.com/products";
const getProducts = (path) => {
  fetch(path)
    .then((res) => res.json())
    .then((data) => createCard(data))
    .catch((e) => console.log(e))
    .finally("products fetched");
};

getProducts(url_base_path);

function createCard(data) {
  w;
  data.forEach((item) => {
    // console.log(item);
    const { catergory, id, title, image, price, rating, description } = item;

    const new_ITEMCARD = new ItemCard(
      catergory,
      description,
      id,
      image,
      price,
      rating,
      title
    );
    const product_placement = document.querySelector(".products_aligning");
    product_placement.append(new_ITEMCARD.createDOMBody());
  });
}
