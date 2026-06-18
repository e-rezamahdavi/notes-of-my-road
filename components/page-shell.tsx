"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Languages, Menu, X } from "lucide-react";
import { useState } from "react";
import { cls, languages, navItems, type Language } from "@/lib/content";
import { LanguageProvider, useLanguage } from "@/components/language-provider";

function BrandMark() {
  return (
    <span
      aria-hidden="true"
      className="relative block size-10 overflow-hidden rounded border border-neutral-700 bg-neutral-900 shadow-sm"
    >
      <Image src="/logo.jpg" alt="" fill className="object-cover" sizes="40px" />
    </span>
  );
}

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cls(
        "rounded px-3 py-2 text-sm font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
        active
          ? "bg-neutral-900 text-white"
          : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-100",
      )}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const links = navItems[language];

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-900/80 bg-neutral-950/90 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          className="group flex items-center gap-3 rounded py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
          onClick={() => setIsOpen(false)}
        >
          <BrandMark />
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold text-white">{t.siteName}</span>
            <span className="mt-1 text-xs text-neutral-500">{t.owner}</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={item.href === "#home"}
            />
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>

        <button
          type="button"
          className="inline-grid size-10 place-items-center rounded border border-neutral-800 bg-neutral-900 text-neutral-200 transition hover:border-neutral-700 hover:bg-neutral-850 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-neutral-900 bg-neutral-950 px-4 pb-4 pt-2 lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={item.href === "#home"}
                onClick={() => setIsOpen(false)}
              />
            ))}
            <div className="pt-3">
              <LanguageSwitcher language={language} setLanguage={setLanguage} />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function LanguageSwitcher({
  language,
  setLanguage,
}: {
  language: Language;
  setLanguage: (language: Language) => void;
}) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded border border-neutral-800 bg-neutral-900 p-1"
      aria-label="Language switcher"
    >
      <Languages size={16} className="mx-2 text-neutral-500" aria-hidden="true" />
      {(Object.keys(languages) as Language[]).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          className={cls(
            "min-w-10 rounded px-2.5 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
            language === item
              ? "bg-neutral-100 text-neutral-950"
              : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-100",
          )}
          aria-pressed={language === item}
        >
          {languages[item].short}
        </button>
      ))}
    </div>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-neutral-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-neutral-500 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>{t.footer.copyright}</p>
        <p>{t.built}</p>
      </div>
    </footer>
  );
}

export function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SkipLink />
      <Navbar />
      <main id="main-content" className="page-transition min-h-[calc(100vh-8rem)]">
        {children}
      </main>
      <Footer />
    </LanguageProvider>
  );
}

function SkipLink() {
  const { t } = useLanguage();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-neutral-100 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-neutral-950"
    >
      {t.skipLink}
    </a>
  );
}

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cls(
        "inline-flex items-center gap-2 rounded text-sm font-semibold text-neutral-100 transition hover:text-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400",
        className,
      )}
    >
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </a>
  );
}
