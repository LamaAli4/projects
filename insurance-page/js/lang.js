import { translations } from "./translations.js";

export function languageSwitcher() {
  const langToggle = document.getElementById("lang-toggle");
  let currentLang = localStorage.getItem("lang") || "ar";

  const translateElements = document.querySelectorAll(
    "[data-i18n], [data-i18n-option], [data-i18n-placeholder]"
  );

  const updateLanguage = () => {
    const t = translations[currentLang];
    document.documentElement.dir = t.dir;
    document.documentElement.lang = currentLang;

    translateElements.forEach((el) => {
      if (el.hasAttribute("data-i18n")) {
        const key = el.getAttribute("data-i18n");
        if (t[key]) el.textContent = t[key];

      } else if (el.hasAttribute("data-i18n-option")) {
        const key = el.getAttribute("data-i18n-option");
        if (t.location_options?.[key]) {
          el.textContent = t.location_options[key];
        }
        
      } else if (el.hasAttribute("data-i18n-placeholder")) {
        const key = el.getAttribute("data-i18n-placeholder");
        if (t[key]) el.placeholder = t[key];
      }
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
