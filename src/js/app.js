window.addEventListener("DOMContentLoaded", () => {
  // hero image
  const heroProduct = document.querySelector(".hero-image");
  const btnShop = document.querySelector(".btn-start-shop");
  const homePage = document.querySelector(".home-page");
  const menuToggler = document.querySelector(".toggle-menu");
  const menuIcon = document.querySelector(".fa-x");
  const cartBtn = document.querySelector("#cart-btn");

  // Events on menu toggler
  if (menuToggler) {
    menuToggler.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const links = document.querySelector(".links");
      const body = document.body;

      // Toggle menu icon and navbar visibility
      if (menuIcon.classList.contains("fa-x")) {
        // Switch to bars icon and hiding the navbar
        menuIcon.classList.remove("fa-x");
        menuIcon.classList.add("fa-bars");
        links.classList.remove("show");
        body.style.overflow = "";
        menuToggler.setAttribute("aria-expanded", "false");
      } else if (menuIcon.classList.contains("fa-bars")) {
        // Switch to x icon and showing the navbar
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-x");
        links.classList.add("show");
        body.style.overflow = "hidden";
        menuToggler.setAttribute("aria-expanded", "true");
      }
    });

    // Close menu when clicking on links
    const navLinks = document.querySelectorAll(".links a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const links = document.querySelector(".links");
        const menuIcon = document.querySelector(".fa-x, .fa-bars");
        const body = document.body;

        if (links.classList.contains("show")) {
          menuIcon.classList.remove("fa-x");
          menuIcon.classList.add("fa-bars");
          links.classList.remove("show");
          body.style.overflow = "";
          menuToggler.setAttribute("aria-expanded", "false");
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      const links = document.querySelector(".links");
      const menuIcon = document.querySelector(".fa-x, .fa-bars");
      const body = document.body;

      if (
        links.classList.contains("show") &&
        !menuToggler.contains(e.target) &&
        !links.contains(e.target)
      ) {
        menuIcon.classList.remove("fa-x");
        menuIcon.classList.add("fa-bars");
        links.classList.remove("show");
        body.style.overflow = "";
        menuToggler.setAttribute("aria-expanded", "false");
      }
    });
  }

  /**
   * The home page should display none when we activate on the shop now button
   */
  btnShop.addEventListener("click", () => {
    console.log("clciked shopnow");
    homePage.classList.remove("home-page");
    homePage.classList.add("home-page-hide");
  });

  // Function to change image
  function changeImage(e) {
    e.preventDefault();
    e.stopPropagation();

    let image_source = e.target;
    console.log("Image clicked:", image_source);
    console.log("Hero product element:", heroProduct);
    console.log(
      "Current hero image src:",
      heroProduct ? heroProduct.src : "Not found"
    );

    if (heroProduct && image_source) {
      // Update the main image source
      heroProduct.src = image_source.src;
      heroProduct.alt = image_source.alt;
      console.log("Image source updated to:", image_source.src);

      // Remove active class from all images
      const allHeadsets = document.querySelectorAll(".heads");
      allHeadsets.forEach((img) => {
        img.classList.remove("active");
        console.log("Removed active from:", img);
      });

      // Add active class to clicked image
      image_source.classList.add("active");
      console.log("Active class added to:", image_source);

      // Force a re-render
      heroProduct.style.opacity = "0.8";
      setTimeout(() => {
        heroProduct.style.opacity = "1";
      }, 50);
    } else {
      console.error("Hero product or image source not found");
      console.error("Hero product:", heroProduct);
      console.error("Image source:", image_source);
    }
  }

  // grabbing headsets from the DOM
  const headsets = document.querySelectorAll(".heads");
  console.log("Found headsets:", headsets.length);

  if (headsets.length > 0) {
    headsets.forEach((headset, index) => {
      console.log(`Adding click listener to headset ${index}:`, headset);
      headset.addEventListener("click", changeImage);

      // Also add touch events for mobile
      headset.addEventListener("touchstart", changeImage);
    });

    // Set first image as active by default
    headsets[0].classList.add("active");
    console.log("First image set as active");
  } else {
    console.error("No headsets found in DOM");

    // Try again after a short delay in case DOM isn't fully loaded
    setTimeout(() => {
      const retryHeadsets = document.querySelectorAll(".heads");
      console.log("Retry - Found headsets:", retryHeadsets.length);

      if (retryHeadsets.length > 0) {
        retryHeadsets.forEach((headset, index) => {
          console.log(
            `Adding click listener to headset ${index} (retry):`,
            headset
          );
          headset.addEventListener("click", changeImage);
          headset.addEventListener("touchstart", changeImage);
        });

        retryHeadsets[0].classList.add("active");
        console.log("First image set as active (retry)");
      }
    }, 100);
  }

  // Add event delegation as fallback
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("heads")) {
      console.log("Event delegation triggered for:", e.target);
      changeImage(e);
    }
  });

  // Add to cart functionality
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      const productData = {
        id: "beats-studio-pro",
        name: "Beats Studio Pro Wireless Headphones",
        price: 2500.24,
        img: "public/download (1).jpeg",
        quantity: 1,
      };

      if (window.cart) {
        window.cart.addItem(productData);
        // Show success message
        cartBtn.textContent = "Added to Cart!";
        cartBtn.style.backgroundColor = "#27ae60";
        setTimeout(() => {
          cartBtn.textContent = "ADD TO CART";
          cartBtn.style.backgroundColor = "";
        }, 2000);
      }
    });
  }

  // Cart icon click handler
  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.cart) {
        window.cart.toggleCart();
      }
    });
  }

  // Add "View Cart" functionality
  const cartIconLink = document.querySelector("#cart-icon-link");
  if (cartIconLink) {
    cartIconLink.addEventListener("click", (e) => {
      e.preventDefault();
      if (window.cart) {
        window.cart.toggleCart();
      }
    });
  }
});

