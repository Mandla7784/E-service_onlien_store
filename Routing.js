//Function to navigate pages
/**
 * @param {*} pageId
 * this is a routing function it gets all the elemets with an arribute class of page
 * and then it removes an active class to hide the element
 * checks if a particular page is active or not then it sets and deletes the attributes accordingly
 */
function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.remove("active");
    page.style.display = "none";
  });

  const activePage = document.getElementById(pageId);
  if (activePage) {
    activePage.classList.add("active");
    activePage.style.display = "block";
  }
}

/**
 * this function handles routing
 * it gets the hash from the url and uses it to display the correct page
 */
function router() {
  let hash = window.location.hash.slice(1) || "home";
  showPage(hash);
}

// listening for hash changes
window.addEventListener("hashchange", router);

// Ensuring correct page is displayed on page load
window.addEventListener("DOMContentLoaded", router);
