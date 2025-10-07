import { useHeader } from "../hooks/use-header";
import LangDropdown from "./lang-dropdown";
import NotificationsDropdown from "./notifications-dropdown";
import SearchDropdown from "./search-dropdown";
import UserMenu from "./user-menu";

export default function Header() {
  const {
    isHome,
    isScrolled,
    langRef,
    searchRef,
    notifyRef,
    userRef,
    openSearch,
    openLang,
    openNotify,
    openUser,
    lang,
    setOpenSearch,
    setOpenLang,
    setOpenNotify,
    setOpenUser,
  } = useHeader();

  return (
    <header
      className={`fixed top-0 right-0 left-0 lg:left-64 z-50
        h-16 flex items-center justify-between px-3 sm:px-lg border-b transition-all duration-300
        ${
          isScrolled
            ? "bg-white/70 backdrop-blur-md shadow-sm border-gray-200"
            : "bg-transparent border-transparent"
        }`}
    >
      {isHome && !isScrolled && (
        <h1 className="hidden lg:block text-2xl font-bold text-primary-darker">
          Hi, Welcome back 👋
        </h1>
      )}

      <div className="flex items-center gap-3 ml-auto">
        <SearchDropdown
          ref={searchRef}
          open={openSearch}
          onToggle={() => setOpenSearch(!openSearch)}
        />

        <LangDropdown
          ref={langRef}
          open={openLang}
          lang={lang}
          onToggle={() => setOpenLang(!openLang)}
        />

        <NotificationsDropdown
          ref={notifyRef}
          open={openNotify}
          onToggle={() => setOpenNotify(!openNotify)}
        />

        <UserMenu
          ref={userRef}
          open={openUser}
          onToggle={() => setOpenUser(!openUser)}
        />
      </div>
    </header>
  );
}
