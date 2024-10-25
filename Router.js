//Function to navigate pages
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
