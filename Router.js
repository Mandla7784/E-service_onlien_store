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

function router() {}
