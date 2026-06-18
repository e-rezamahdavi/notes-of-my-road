"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, type LucideIcon } from "lucide-react";
import { cls } from "@/lib/content";
import { useLanguage } from "@/components/language-provider";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-14 sm:px-6 sm:pb-14 sm:pt-20">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-4xl font-semibold text-white sm:text-5xl">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-neutral-400">{description}</p>
      </div>
    </section>
  );
}

export function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cls("mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14", className)}>
      {children}
    </section>
  );
}

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cls(
        "rounded-lg border border-neutral-850 bg-neutral-925 p-6 shadow-sm transition duration-200 hover:border-neutral-700 hover:bg-neutral-900",
        className,
      )}
    >
      {children}
    </article>
  );
}

export function IconBox({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="grid size-11 place-items-center rounded border border-neutral-800 bg-neutral-950 text-emerald-300">
      <Icon size={20} aria-hidden="true" />
    </span>
  );
}

export function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const { dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;

  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-emerald-500/60 bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
    >
      {children}
      <Arrow size={17} aria-hidden="true" />
    </Link>
  );
}

export function SecondaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center justify-center rounded border border-neutral-800 bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-neutral-100 transition hover:border-neutral-700 hover:bg-neutral-850 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
    >
      {children}
    </Link>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-xs font-medium text-neutral-400">
      {children}
    </span>
  );
}
