const navLinks = document.querySelectorAll(".nav-links a");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage || 
        (currentPage === "" && linkPage === "index.html")) {
        link.classList.add("active");
    }
});
