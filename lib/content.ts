import {
  BookOpenText,
  Bot,
  Code2,
  DatabaseZap,
  GitBranch,
  Github,
  Globe2,
  HardDrive,
  Linkedin,
  Network,
  Radio,
  ServerCog,
  Send,
  TerminalSquare,
  Wrench,
  Youtube,
  type LucideIcon,
} from "lucide-react";

export type Language = "en" | "fa" | "az";

export type NavItem = {
  href: string;
  label: string;
};

export type Project = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type Note = {
  title: string;
  excerpt: string;
  meta: string;
  tags: string[];
};

export type SocialLink = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
};

export const languages: Record<Language, { label: string; short: string; dir: "ltr" | "rtl" }> = {
  en: {
    label: "English",
    short: "EN",
    dir: "ltr",
  },
  fa: {
    label: "فارسی",
    short: "فا",
    dir: "rtl",
  },
  az: {
    label: "Azərbaycanca",
    short: "AZ",
    dir: "ltr",
  },
};

export const navItems: Record<Language, NavItem[]> = {
  en: [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#terminal", label: "Terminal" },
    { href: "#socials", label: "Socials" },
    { href: "#donation", label: "Donation" },
  ],
  fa: [
    { href: "#home", label: "خانه" },
    { href: "#about", label: "درباره" },
    { href: "#terminal", label: "ترمینال" },
    { href: "#socials", label: "لینک‌ها" },
    { href: "#donation", label: "Donation" },
  ],
  az: [
    { href: "#home", label: "Ana səhifə" },
    { href: "#about", label: "Haqqında" },
    { href: "#terminal", label: "Terminal" },
    { href: "#socials", label: "Linklər" },
    { href: "#donation", label: "Donation" },
  ],
};

