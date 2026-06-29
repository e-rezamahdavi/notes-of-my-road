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
      className="relative block size-11 overflow-hidden rounded border border-white/15 bg-neutral-950 shadow-sm shadow-black/30"
    >
      <Image src="/logo.jpg" alt="" fill className="object-cover" sizes="44px" />
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
        "rounded px-3 py-2 text-sm font-medium text-neutral-300 transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        active
          ? "bg-white/10 text-white"
          : "hover:bg-white/10 hover:text-white",
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-975/75 backdrop-blur-2xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex min-h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          className="group flex items-center gap-3 rounded py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
          onClick={() => setIsOpen(false)}
        >
          <BrandMark />
          <span className="flex flex-col leading-none">
            <span className="text-base font-bold text-white sm:text-lg">{t.siteName}</span>
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
          className="inline-grid size-10 place-items-center rounded border border-white/15 bg-white/10 text-neutral-100 transition hover:border-white/30 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-white/10 bg-neutral-975/95 px-4 pb-4 pt-2 backdrop-blur-2xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
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
      className="inline-flex items-center gap-1 rounded border border-white/15 bg-white/10 p-1"
      aria-label="Language switcher"
    >
      <Languages size={16} className="mx-2 text-neutral-400" aria-hidden="true" />
      {(Object.keys(languages) as Language[]).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          className={cls(
            "min-w-10 rounded px-2.5 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400",
            language === item
              ? "bg-neutral-100 text-neutral-950"
              : "text-neutral-300 hover:bg-white/10 hover:text-white",
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
    <footer className="border-t border-white/10 bg-neutral-975">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-neutral-500 sm:px-6 md:flex-row md:items-center md:justify-between">
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
