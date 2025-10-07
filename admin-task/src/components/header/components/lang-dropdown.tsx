import { forwardRef } from "react";
import { _langs } from "@/_mock";

type LangOption = (typeof _langs)[number];

type Props = {
  open: boolean;
  lang: LangOption;
  onToggle: () => void;
  setLang?: (lang: LangOption) => void;
};

const LangDropdown = forwardRef<HTMLDivElement, Props>(
  ({ open, lang, onToggle, setLang }, ref) => {
    return (
      <div className="relative" ref={ref}>
        <button
          onClick={onToggle}
          className="w-10 h-10 flex items-center cursor-pointer justify-center rounded-full hover:bg-gray-100 transition"
        >
          <img
            src={lang.icon}
            alt={lang.label}
            className="w-6 h-6 rounded-sm"
          />
        </button>

        {open && (
          <div className="absolute right-0 mt-sm w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
            {_langs.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setLang?.(option);
                  onToggle();
                }}
                className={`flex items-center gap-sm px-md py-sm text-sm w-full cursor-pointer hover:bg-primary-lighter/40 transition ${
                  lang.value === option.value
                    ? "bg-primary-lighter font-semibold"
                    : ""
                }`}
              >
                <img
                  src={option.icon}
                  alt={option.label}
                  className="w-5 h-5 rounded-sm"
                />
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

LangDropdown.displayName = "LangDropdown";
export default LangDropdown;
