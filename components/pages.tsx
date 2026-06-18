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
      fa: "برای حمایت میتونی فقط با یه پیام بهم انرزی بدی",
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
      fa: "کیف‌پول‌ها بر اساس شبکه پرداخت جدا شده‌اند. حتما شبکه و حداقل واریز را بررسی کن.",
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
    heroTitle: "Learning, building, and documenting the road",
    heroDescription: "I am Reza Mahdavi. Notes of my road is where I write my path.",
    donationButton: "Donation",
    socialButton: "Social links",
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
    heroTitle: "مسیر یادگیری، ساختن و مستندسازی",
    heroDescription: "من رضا مهدوی هستم. Notes of my road جایی است برای نوشتن مسیرم",
    donationButton: "Donation",
    socialButton: "لینک‌های من",
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
    heroTitle: "Öyrənmək, qurmaq və yolu yazmaq",
    heroDescription: "Mən Reza Mahdaviyəm. Notes of my road yolumu yazdığım yerdir.",
    donationButton: "Donation",
    socialButton: "Linklərim",
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
    <section id="home" className="relative isolate overflow-hidden border-b border-neutral-900">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/header.jpg"
          alt="Notes of my road channel header"
          fill
          priority
          className="object-cover object-center opacity-65"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#070707_0%,rgba(7,7,7,0.78)_32%,rgba(7,7,7,0.42)_60%,#070707_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-neutral-975 to-transparent" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-end gap-8 px-4 pb-10 pt-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-14">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded border border-white/10 bg-neutral-950/70 px-3 py-1.5 text-sm text-neutral-300 backdrop-blur">
            <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" />
            Notes of my road
          </div>
          <h1 className="text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
            {t.heroTitle}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-300 sm:text-xl">
            {t.heroDescription}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#donation"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-emerald-500/60 bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
            >
              {t.donationButton}
              <ChevronRight size={17} aria-hidden="true" />
            </a>
            <a
              href="#socials"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-neutral-700 bg-neutral-950/80 px-5 py-2.5 text-sm font-semibold text-neutral-100 transition hover:border-neutral-500 hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
            >
              {t.socialButton}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mx-auto w-full max-w-sm lg:justify-self-end">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-neutral-950/80 shadow-2xl shadow-black/40">
            <Image
              src="/logo.jpg"
              alt="Notes of my road logo"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 24rem, 90vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HighlightsSection() {
  const { language } = useLanguage();

  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-4 md:grid-cols-3">
        {ui[language].highlights.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="rounded-lg border border-neutral-850 bg-neutral-925 p-6 transition hover:border-neutral-700 hover:bg-neutral-900"
            >
              <span className="grid size-11 place-items-center rounded border border-neutral-800 bg-neutral-950 text-emerald-300">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-lg font-semibold text-white">{item.title}</h2>
              <p className="mt-3 leading-7 text-neutral-400">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function TerminalSection() {
  const { language } = useLanguage();
  const t = ui[language];

  return (
    <section id="terminal" className="border-y border-neutral-900 bg-neutral-950/50">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded border border-neutral-800 bg-neutral-925 px-3 py-1.5 text-sm text-neutral-400">
            <Sparkles size={15} className="text-emerald-300" aria-hidden="true" />
            {t.terminalEyebrow}
          </div>
          <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">
            {t.terminalTitle}
          </h2>
          <p className="mt-4 leading-8 text-neutral-400">{t.terminalDescription}</p>
          <p className="mt-4 text-sm text-neutral-500">{t.terminalHint}</p>
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
      className="overflow-hidden rounded-lg border border-neutral-800 bg-[#080b0c] shadow-2xl shadow-black/30"
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
    <section id="socials" className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
            Social
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">{t.socialTitle}</h2>
        </div>
        <p className="max-w-xl leading-7 text-neutral-400">{t.socialDescription}</p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {socials.map((link) => {
          const Icon = link.icon;
          const isMailLink = link.href.startsWith("mailto:");

          return (
            <a
              key={link.href}
              href={link.href}
              target={isMailLink ? undefined : "_blank"}
              rel={isMailLink ? undefined : "noreferrer"}
              className="group rounded-lg border border-neutral-850 bg-neutral-925 p-5 transition hover:border-emerald-400/50 hover:bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="grid size-11 place-items-center rounded border border-neutral-800 bg-neutral-950 text-emerald-300">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <ArrowUpRight
                  size={17}
                  className="text-neutral-600 transition group-hover:text-emerald-300"
                  aria-hidden="true"
                />
              </span>
              <h3 className="mt-5 font-semibold text-white">{link.label}</h3>
              <p className="mt-2 text-sm text-neutral-500">{link.value}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function DonationSection() {
  const { language } = useLanguage();
  const t = ui[language];

  return (
    <section id="donation" className="border-t border-neutral-900 bg-neutral-950/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Donation
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">{t.donationTitle}</h2>
            <p className="mt-4 leading-8 text-neutral-400">{t.donationDescription}</p>
            <p className="mt-4 leading-8 text-neutral-500">{t.donationCulture}</p>
          </div>

          <div className="grid gap-8">
            {donationGroups.map((group) => (
              <div key={group.title.en}>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white">{group.title[language]}</h3>
                  <p className="mt-2 leading-7 text-neutral-500">{group.description[language]}</p>
                </div>
                <div className="grid gap-4">
                  {group.items.map((item) => (
                    <DonationCard key={`${item.name}-${item.network}`} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DonationCard({ item }: { item: DonationItem }) {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const Icon = item.icon;
  const labels = copyLabels[language];
  const t = ui[language];
  const isMailLink = item.href?.startsWith("mailto:") ?? false;

  const displayValue = useMemo(() => {
    if (item.href) {
      return item.value;
    }

    if (item.value.length <= 30) {
      return item.value;
    }

    return `${item.value.slice(0, 14)}...${item.value.slice(-10)}`;
  }, [item.href, item.value]);

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
    <article className="rounded-lg border border-neutral-850 bg-neutral-925 p-5 transition hover:border-neutral-700 hover:bg-neutral-900">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded border border-neutral-800 bg-neutral-950 text-emerald-300">
            <Icon size={20} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h3 className="font-semibold text-white">{item.name}</h3>
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div className="rounded border border-neutral-800 bg-neutral-950 px-3 py-2">
                <dt className="text-neutral-500">{t.networkLabel}</dt>
                <dd className="mt-1 font-medium text-neutral-200">{item.network}</dd>
              </div>
              <div className="rounded border border-neutral-800 bg-neutral-950 px-3 py-2">
                <dt className="text-neutral-500">{t.minimumLabel}</dt>
                <dd className="mt-1 font-medium text-neutral-200">{item.minimum}</dd>
              </div>
            </dl>
            <div className="mt-3 rounded border border-neutral-800 bg-neutral-950 px-3 py-2">
              <p className="text-xs text-neutral-500">{t.addressLabel}</p>
              <p className="mt-1 break-all font-mono text-xs text-neutral-300">{displayValue}</p>
            </div>
            {item.note ? (
              <p className="mt-3 text-sm leading-7 text-amber-200/90">{item.note[language]}</p>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          {item.href ? (
            <a
              href={item.href}
              target={isMailLink ? undefined : "_blank"}
              rel={isMailLink ? undefined : "noreferrer"}
              className="inline-grid size-10 place-items-center rounded border border-neutral-800 bg-neutral-950 text-neutral-200 transition hover:border-emerald-400/50 hover:text-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
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
              "inline-grid size-10 place-items-center rounded border bg-neutral-950 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400",
              copied
                ? "border-emerald-400/70 text-emerald-300"
                : "border-neutral-800 text-neutral-200 hover:border-emerald-400/50 hover:text-emerald-300",
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