export const content = {
  en: {
    siteName: "Notes of my road",
    owner: "Reza Mahdavi",
    skipLink: "Skip to content",
    brandKicker: "Linux, network, build notes",
    built: "Made with lovely prompts for Codex 💚",
    hero: {
      title: "Notes of my road",
      subtitle: "Documenting my journey, one note at a time.",
      description:
        "A collection of notes, projects, experiments, and lessons learned throughout my journey in technology and engineering.",
      button: "Explore Notes",
      secondaryButton: "View Projects",
      status: "Learning in public",
    },
    home: {
      sectionsLabel: "What you will find",
      sections: [
        {
          title: "Notes",
          description: "Compact writing about engineering, systems, tools, and lessons learned.",
          href: "/notes",
          icon: BookOpenText,
        },
        {
          title: "Projects",
          description: "Small builds, experiments, and self-hosted systems documented as they evolve.",
          href: "/projects",
          icon: GitBranch,
        },
        {
          title: "Links",
          description: "The public channels where I share updates and connect with other builders.",
          href: "/links",
          icon: Globe2,
        },
      ],
      principlesTitle: "Working principles",
      principles: [
        "Document decisions while they are still fresh.",
        "Prefer durable tools over fashionable complexity.",
        "Build small systems, run them, and improve from evidence.",
      ],
    },
    about: {
      title: "About",
      introTitle: "Hi, I'm Reza Mahdavi.",
      paragraphs: [
        "I'm an Electrical Engineering student passionate about technology, problem solving, and continuous learning.",
        "This website serves as a public notebook where I document what I learn, build, and discover.",
      ],
      focusTitle: "Current focus",
      focus:
        "I am exploring the practical edges of Linux, networks, automation, and self-hosted services while keeping notes that can help future me and other learners.",
      skillsTitle: "Skills",
    },
    notes: {
      title: "Notes",
      description:
        "Blog-style entries from the road: technical notes, learning logs, and short reflections from engineering practice.",
      readLabel: "Read note",
    },
    projects: {
      title: "Projects",
      description:
        "Selected builds and experiments. Each card is a placeholder for a public repository or write-up as the project matures.",
      githubLabel: "GitHub",
    },
    links: {
      title: "Links",
      description: "Places where Notes of my road can be followed, watched, or contacted.",
      visitLabel: "Open link",
    },
    support: {
      title: "Donation",
      description: "If my work helps you, the donation section lists the current payment methods.",
      note:
        "Donation methods are grouped by payment type so more options can be added later.",
      buttons: ["Rial payments", "Crypto", "Send a message"],
    },
    footer: {
      copyright: "Notes of my road © 2026",
    },
  },
  fa: {
    siteName: "Notes of my road",
    owner: "رضا مهدوی",
    skipLink: "رفتن به محتوا",
    brandKicker: "لینوکس، شبکه و مسیر ساختن.",
    built: "ساخته شده با پرامپت‌های عاشقانه‌ی من برای Codex.",
    hero: {
      title: "Notes of my road",
      subtitle: "ثبت مسیر یادگیری، یک یادداشت در هر قدم.",
      description:
        "مجموعه‌ای از یادداشت‌ها، پروژه‌ها، تجربه‌ها و آموخته‌های من در مسیر یادگیری فناوری و مهندسی.",
      button: "مشاهده یادداشت‌ها",
      secondaryButton: "دیدن پروژه‌ها",
      status: "یادگیری در فضای عمومی",
    },
    home: {
      sectionsLabel: "در اینجا چه می‌بینید",
      sections: [
        {
          title: "یادداشت‌ها",
          description: "نوشته‌های کوتاه درباره مهندسی، سیستم‌ها، ابزارها و آموخته‌های مسیر.",
          href: "/notes",
          icon: BookOpenText,
        },
        {
          title: "پروژه‌ها",
          description: "ساخته‌ها، تجربه‌ها و سرویس‌های شخصی که همراه با رشدشان مستند می‌شوند.",
          href: "/projects",
          icon: GitBranch,
        },
        {
          title: "لینک‌ها",
          description: "کانال‌هایی که در آن‌ها به‌روزرسانی‌ها را منتشر می‌کنم و با دیگران در ارتباطم.",
          href: "/links",
          icon: Globe2,
        },
      ],
      principlesTitle: "اصول کاری",
      principles: [
        "تصمیم‌ها را وقتی هنوز تازه‌اند ثبت کن.",
        "ابزارهای پایدار را به پیچیدگی‌های مد روز ترجیح بده.",
        "سیستم‌های کوچک بساز، اجرا کن و بر پایه شواهد بهترشان کن.",
      ],
    },
    about: {
      title: "درباره",
      introTitle: "سلام، من رضا مهدوی هستم.",
      paragraphs: [
        "دانشجوی مهندسی برق و علاقه‌مند به فناوری، حل مسئله و یادگیری مستمر.",
        "این وب‌سایت دفترچه‌ای عمومی برای ثبت آموخته‌ها، پروژه‌ها و تجربیات من است.",
      ],
      focusTitle: "تمرکز فعلی",
      focus:
        "در حال یادگیری جنبه‌های کاربردی لینوکس، شبکه، اتوماسیون و سرویس‌های شخصی هستم و تلاش می‌کنم یادداشت‌هایی بنویسم که برای آینده خودم و دیگر یادگیرنده‌ها مفید باشد.",
      skillsTitle: "مهارت‌ها",
    },
    notes: {
      title: "یادداشت‌ها",
      description:
        "نوشته‌هایی از مسیر: نکته‌های فنی، گزارش‌های یادگیری و برداشت‌های کوتاه از تجربه مهندسی.",
      readLabel: "خواندن یادداشت",
    },
    projects: {
      title: "پروژه‌ها",
      description:
        "نمونه‌هایی از ساخته‌ها و تجربه‌ها. هر کارت جایگاهی برای مخزن عمومی یا گزارش کامل پروژه است.",
      githubLabel: "گیت‌هاب",
    },
    links: {
      title: "لینک‌ها",
      description: "جاهایی برای دنبال کردن، دیدن یا ارتباط با Notes of my road.",
      visitLabel: "باز کردن لینک",
    },
    support: {
      title: "Donation",
      description: "اگر این مسیر برای شما مفید است، بخش Donation روش‌های فعلی پرداخت را نشان می‌دهد.",
      note:
        "روش‌های Donation بر اساس نوع پرداخت جدا شده‌اند تا بعدا روش‌های بیشتری اضافه شوند.",
      buttons: ["پرداخت ریالی", "Crypto", "ارسال پیام"],
    },
    footer: {
      copyright: "Notes of my road © 2026",
    },
  },
  az: {
    siteName: "Notes of my road",
    owner: "Reza Mahdavi",
    skipLink: "Məzmuna keç",
    brandKicker: "Linux, network və qurmaq yolu",
    built: "Codex üçün sevgi dolu promptlarımla hazırlanıb 💚",
    hero: {
      title: "Notes of my road",
      subtitle: "Yolumu addım-addım yazıram.",
      description:
        "Texnologiya və mühəndislik yolumda qeydlər, təcrübələr və öyrəndiklərim üçün şəxsi ev.",
      button: "Qeydlərə bax",
      secondaryButton: "Project-lərə bax",
      status: "Public learning",
    },
    home: {
      sectionsLabel: "Burada nə var",
      sections: [
        {
          title: "Qeydlər",
          description: "Engineering, systems, tools və yolun öyrətdikləri haqqında qısa yazılar.",
          href: "/notes",
          icon: BookOpenText,
        },
        {
          title: "Projects",
          description: "Kiçik build-lər, təcrübələr və böyüdükcə sənədləşən self-hosted sistemlər.",
          href: "/projects",
          icon: GitBranch,
        },
        {
          title: "Linklər",
          description: "Yenilikləri paylaşdığım və başqa builder-lərlə əlaqə saxladığım kanallar.",
          href: "/links",
          icon: Globe2,
        },
      ],
      principlesTitle: "İş prinsipləri",
      principles: [
        "Qərarları hələ təzəykən sənədləşdir.",
        "Dəbli mürəkkəblik yerinə davamlı tools seç.",
        "Kiçik sistemlər qur, işlət və sübutlarla yaxşılaşdır.",
      ],
    },
    about: {
      title: "Haqqında",
      introTitle: "Salam, mən Reza Mahdaviyəm.",
      paragraphs: [
        "Elektrik mühəndisliyi tələbəsiyəm; technology, problem solving və davamlı öyrənməyə maraqlıyam.",
        "Bu sayt öyrəndiklərimi, qurduqlarımı və kəşf etdiklərimi yazdığım public notebook-dur.",
      ],
      focusTitle: "İndiki fokus",
      focus:
        "Linux, networks, automation və self-hosted services-in praktiki tərəflərini öyrənirəm və gələcək özümə, başqa öyrənənlərə faydalı qeydlər saxlayıram.",
      skillsTitle: "Bacarıqlar",
    },
    notes: {
      title: "Qeydlər",
      description:
        "Yoldan blog-style yazılar: technical notes, learning logs və engineering təcrübəsindən qısa düşüncələr.",
      readLabel: "Qeydi oxu",
    },
    projects: {
      title: "Projects",
      description:
        "Seçilmiş build və təcrübələr. Hər card project böyüdükcə public repo və ya yazı üçün yerdir.",
      githubLabel: "GitHub",
    },
    links: {
      title: "Linklər",
      description: "Notes of my road-u izləmək, baxmaq və əlaqə saxlamaq üçün yerlər.",
      visitLabel: "Linki aç",
    },
    support: {
      title: "Donation",
      description: "Bu yol sənə faydalıdırsa, Donation bölməsi indiki payment methods-u göstərir.",
      note: "Donation methods payment type üzrə ayrılıb ki, sonra yeni üsullar əlavə olunsun.",
      buttons: ["Rial payments", "Crypto", "Message göndər"],
    },
    footer: {
      copyright: "Notes of my road © 2026",
    },
  },
} as const;

