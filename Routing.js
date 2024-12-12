//Function to navigate pages
/**
 * @param {*} pageId
 * this is a routing function it gets all the elemets with an arribute class of page
 * and the it removes an active class to hide the element
 * checks if a particular page is active or not the it sets and  delete the attributes accordingly
 */
function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.remove("active"); // hiding all pages
  });

  const activePage = document.getElementById(pageId);
  if (activePage) {
    activePage.classList.add("active");
  }
}

function router() {
  let hash = window.location.hash.slice(1) || "home"; // default to home page
  //call showpage
  showPage(hash);
}

// listening for hash changes

window.addEventListener("hashchange", router);
