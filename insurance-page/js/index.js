import { menuToggle } from "./menu.js";
import { languageSwitcher } from "./lang.js";
import { translations } from "./translations.js";

menuToggle();
languageSwitcher();

const form = document.getElementById("join-form");
const fileInput = document.getElementById("cv");
const fileNameSpan = document.querySelector(".file-name");

const getCurrentLang = () => localStorage.getItem("lang") || "ar";

if (fileInput && fileNameSpan) {
  fileInput.addEventListener("change", () => {
    const lang = getCurrentLang();
    if (fileInput.files.length > 0) {
      fileNameSpan.textContent = fileInput.files[0].name;
    } else {
      fileNameSpan.textContent = translations[lang].cv_placeholder;
    }
  });
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const lang = getCurrentLang();
    const fullname = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const location = document.getElementById("location").value.trim();
    const experience = document.getElementById("experience").value.trim();
    const cvFile = document.getElementById("cv").files[0];

    if (!fullname || !phone || !location || !experience || !cvFile) {
      alert(translations[lang].alerts.required);
      return;
    }

    alert(translations[lang].alerts.success);

    console.log({
      fullname,
      phone,
      location,
      experience,
      cvFileName: cvFile.name,
    });

    form.reset();
    fileNameSpan.textContent = translations[lang].cv_placeholder;
  });
}
