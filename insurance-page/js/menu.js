export function menuToggle() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    toggle.classList.toggle("open");

    const icon = toggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  });
}
