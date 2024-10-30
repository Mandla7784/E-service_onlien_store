window.addEventListener("DOMContentLoaded", () => {
  // hero image
  const heroProduct = document.querySelector(".hero-image");
  // whistle-page
  const page = document.querySelector(".whistle-page");
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
    page.classList.add("hide");
  });


  //User Subscription

  const user_email = document.querySelector(".user_subscription_email")
  const subscribingBUtton  = document.querySelector("#submit-subscriprion")
   subscribingBUtton.addEventListener("click",function(){
     if(user_email.value ){
      page.classList.remove("hide")
     }else{
       console.log("Please enter email first")
     }
   })


});

//

