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
