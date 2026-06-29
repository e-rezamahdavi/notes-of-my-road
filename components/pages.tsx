"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  Bitcoin,
  Check,
  ChevronRight,
  Clipboard,
  Code2,
  Github,
  Linkedin,
  Mail,
  Network,
  Send,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { FormEvent, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { cls, type Language } from "@/lib/content";

type SocialLink = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

type DonationItem = {
  name: string;
  network: string;
  minimum: string;
  value: string;
  href?: string;
  icon: LucideIcon;
  note?: Record<Language, string>;
};

type DonationGroup = {
  title: Record<Language, string>;
  description: Record<Language, string>;
  items: DonationItem[];
};

type TerminalEntry = {
  command?: string;
  lines: string[];
};

const terminalPrompt = "user@root:~#";
const emailAddress = "E.RezaMahdavi@gmail.com";
const emailHref = `mailto:${emailAddress}`;

const socials: SocialLink[] = [
  {
    label: "GitHub",
    value: "e-rezamahdavi",
    href: "https://github.com/e-rezamahdavi",
    icon: Github,
  },
  {
    label: "Telegram",
    value: "@notesofmyroad",
    href: "https://t.me/notesofmyroad",
    icon: Send,
  },
  {
    label: "YouTube",
    value: "@notesofmyroad",
    href: "https://youtube.com/@notesofmyroad",
    icon: Youtube,
  },
  {
    label: "LinkedIn",
    value: "e-rezamahdavi",
    href: "https://linkedin.com/in/e-rezamahdavi",
    icon: Linkedin,
  },
  {
    label: "Email",
    value: emailAddress,
    href: emailHref,
    icon: Mail,
  },
];

const rialItems: DonationItem[] = [
  {
    name: "BluBank",
    network: "IRR / BluBank",
    minimum: "No minimum",
    value: "https://app.blubank.com/s/aa6EyAV2fNYJ",
    href: "https://app.blubank.com/s/aa6EyAV2fNYJ",
    icon: Banknote,
  },
  {
    name: "Daramet",
    network: "IRR / Daramet",
    minimum: "No minimum",
    value: "https://daramet.com/e_rezamahdavi",
    href: "https://daramet.com/e_rezamahdavi",
    icon: Banknote,
  },
];

const cryptoWarning = {
  en: "Deposits below the minimum may be lost.",
  fa: "واریز کمتر از حداقل ممکن است باعث از بین رفتن دارایی شود.",
  az: "Minimum məbləğdən az köçürmələr itə bilər.",
} as const;

const cryptoItems: DonationItem[] = [
  {
    name: "USDT",
    network: "BEP20",
    minimum: "1 USDT",
    value: "0xc91d8cfEc92589a6C06e19152eE853C5480A65dA",
    icon: ShieldCheck,
    note: cryptoWarning,
  },
  {
    name: "TRX",
    network: "TRON",
    minimum: "4 TRX",
    value: "TGpS3uZFQ3MvNd6xnFrSGGR43MN8755T1n",
    icon: Network,
    note: cryptoWarning,
  },
  {
    name: "BTC",
    network: "Bitcoin",
    minimum: "0.0000001 BTC",
    value: "bc1q0k5n963r78gtxfrsqu0x5n474rvhxyc359lwll",
    icon: Bitcoin,
    note: cryptoWarning,
  },
  {
    name: "BTC",
    network: "BEP20",
    minimum: "0.000015 BTC",
    value: "0xc91d8cfEc92589a6C06e19152eE853C5480A65dA",
    icon: Bitcoin,
    note: cryptoWarning,
  },
];

const lovelyMessageItems: DonationItem[] = [
  {
    name: "Lovely message",
    network: "Email",
    minimum: "One kind message",
    value: emailAddress,
    href: `${emailHref}?subject=Lovely%20message%20for%20Notes%20of%20my%20road`,
    icon: Mail,
    note: {
      en: "A kind message is also a real donation.",
      fa: "برای حمایت، می‌تونی فقط با یک پیام بهم انرژی بدی.",
      az: "Dəstək üçün sadəcə bir mesajla mənə enerji verə bilərsən.",
    },
  },
];

const donationGroups: DonationGroup[] = [
  {
    title: {
      en: "Rial payments",
      fa: "پرداخت ریالی",
      az: "Rial ödənişləri",
    },
    description: {
      en: "Local payment methods for small direct support.",
      fa: "روش‌های پرداخت داخلی برای حمایت مستقیم و ساده.",
      az: "Birbaşa və sadə dəstək üçün yerli ödəniş üsulları.",
    },
    items: rialItems,
  },
  {
    title: {
      en: "Crypto",
      fa: "رمز ارز",
      az: "Crypto",
    },
    description: {
      en: "Crypto wallets grouped by payment network. Always check network and minimum deposit.",
      fa: "کیف‌پول‌ها بر اساس شبکه پرداخت جدا شده‌اند. حتماً شبکه و حداقل واریز را بررسی کن.",
      az: "Crypto wallet-lər payment network üzrə qruplaşdırılıb. Network və minimum deposit-i mütləq yoxla.",
    },
    items: cryptoItems,
  },
  {
    title: {
      en: "Lovely message",
      fa: "Lovely message",
      az: "Lovely message",
    },
    description: {
      en: "Support can be as simple as sending a kind message.",
      fa: "گاهی حمایت یعنی فقط یک پیام محبت‌آمیز که ادامه مسیر را گرم‌تر می‌کند.",
      az: "Bəzən dəstək sadəcə isti bir mesajdır; yolun davamına enerji verir.",
    },
    items: lovelyMessageItems,
  },
];

const copyLabels = {
  en: { copy: "Copy", copied: "Copied", open: "Open link" },
  fa: { copy: "کپی", copied: "کپی شد", open: "باز کردن لینک" },
  az: { copy: "Kopyala", copied: "Kopyalandı", open: "Linki aç" },
} as const;

const ui = {
  en: {
    heroTitle: "Notes of my road",
    heroDescription:
      "Learning logs, Linux notes, network experiments, and the public trail of a builder who keeps moving.",
    donationButton: "Donation",
    socialButton: "Social links",
    highlightsEyebrow: "The road, organized",
    highlightsTitle: "A quiet home for practical learning.",
    highlightsDescription:
      "Notes of my road keeps the journey sharp: what was tried, what worked, what broke, and what is worth carrying forward.",
    highlights: [
      {
        title: "Linux first",
        description: "Hands-on learning around Linux, networks, and practical infrastructure tools.",
        icon: TerminalSquare,
      },
      {
        title: "Open roadmap",
        description: "A single home for the journey, channels, experiments, and next steps.",
        icon: BadgeCheck,
      },
      {
        title: "Builder mode",
        description: "Build small, ship clearly, document what worked, and improve from evidence.",
        icon: Code2,
      },
    ],
    terminalEyebrow: "Interactive terminal",
    terminalTitle: "Road shell",
    terminalDescription:
      "Try a few commands. The terminal stays English because some things just feel right in shell language.",
    terminalHint: "Try: help, whoami, socials, donation, clear",
    socialTitle: "Social links",
    socialDescription: "Follow Notes of my road or reach me through these public channels.",
    donationTitle: "Donation",
    donationDescription:
      "Donation is a small vote of confidence. In the computer world, it helps independent builders keep documenting, maintaining tools, publishing tutorials, and sharing what they learn in public.",
    donationCulture:
      "Around the world, donation culture keeps open source projects, educational channels, personal blogs, and tiny tools alive. It is not only about money; it is a signal that the work mattered to someone.",
    networkLabel: "Payment network",
    minimumLabel: "Minimum deposit",
    addressLabel: "Address",
  },
  fa: {
    heroTitle: "Notes of my road",
    heroDescription:
      "گزارش‌های یادگیری، یادداشت‌های لینوکس، تجربه‌های شبکه و ردپای عمومی مسیری که هر روز ساخته و مستند می‌شود.",
    donationButton: "Donation",
    socialButton: "لینک‌های من",
    highlightsEyebrow: "مسیر، منظم و قابل دنبال کردن",
    highlightsTitle: "خانه‌ای خلوت برای یادگیری عملی.",
    highlightsDescription:
      "Notes of my road کمک می‌کند مسیر شفاف بماند: چه چیزی امتحان شد، چه چیزی جواب داد، چه چیزی شکست خورد و چه چیزی ارزش ادامه دادن دارد.",
    highlights: [
      {
        title: "Linux first",
        description: "یادگیری عملی با تمرکز روی لینوکس، شبکه و ابزارهای واقعی زیرساخت.",
        icon: TerminalSquare,
      },
      {
        title: "Open roadmap",
        description: "یک خانه‌ی واحد برای مسیر یادگیری، کانال‌ها، تجربه‌ها و قدم‌های بعدی.",
        icon: BadgeCheck,
      },
      {
        title: "Builder mode",
        description: "کوچک بساز، شفاف منتشر کن، نتیجه را مستند کن و با شواهد بهترش کن.",
        icon: Code2,
      },
    ],
    terminalEyebrow: "Interactive terminal",
    terminalTitle: "Road shell",
    terminalDescription:
      "Try a few commands. Terminal بهتر است انگلیسی بماند؛ چون بعضی چیزها در زبان shell طبیعی‌ترند.",
    terminalHint: "Try: help, whoami, socials, donation, clear",
    socialTitle: "لینک‌های من",
    socialDescription: "برای دنبال کردن Notes of my road یا ارتباط مستقیم، این کانال‌ها فعال‌اند.",
    donationTitle: "Donation",
    donationDescription:
      "Donation یعنی یک رأی کوچک به ادامه مسیر. در دنیای کامپیوتر، همین حمایت‌ها باعث می‌شود آدم‌ها بتوانند ابزارها، آموزش‌ها، مستندات، پروژه‌های open source و تجربه‌هایشان را زنده نگه دارند.",
    donationCulture:
      "در فرهنگ جهانی تکنولوژی، Donation فقط پول دادن نیست؛ یک پیام است که می‌گوید این کار دیده شده و ارزش ادامه دادن دارد. خیلی از بلاگ‌ها، کانال‌های آموزشی، maintainerهای open source و سازنده‌های مستقل با همین حمایت‌های کوچک نفس می‌کشند.",
    networkLabel: "Payment network",
    minimumLabel: "Minimum deposit",
    addressLabel: "Address",
  },
  az: {
    heroTitle: "Notes of my road",
    heroDescription:
      "Learning logs, Linux notes, network experiments və hər gün qurulan yolun public izi.",
    donationButton: "Donation",
    socialButton: "Linklərim",
    highlightsEyebrow: "Yol, səliqəli şəkildə",
    highlightsTitle: "Praktiki öyrənmə üçün sakit bir ev.",
    highlightsDescription:
      "Notes of my road yolu aydın saxlayır: nə sınandı, nə işlədi, nə qırıldı və nə davam etməyə dəyər.",
    highlights: [
      {
        title: "Linux first",
        description: "Linux, network və real infrastructure alətləri üzərində praktiki öyrənmə.",
        icon: TerminalSquare,
      },
      {
        title: "Open roadmap",
        description: "Öyrənmə yolu, kanallar, təcrübələr və növbəti addımlar üçün tək bir ev.",
        icon: BadgeCheck,
      },
      {
        title: "Builder mode",
        description: "Kiçik qur, aydın paylaş, nəticəni sənədləşdir və sübutlarla yaxşılaşdır.",
        icon: Code2,
      },
    ],
    terminalEyebrow: "Interactive terminal",
    terminalTitle: "Road shell",
    terminalDescription:
      "Try a few commands. Terminal English qalsa daha təbii görünür; shell dili belədir.",
    terminalHint: "Try: help, whoami, socials, donation, clear",
    socialTitle: "Linklərim",
    socialDescription: "Notes of my road-u izləmək və ya mənimlə əlaqə üçün bu kanallar aktivdir.",
    donationTitle: "Donation",
    donationDescription:
      "Donation yola davam etmək üçün kiçik bir güvən səsidir. Computer dünyasında bu dəstəklər insanların tools, tutorial, documentation, open source və təcrübələrini yaşatmasına kömək edir.",
    donationCulture:
      "Dünya tech mədəniyyətində Donation təkcə pul deyil; bu işin görüldüyünü və davam etməyə dəyər olduğunu deyən bir mesajdır. Bloglar, educational channels, open source maintainers və independent builders çox vaxt bu kiçik dəstəklərlə nəfəs alır.",
    networkLabel: "Payment network",
    minimumLabel: "Minimum deposit",
    addressLabel: "Address",
  },
} as const;

export function HomeContent() {
  return (
    <>
      <HeroSection />
      <HighlightsSection />
      <TerminalSection />
      <SocialSection />
      <DonationSection />
    </>
  );
}

function HeroSection() {
  const { language } = useLanguage();
  const t = ui[language];

  return (
    <section id="home" className="relative isolate overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/header.jpg"
          alt="Notes of my road channel header"
          fill
          priority
          className="object-cover object-center opacity-85"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,3,0.34)_0%,rgba(3,3,3,0.05)_38%,rgba(3,3,3,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,0.92)_0%,rgba(3,3,3,0.45)_34%,rgba(3,3,3,0.18)_62%,rgba(3,3,3,0.84)_100%)]" />
      </div>

      <div className="mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-7xl flex-col justify-end px-4 pb-8 pt-24 sm:px-6 lg:pb-12">
        <div className="max-w-4xl">
          <h1 className="max-w-3xl text-5xl font-semibold leading-none text-white sm:text-7xl lg:text-8xl">
            {t.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-200 sm:text-xl">
            {t.heroDescription}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#donation"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-white bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t.donationButton}
              <ChevronRight size={17} aria-hidden="true" />
            </a>
            <a
              href="#socials"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-white/30 bg-black/35 px-5 py-2.5 text-sm font-semibold text-neutral-100 backdrop-blur-xl transition hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t.socialButton}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HighlightsSection() {
  const { language } = useLanguage();
  const t = ui[language];

  return (
    <section id="about" className="bg-neutral-975">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            {t.highlightsEyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-6xl">
            {t.highlightsTitle}
          </h2>
          <p className="mt-5 text-lg leading-8 text-neutral-400">{t.highlightsDescription}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {t.highlights.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group rounded border border-white/10 bg-white/[0.035] p-6 transition hover:border-white/25 hover:bg-white/[0.06]"
              >
                <span className="grid size-11 place-items-center rounded border border-white/10 bg-black/30 text-emerald-300 transition group-hover:border-emerald-300/40">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-3 leading-7 text-neutral-400">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TerminalSection() {
  const { language } = useLanguage();
  const t = ui[language];

  return (
    <section id="terminal" className="border-y border-white/10 bg-[#f3f1eb] text-neutral-950">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded border border-neutral-950/15 bg-white/60 px-3 py-1.5 text-sm text-neutral-600">
            <Sparkles size={15} className="text-emerald-700" aria-hidden="true" />
            {t.terminalEyebrow}
          </div>
          <h2 className="mt-5 text-4xl font-semibold leading-tight text-neutral-950 sm:text-6xl">
            {t.terminalTitle}
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-700">{t.terminalDescription}</p>
          <p className="mt-5 text-sm font-medium text-neutral-500">{t.terminalHint}</p>
        </div>

        <InteractiveTerminal />
      </div>
    </section>
  );
}

function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      lines: ["Notes shell is ready.", "Type help to start."],
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  function runCommand(command: string) {
    const normalized = command.trim().toLowerCase();

    if (normalized === "clear") {
      setHistory([]);
      return;
    }

    const lines = getTerminalOutput(normalized);
    setHistory((current) => [...current, { command, lines }]);
  }

  function submitCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runCommand(input);
    setInput("");
  }

  return (
    <div
      className="overflow-hidden rounded border border-neutral-950 bg-[#080b0c] shadow-2xl shadow-neutral-950/30"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex h-11 items-center gap-2 border-b border-neutral-800 bg-neutral-950 px-4">
        <span className="size-3 rounded-full bg-red-400" />
        <span className="size-3 rounded-full bg-yellow-300" />
        <span className="size-3 rounded-full bg-emerald-400" />
        <span className="ms-auto text-xs text-neutral-500">root-shell</span>
      </div>

      <div className="min-h-80 p-5 font-mono text-sm leading-7 text-neutral-200" dir="ltr">
        <div className="max-h-64 overflow-y-auto pr-2">
          {history.map((entry, index) => (
            <div key={`${entry.command ?? "intro"}-${index}`} className="mb-4">
              {entry.command ? (
                <p>
                  <span className="text-emerald-300">{terminalPrompt}</span>{" "}
                  <span className="text-neutral-100">{entry.command}</span>
                </p>
              ) : null}
              {entry.lines.map((line, lineIndex) => (
                <p key={`${line}-${lineIndex}`} className="whitespace-pre-wrap text-neutral-500">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        <form onSubmit={submitCommand} className="mt-4 flex items-center gap-2">
          <label htmlFor="terminal-input" className="shrink-0 text-emerald-300">
            {terminalPrompt}
          </label>
          <input
            ref={inputRef}
            id="terminal-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-neutral-100 outline-none"
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal command"
          />
          <span className="terminal-caret" aria-hidden="true" />
        </form>
      </div>
    </div>
  );
}

function getTerminalOutput(command: string) {
  switch (command) {
    case "":
      return [""];
    case "help":
      return ["commands: whoami, motd, socials, donation, clear"];
    case "whoami":
      return ["user"];
    case "motd":
      return ["Focus. Build. Deploy. Repeat."];
    case "socials":
      return [
        "github/e-rezamahdavi",
        "telegram/@notesofmyroad",
        "youtube/@notesofmyroad",
        `email/${emailAddress}`,
      ];
    case "donation":
    case "support":
      return ["Donation section: #donation", "Check payment network and minimum deposit before crypto transfers."];
    default:
      return [
        `Invalid command: ${command}`,
        "This command is not available. Type help to see available commands.",
      ];
  }
}

function SocialSection() {
  const { language } = useLanguage();
  const t = ui[language];

  return (
    <section id="socials" className="border-y border-white/10 bg-[#070707]">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Social
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-6xl">
              {t.socialTitle}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-400">{t.socialDescription}</p>
          </div>

          <div className="overflow-hidden rounded border border-white/10 bg-white/[0.035]">
            {socials.map((link, index) => {
              const Icon = link.icon;
              const isMailLink = link.href.startsWith("mailto:");

              return (
                <a
                  key={link.href}
                  href={link.href}
                  target={isMailLink ? undefined : "_blank"}
                  rel={isMailLink ? undefined : "noreferrer"}
                  className={cls(
                    "group grid min-h-20 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 transition hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-white sm:px-5",
                    index > 0 ? "border-t border-white/10" : "",
                  )}
                >
                  <span className="grid size-11 place-items-center rounded border border-white/10 bg-black/30 text-emerald-300 transition group-hover:border-emerald-300/40">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-semibold text-white">{link.label}</span>
                    <span className="mt-1 block break-all text-sm text-neutral-500">{link.value}</span>
                  </span>
                  <span className="inline-grid size-10 place-items-center rounded border border-white/10 bg-black/30 text-neutral-200 transition group-hover:border-white/30 group-hover:text-white">
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function DonationSection() {
  const { language } = useLanguage();
  const t = ui[language];

  return (
    <section id="donation" className="border-t border-white/10 bg-[#050505]">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Donation
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-white sm:text-6xl">
              {t.donationTitle}
            </h2>
            <p className="mt-5 text-lg leading-8 text-neutral-400">{t.donationDescription}</p>
            <p className="mt-4 leading-8 text-neutral-500">{t.donationCulture}</p>
          </div>

          <div className="grid gap-5">
            {donationGroups.map((group) => (
              <section
                key={group.title.en}
                className="overflow-hidden rounded border border-white/10 bg-white/[0.035]"
              >
                <div className="border-b border-white/10 px-4 py-4 sm:px-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-xl font-semibold text-white">{group.title[language]}</h3>
                    <span className="rounded border border-white/10 bg-black/30 px-2.5 py-1 text-xs font-semibold text-neutral-400">
                      {group.items.length}
                    </span>
                  </div>
                  <p className="mt-2 max-w-3xl leading-7 text-neutral-500">
                    {group.description[language]}
                  </p>
                </div>
                <div className="divide-y divide-white/10">
                  {group.items.map((item) => (
                    <DonationRow key={`${item.name}-${item.network}`} item={item} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DonationRow({ item }: { item: DonationItem }) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const Icon = item.icon;
  const labels = copyLabels[language];
  const t = ui[language];
  const isMailLink = item.href?.startsWith("mailto:") ?? false;

  const displayValue = useMemo(() => {
    const normalizedValue = item.value.replace(/^https?:\/\//, "").replace(/\/$/, "");

    if (normalizedValue.length <= 46) {
      return normalizedValue;
    }

    return `${normalizedValue.slice(0, 18)}...${normalizedValue.slice(-14)}`;
  }, [item.value]);

  async function copyValue() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(item.value);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = item.value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <article className="grid gap-5 px-4 py-5 transition hover:bg-white/[0.04] sm:px-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)_auto] lg:items-center">
      <div className="flex min-w-0 gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded border border-white/10 bg-black/30 text-emerald-300">
          <Icon size={20} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-white">{item.name}</h3>
          {item.note ? (
            <p className="mt-2 text-sm leading-6 text-amber-200/90">{item.note[language]}</p>
          ) : null}
        </div>
      </div>

      <dl className="grid min-w-0 gap-3 text-sm sm:grid-cols-2">
        <div className="min-w-0">
          <dt className="text-xs text-neutral-500">{t.networkLabel}</dt>
          <dd className="mt-1 font-medium text-neutral-200">{item.network}</dd>
        </div>
        <div className="min-w-0">
          <dt className="text-xs text-neutral-500">{t.minimumLabel}</dt>
          <dd className="mt-1 font-medium text-neutral-200">{item.minimum}</dd>
        </div>
        <div className="min-w-0 sm:col-span-2">
          <dt className="text-xs text-neutral-500">{t.addressLabel}</dt>
          <dd className="mt-1 break-all font-mono text-xs leading-6 text-neutral-300">{displayValue}</dd>
        </div>
      </dl>

      <div className="flex shrink-0 gap-2 lg:justify-end">
        {item.href ? (
          <a
            href={item.href}
            target={isMailLink ? undefined : "_blank"}
            rel={isMailLink ? undefined : "noreferrer"}
            className="inline-grid size-10 place-items-center rounded border border-white/10 bg-black/30 text-neutral-200 transition hover:border-white/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            aria-label={`${labels.open}: ${item.name}`}
            title={labels.open}
          >
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        ) : null}
        <button
          type="button"
          onClick={copyValue}
          className={cls(
            "inline-grid size-10 place-items-center rounded border bg-black/30 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white",
            copied
              ? "border-emerald-400/70 text-emerald-300"
              : "border-white/10 text-neutral-200 hover:border-white/30 hover:text-white",
          )}
          aria-label={`${labels.copy}: ${item.name}`}
          title={copied ? labels.copied : labels.copy}
        >
          {copied ? (
            <Check size={17} aria-hidden="true" />
          ) : (
            <Clipboard size={17} aria-hidden="true" />
          )}
        </button>
      </div>
    </article>
  );
}

export function AboutContent() {
  return <HomeContent />;
}

export function NotesContent() {
  return <HomeContent />;
}

export function ProjectsContent() {
  return <HomeContent />;
}

export function LinksContent() {
  return <HomeContent />;
}

export function SupportContent() {
  return <HomeContent />;
}