export const skills = [
  { label: "Linux", icon: TerminalSquare },
  { label: "Networking", icon: Network },
  { label: "DevOps", icon: ServerCog },
  { label: "Open Source", icon: Code2 },
  { label: "Self Hosting", icon: HardDrive },
  { label: "Automation", icon: Bot },
];

export const projects: Record<Language, Project[]> = {
  en: [
    {
      title: "Homelab Notes",
      description:
        "A practical log for setting up Linux services, backups, monitoring, and clean recovery plans.",
      href: "https://github.com/notesofmyroad/homelab-notes",
      icon: ServerCog,
    },
    {
      title: "Network Lab",
      description:
        "Packet-level experiments, routing notes, and small diagrams for understanding real networks.",
      href: "https://github.com/notesofmyroad/network-lab",
      icon: Radio,
    },
    {
      title: "Automation Scripts",
      description:
        "Small shell and TypeScript utilities for repetitive setup, checks, and local workflows.",
      href: "https://github.com/notesofmyroad/automation-scripts",
      icon: Wrench,
    },
    {
      title: "Learning Archive",
      description:
        "A structured archive for courses, technical notes, summaries, and project references.",
      href: "https://github.com/notesofmyroad/learning-archive",
      icon: DatabaseZap,
    },
  ],
  fa: [
    {
      title: "یادداشت‌های هوم‌لب",
      description:
        "گزارشی کاربردی برای راه‌اندازی سرویس‌های لینوکسی، پشتیبان‌گیری، مانیتورینگ و بازیابی تمیز.",
      href: "https://github.com/notesofmyroad/homelab-notes",
      icon: ServerCog,
    },
    {
      title: "آزمایشگاه شبکه",
      description:
        "تجربه‌های بسته‌محور، نکته‌های مسیریابی و دیاگرام‌های کوچک برای فهم بهتر شبکه‌های واقعی.",
      href: "https://github.com/notesofmyroad/network-lab",
      icon: Radio,
    },
    {
      title: "اسکریپت‌های اتوماسیون",
      description:
        "ابزارهای کوچک شل و تایپ‌اسکریپت برای کارهای تکراری، بررسی‌ها و روندهای محلی.",
      href: "https://github.com/notesofmyroad/automation-scripts",
      icon: Wrench,
    },
    {
      title: "آرشیو یادگیری",
      description:
        "آرشیوی ساختارمند برای دوره‌ها، یادداشت‌های فنی، خلاصه‌ها و منابع پروژه‌ها.",
      href: "https://github.com/notesofmyroad/learning-archive",
      icon: DatabaseZap,
    },
  ],
  az: [
    {
      title: "Homelab Notes",
      description:
        "Linux services, backups, monitoring və təmiz recovery planları üçün praktiki log.",
      href: "https://github.com/notesofmyroad/homelab-notes",
      icon: ServerCog,
    },
    {
      title: "Network Lab",
      description:
        "Real network-ləri daha yaxşı anlamaq üçün packet-level təcrübələr, routing notes və kiçik diagramlar.",
      href: "https://github.com/notesofmyroad/network-lab",
      icon: Radio,
    },
    {
      title: "Automation Scripts",
      description:
        "Təkrarlanan setup, checks və local workflows üçün kiçik shell və TypeScript utilities.",
      href: "https://github.com/notesofmyroad/automation-scripts",
      icon: Wrench,
    },
    {
      title: "Learning Archive",
      description:
        "Courses, technical notes, summaries və project references üçün structured archive.",
      href: "https://github.com/notesofmyroad/learning-archive",
      icon: DatabaseZap,
    },
  ],
};

