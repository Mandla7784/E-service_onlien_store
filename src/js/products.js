import { ItemCard } from "./productCard.js";

const url_base_path = "https://fakestoreapi.com/products";

// Fallback data in case the API fails
const fallbackProducts = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 99.99,
    image: "public/download (1).jpeg",
    rating: { rate: 4.5 },
    description: "High-quality wireless headphones with noise-cancellation.",
    category: "Electronics",
  },
  {
    id: 2,
    title: "Smartphone",
    price: 599.99,
    image: "public/vkx-2101-bk.1.webp",
    rating: { rate: 4.7 },
    description: "Latest model smartphone with advanced features.",
    category: "Electronics",
  },
  {
    id: 3,
    title: "Running Shoes",
    price: 49.99,
    image: "public/Last pic.jpg",
    rating: { rate: 4.3 },
    description: "Comfortable and lightweight running shoes.",
    category: "Sportswear",
  },
  {
    id: 4,
    title: "Gaming Console",
    price: 299.99,
    image:
      "public/01.jbl_tune_670nc_product_image_hero_black_ecommerce_5884.png",
    rating: { rate: 4.8 },
    description: "Next-gen gaming console with stunning graphics.",
    category: "Gaming",
  },
  {
    id: 5,
    title: "Blender",
    price: 29.99,
    image: "public/download.jpeg",
    rating: { rate: 4.2 },
    description: "Efficient kitchen blender with multiple speed settings.",
    category: "Home Appliances",
  },
];

const getProducts = (path) => {
  fetch(path)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => createCard(data))
    .catch((e) => {
      console.log("API failed, using fallback data:", e);
      createCard(fallbackProducts);
    })
    .finally(() => console.log("products fetched"));
};

getProducts(url_base_path);

function createCard(data) {
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
