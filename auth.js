
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
