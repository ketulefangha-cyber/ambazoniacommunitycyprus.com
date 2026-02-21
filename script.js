const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});
/* Fallback image (shows if video doesn't load) */
video-fallback {
    position: absolute;
    inset: 0;
    background: url("images/hero-fallback.jpg") center/cover no-repeat;
    z-index: 0;
}

/* Ensure video sits above fallback */
hero-video {
    z-index: 1;
}
<script>
  const links = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
</script>