export const notes: Record<Language, Note[]> = {
  en: [
    {
      title: "Why I keep engineering notes",
      excerpt:
        "A short reflection on turning scattered learning into a public notebook that compounds over time.",
      meta: "Learning log · 4 min read",
      tags: ["Learning", "Writing"],
    },
    {
      title: "A minimal Linux setup checklist",
      excerpt:
        "Packages, dotfiles, backup habits, and small defaults that make a fresh system easier to trust.",
      meta: "Linux · 6 min read",
      tags: ["Linux", "Setup"],
    },
    {
      title: "Networking concepts I revisit often",
      excerpt:
        "A compact map of IP addressing, DNS, ports, routing, and the debugging commands worth memorizing.",
      meta: "Networking · 7 min read",
      tags: ["Networking", "Debugging"],
    },
    {
      title: "Lessons from running small services",
      excerpt:
        "What self-hosting teaches about logs, updates, recovery, and writing down the boring details.",
      meta: "Self hosting · 5 min read",
      tags: ["Self Hosting", "Ops"],
    },
  ],
  fa: [
    {
      title: "چرا یادداشت‌های مهندسی می‌نویسم",
      excerpt:
        "نگاهی کوتاه به تبدیل یادگیری پراکنده به دفترچه‌ای عمومی که در طول زمان ارزشمندتر می‌شود.",
      meta: "گزارش یادگیری · ۴ دقیقه",
      tags: ["یادگیری", "نوشتن"],
    },
    {
      title: "چک‌لیست مینیمال برای راه‌اندازی لینوکس",
      excerpt:
        "پکیج‌ها، دات‌فایل‌ها، عادت‌های پشتیبان‌گیری و تنظیمات کوچکی که اعتماد به سیستم تازه را بیشتر می‌کنند.",
      meta: "لینوکس · ۶ دقیقه",
      tags: ["لینوکس", "راه‌اندازی"],
    },
    {
      title: "مفاهیم شبکه که زیاد به آن‌ها برمی‌گردم",
      excerpt:
        "نقشه‌ای خلاصه از آدرس‌دهی IP، DNS، پورت‌ها، مسیریابی و دستورهای مهم برای عیب‌یابی.",
      meta: "شبکه · ۷ دقیقه",
      tags: ["شبکه", "عیب‌یابی"],
    },
    {
      title: "درس‌هایی از اجرای سرویس‌های کوچک",
      excerpt:
        "سلف‌هاستینگ درباره لاگ‌ها، به‌روزرسانی، بازیابی و ثبت جزئیات ساده اما مهم چه چیزهایی یاد می‌دهد.",
      meta: "سلف‌هاستینگ · ۵ دقیقه",
      tags: ["سلف‌هاستینگ", "عملیات"],
    },
  ],
  az: [
    {
      title: "Niyə engineering notes yazıram",
      excerpt:
        "Dağınıq öyrənməni zamanla dəyər qazanan public notebook-a çevirmək haqqında qısa düşüncə.",
      meta: "Learning log · 4 dəq",
      tags: ["Learning", "Writing"],
    },
    {
      title: "Minimal Linux setup checklist",
      excerpt:
        "Fresh system-ə daha rahat güvənmək üçün packages, dotfiles, backup habits və kiçik defaults.",
      meta: "Linux · 6 dəq",
      tags: ["Linux", "Setup"],
    },
    {
      title: "Tez-tez qayıtdığım networking concepts",
      excerpt:
        "IP addressing, DNS, ports, routing və yadda saxlamağa dəyər debugging commands üçün compact map.",
      meta: "Networking · 7 dəq",
      tags: ["Networking", "Debugging"],
    },
    {
      title: "Kiçik services işlətməkdən dərslər",
      excerpt:
        "Self-hosting logs, updates, recovery və boring details yazmaq haqqında nə öyrədir.",
      meta: "Self hosting · 5 dəq",
      tags: ["Self Hosting", "Ops"],
    },
  ],
};

