export default class ItemCard {
  constructor(category, description, id, image, price, rating, title) {
    this.category = category;
    this.description = description;
    this.id = id;
    this.image = image;
    this.price = price;
    this.rating = rating;
    this.title = title;
  }
  /**
   *
   */
  createDOMBody = () => {
    const card_body = document.createElement("div");
    const product_image = document.createElement("img");
    const product_title = document.createElement("h3");
    const product_price = document.createElement("p");
    const ratings_tag = document.createElement("p");
    let item_description = document.createElement("p");
    //   adding content
    product_image.src = `${this.image}`;
    product_title.textContent = this.title;
    product_price.textContent = `ZAR${this.price}`;
    ratings_tag.textContent = this.rating;
    item_description.textContent = this.description;

    // setting the content to the card

    card_body.append(product_title);
    card_body.append(product_image);
    card_body.append(product_price);
    card_body.append(item_description);
    card_body.append(ratings_tag);
    return card_body;
  };
}

class FeatureCard extends ItemCard {
  constructor() {
    super();
  }
}
