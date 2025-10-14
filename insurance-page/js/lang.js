import { translations } from "./translations.js";

export function languageSwitcher() {
  const langToggle = document.getElementById("lang-toggle");
  let currentLang = localStorage.getItem("lang") || "ar";

  const updateLanguage = () => {
    const t = translations[currentLang];
    document.documentElement.dir = t.dir;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (t[key]) el.textContent = t[key];
    });
    if (langToggle) langToggle.title = t.switch;
  };

  updateLanguage();

  if (langToggle) {
    langToggle.addEventListener("click", (e) => {
      e.preventDefault();
      currentLang = currentLang === "ar" ? "en" : "ar";
      localStorage.setItem("lang", currentLang);
      updateLanguage();
    });
  }
}