export const socialLinks: Record<Language, SocialLink[]> = {
  en: [
    {
      label: "GitHub",
      value: "github.com/notesofmyroad",
      href: "https://github.com/notesofmyroad",
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
      value: "Notes of my road",
      href: "https://youtube.com/@notesofmyroad",
      icon: Youtube,
    },
    {
      label: "LinkedIn",
      value: "Reza Mahdavi",
      href: "https://linkedin.com/in/rezamahdavi",
      icon: Linkedin,
    },
  ],
  fa: [
    {
      label: "گیت‌هاب",
      value: "github.com/notesofmyroad",
      href: "https://github.com/notesofmyroad",
      icon: Github,
    },
    {
      label: "تلگرام",
      value: "@notesofmyroad",
      href: "https://t.me/notesofmyroad",
      icon: Send,
    },
    {
      label: "یوتیوب",
      value: "Notes of my road",
      href: "https://youtube.com/@notesofmyroad",
      icon: Youtube,
    },
    {
      label: "لینکدین",
      value: "Reza Mahdavi",
      href: "https://linkedin.com/in/rezamahdavi",
      icon: Linkedin,
    },
  ],
  az: [
    {
      label: "GitHub",
      value: "github.com/notesofmyroad",
      href: "https://github.com/notesofmyroad",
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
      value: "Notes of my road",
      href: "https://youtube.com/@notesofmyroad",
      icon: Youtube,
    },
    {
      label: "LinkedIn",
      value: "Reza Mahdavi",
      href: "https://linkedin.com/in/rezamahdavi",
      icon: Linkedin,
    },
  ],
};

export const pageIntros = {
  home: {
    title: "Notes of my road",
    description:
      "The official single-page home for Notes of my road by Reza Mahdavi: social links, terminal-inspired learning, and donation options.",
  },
  about: {
    title: "About Reza Mahdavi",
    description:
      "Learn about Reza Mahdavi, an Electrical Engineering student documenting technology, engineering, and continuous learning.",
  },
  notes: {
    title: "Notes",
    description:
      "Technical notes, learning logs, experiments, and reflections from Notes of my road.",
  },
  projects: {
    title: "Projects",
    description:
      "Projects, experiments, and open source work by Reza Mahdavi and Notes of my road.",
  },
  links: {
    title: "Links",
    description:
      "Social links for Notes of my road including GitHub, Telegram, YouTube, and LinkedIn.",
  },
  support: {
    title: "Donation",
    description:
      "Donation options for Notes of my road by Reza Mahdavi, including Rial payments and crypto networks.",
  },
};

export const siteUrl = "https://notesofmyroad.com";

export const cls = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");
