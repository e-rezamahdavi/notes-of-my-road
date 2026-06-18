"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { content, languages, type Language } from "@/lib/content";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  dir: "ltr" | "rtl";
  t: (typeof content)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const storageKey = "notes-of-my-road-language";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "fa";
  }

  const stored = window.localStorage.getItem(storageKey);
  if (stored === "en" || stored === "fa" || stored === "az") {
    return stored;
  }

  return "fa";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fa");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setLanguageState(getInitialLanguage());
    setIsReady(true);
  }, []);

  useEffect(() => {
    const dir = languages[language].dir;
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.documentElement.dataset.language = language;
    window.localStorage.setItem(storageKey, language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      toggleLanguage: () =>
        setLanguageState((current) => (current === "fa" ? "en" : current === "en" ? "az" : "fa")),
      dir: languages[language].dir,
      t: content[language],
    }),
    [language],
  );

  return (
    <LanguageContext.Provider value={value}>
      <div className={isReady ? "contents" : "contents"}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
