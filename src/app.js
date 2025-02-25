




window.addEventListener("DOMContentLoaded", () => {
  // hero image
  const heroProduct = document.querySelector(".hero-image");
  const btnShop = document.querySelector(".btn-start-shop");
  const homePage = document.querySelector(".home-page");
  const menuToggler = document.querySelector(".toggle-menu");
  const menuIcon = document.querySelector(".fa-x");

  // Events on menu toggler
  menuToggler.addEventListener("click", () => {
    const navbar = document.querySelector("nav");

    // Toggle menu icon and navbar visibility
    if (menuIcon.classList.contains("fa-x")) {
      // Switch to bars icon and hiding the navbar
      menuIcon.classList.remove("fa-x");
      menuIcon.classList.add("fa-bars");
      navbar.classList.remove("show"); // Hiding navbar
      navbar.classList.add("hide");

      // Add hide class if necessary
    } else if (menuIcon.classList.contains("fa-bars")) {
      // Switch to x icon and showing the navbar
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-x");
      navbar.classList.remove("hide"); // Removing hide class
      navbar.classList.add("show"); // Showing navbar
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

  // Function to change image
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

// Payement Gateway 
paypal.Marks().render("#paypal-marks-container");

paypal
  .Buttons({
    createOrder: function (data, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: "800",
            },
          },
        ],
      });
    },
    onApprove: function (data, actions) {
      return actions.order.capture().then(function (details) {
        alert("Transaction completed by " + details.payer.name.given_name);
      });
    },
  })
  .render("#paypal-buttons-container");

document.querySelectorAll("input[name=payment-option]").forEach(function (el) {
  el.addEventListener("change", function (event) {
    if (event.target.value === "paypal") {
      document.querySelector("#alternate-button-container").style.display =
        "none";
      document.querySelector("#paypal-buttons-container").style.display =
        "block";
    } else {
      document.querySelector("#alternate-button-container").style.display =
        "block";
      document.querySelector("#paypal-buttons-container").style.display =
        "none";
    }
  });
});

document.querySelector("#alternate-button-container").style.display = "none";
