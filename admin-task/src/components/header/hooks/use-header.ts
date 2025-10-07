import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { _langs, _notifications } from "@/_mock";

export const useHeader = () => {
  const [lang, setLang] = useState(_langs[0]);
  const [openLang, setOpenLang] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openNotify, setOpenNotify] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setOpenLang(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setOpenUser(false);
      }
      if (
        notifyRef.current &&
        !notifyRef.current.contains(event.target as Node)
      ) {
        setOpenNotify(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpenSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    isHome,
    isScrolled,
    lang,
    langRef,
    searchRef,
    notifyRef,
    userRef,
    openLang,
    openUser,
    openNotify,
    openSearch,
    setLang,
    setOpenLang,
    setOpenUser,
    setOpenNotify,
    setOpenSearch,
    unreadCount: _notifications.filter((n) => n.isUnRead).length,
  };
};
