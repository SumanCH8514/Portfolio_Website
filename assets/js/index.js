{
  /* <script> */
}
var typed = new Typed("#element", {
  strings: [
    "Web Developer",
    "App Developer",
    "Programming skill.",
    "Software Development.",
  ],
  typeSpeed: 80,
  loop: true,
});

document.querySelectorAll("nav ul li a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelectorAll("nav ul li a").forEach((link) => {
      link.classList.remove("active");
    });

    this.classList.add("active");

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("scroll", () => {
  let currentSectionId = "";
  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (
      window.scrollY >= sectionTop - 100 &&
      window.scrollY < sectionTop + sectionHeight - 100
    ) {
      currentSectionId = section.getAttribute("id");
    }
  });

  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === currentSectionId) {
      link.classList.add("active");
    }
  });
});
// </script>
