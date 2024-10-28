window.addEventListener("DOMContentLoaded", () => {
  // hero image
  const heroProduct = document.querySelector(".hero-image");

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
  // Log in FORM
  const btnFormQuit = document.querySelector(".form-quite");
  btnFormQuit.addEventListener("click", function () {
    // whistle-page
    const page = document.querySelector(".whistle-page");
    page.classList.add("hide");
  });
});