// Payment Gateway - Initialize PayPal when SDK is loaded
let paypalInitialized = false;

function initializePayPal() {
  if (typeof paypal !== "undefined" && !paypalInitialized) {
    try {
      paypalInitialized = true;

      // Render PayPal marks only once
      const marksContainer = document.querySelector("#paypal-marks-container");
      if (marksContainer && !marksContainer.hasChildNodes()) {
        paypal.Marks().render("#paypal-marks-container");
      }

      // Render PayPal buttons only once
      const buttonsContainer = document.querySelector(
        "#paypal-buttons-container"
      );
      if (buttonsContainer && !buttonsContainer.hasChildNodes()) {
        paypal
          .Buttons({
            style: {
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "paypal",
            },
            createOrder: function (data, actions) {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "2500.24",
                      currency_code: "ZAR",
                    },
                  },
                ],
              });
            },
            onApprove: function (data, actions) {
              return actions.order.capture().then(function (details) {
                console.log("Payment completed:", details);
                alert("Payment successful! Transaction ID: " + details.id);
                // Redirect to success page or show success message
              });
            },
            onError: function (err) {
              console.error("PayPal error:", err);
              alert(
                "PayPal payment failed. Please use the 'Pay with Credit Card' option instead."
              );
            },
            onCancel: function (data) {
              console.log("Payment cancelled:", data);
            },
          })
          .render("#paypal-buttons-container");
      }
    } catch (error) {
      console.error("PayPal initialization error:", error);
      paypalInitialized = false;
    }
  } else if (!paypalInitialized) {
    // Retry after a short delay if PayPal SDK not loaded yet
    setTimeout(initializePayPal, 100);
  }
}

// Initialize PayPal when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Wait a bit for PayPal SDK to load
  setTimeout(initializePayPal, 1000);
});

// Handle payment option changes
document.querySelectorAll("input[name=payment-option]").forEach(function (el) {
  el.addEventListener("change", function (event) {
    const alternateContainer = document.querySelector(
      "#alternate-button-container"
    );
    const paypalContainer = document.querySelector("#paypal-buttons-container");

    if (event.target.value === "paypal") {
      if (alternateContainer) alternateContainer.style.display = "none";
      if (paypalContainer) paypalContainer.style.display = "block";
    } else {
      if (alternateContainer) alternateContainer.style.display = "block";
      if (paypalContainer) paypalContainer.style.display = "none";
    }
  });
});

// Handle credit card payment
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("credit-card-btn")) {
    event.preventDefault();

    // Simulate credit card payment processing
    const confirmPayment = confirm(
      "This is a demo. In a real application, this would redirect to a secure payment processor.\n\nProceed with demo payment?"
    );

    if (confirmPayment) {
      // Simulate payment processing
      event.target.textContent = "Processing...";
      event.target.disabled = true;

      setTimeout(() => {
        alert(
          "Payment successful! This is a demo payment.\n\nIn a real application, you would integrate with a payment processor like Stripe, Square, or your bank's payment gateway."
        );
        event.target.textContent = "Pay with Credit Card";
        event.target.disabled = false;

        // Redirect to success page or show success message
        window.location.href = "index.html";
      }, 2000);
    }
  }
});

// Initialize payment options
document.addEventListener("DOMContentLoaded", function () {
  const alternateContainer = document.querySelector(
    "#alternate-button-container"
  );
  const paypalContainer = document.querySelector("#paypal-buttons-container");

  if (alternateContainer) alternateContainer.style.display = "none";
  if (paypalContainer) paypalContainer.style.display = "block";
});
