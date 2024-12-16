window.addEventListener("DOMContentLoaded", () => {
  // hero image
  const heroProduct = document.querySelector(".hero-image");
  const btnShop = document.querySelector(".btn-start-shop");
  const homePage = document.querySelector(".home-page");
  const menuToggler = document.querySelector(".toggle-menu");
  const menuIcon = document.querySelector(".fa-x");
  //events on menu toggler
  menuToggler.addEventListener("click", () => {
    const navbar = document.querySelector("nav");
    if (menuIcon.classList.contains("fa-x")) {
      menuIcon.classList.remove("fa-x");
      menuIcon.classList.add("fa-bars");
      navbar.classList.add("show");
    } else if (menuIcon.classList.contains("fa-bars")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-x");
      navbar.classList.add("hide");
    }
  });

  /**
   * The home page should display none when we activate on the shop now button
   */
  btnShop.addEventListener("click", () => {
    console.log("clciked shopnow");
    homePage.classList.remove("home-page");
    homePage.classList.add("home-page-hide");
  });

  // Function to chnage image
  function chnageImage(e) {
    let image_source = e.target;
    heroProduct.src = `${image_source.src}`;
    console.log(image_source.src);
  }
  // grabbing headsets from the DOM
  const headsets = document.querySelectorAll(".heads");
  headsets.forEach((headset) => {
    headset.addEventListener("click", chnageImage);
  });
});

/**
 * TODO: we gonna fix the cart bugs...
 *
 * TODO: we going to intergrate our application with the payment gateway Stripe or yoco , or Paypal
 *
 */
