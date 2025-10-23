document.addEventListener("DOMContentLoaded", () => {
  // Product Details

  // function to fetch data from json file
  function getProductDetails() {
    fetch("data.json")
      .then((resposne) => {
        if (!resposne.ok) {
          throw new Error("HTTP eror", resposne.status);
        }

        return resposne.json();
      })
      .then((data) => {
        renderProductDetails(data); // call render and parse data
      });
  }
  //function to display product details
  function renderProductDetails(data) {
    const details = data; // product details list
    const productDetails = document.querySelector(".about-product");

    if (!productDetails) {
      console.warn("Product details container not found");
      return;
    }

    const brandDetails = Object.entries(details[0]);

    brandDetails.forEach((detail) => {
      const html = `
            <p class="details"> <span class="span">${detail[0]}</span>: ${detail[1]}</p>
        `;

      // Append the new HTML to the existing content
      productDetails.innerHTML += html;
    });

    // about this item

    const aboutDetails = Object.entries(details[1]);
    let detail = aboutDetails[0];
    let header = detail["AboutThisItem"];
  }

  getProductDetails();
});
