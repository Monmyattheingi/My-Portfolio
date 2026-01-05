const toggleBtn = document.getElementById("themeToggle");
const navLinks = document.querySelectorAll(".nav-link");
const navbarBrand = document.querySelector(".navbar-brand");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  document.body.classList.toggle("dark-mode");

  toggleBtn.textContent =
    document.body.classList.contains("light-mode") ? "☀️" : "🌙";

  navLinks.forEach(link => {
    link.style.color = document.body.classList.contains("light-mode") ? '#111' : '#e6edf3';
  });

  navbarBrand.style.color = document.body.classList.contains("light-mode") ? '#111' : '#e6edf3';
});

// Active nav-link on scroll
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (pageYOffset >= sectionTop) current = section.getAttribute("id");
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) link.classList.add("active");
  });
});
