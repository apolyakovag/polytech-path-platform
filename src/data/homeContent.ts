export type DirectionTrack = "all" | "tech" | "human";

export interface StoryItem {
  id: string;
  label?: string;
  image?: string;
  accent: string;
}

export interface DirectionItem {
  id: string;
  track: Exclude<DirectionTrack, "all">;
  tag: string;
  title: string;
  description: string;
  image?: string;
  accent: string;
}

export interface EventItem {
  id: string;
  title: string;
  tags: string[];
  accent: string;
}

export interface NewsItem {
  id: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  featured?: boolean;
  accent: string;
}

export interface ArticleItem {
  id: string;
  category: "all" | "media" | "theory";
  title: string;
  excerpt: string;
  date: string;
  accent: string;
}

export const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "resume", label: "Резюме" },
  { id: "docs", label: "Документы" },
  { id: "about", label: "Про алабугу" },
  { id: "path", label: "Путь политеховца" },
  { id: "courses", label: "Курсы и стажировки" },
] as const;

export type NavItemId = (typeof NAV_ITEMS)[number]["id"];

export const STORIES: StoryItem[] = [
  { id: "1", accent: "linear-gradient(135deg, #2563eb, #1e3a8a)" },
  { id: "2", accent: "linear-gradient(135deg, #059669, #047857)" },
  { id: "3", accent: "linear-gradient(135deg, #7c3aed, #5b21b6)" },
  { id: "4", accent: "linear-gradient(135deg, #ea580c, #c2410c)" },
  { id: "5", accent: "linear-gradient(135deg, #0891b2, #0e7490)" },
  { id: "6", accent: "linear-gradient(135deg, #db2777, #be185d)" },
  { id: "7", accent: "linear-gradient(135deg, #4f46e5, #3730a3)" },
  { id: "8", accent: "linear-gradient(135deg, #16a34a, #15803d)" },
  { id: "9", accent: "linear-gradient(135deg, #ca8a04, #a16207)" },
  { id: "10", label: "Лидеры", accent: "linear-gradient(135deg, #1d4ed8, #1e40af)" },
];

export const DIRECTION_TRACKS: { id: DirectionTrack; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "tech", label: "Техн." },
  { id: "human", label: "Гуман." },
];

export const DIRECTIONS: DirectionItem[] = [
  {
    id: "biz",
    track: "human",
    tag: "Среднее техническое",
    title: "Бизнес-информатика на платформе 1С",
    description:
      "Освойте автоматизацию бизнес-процессов и учёт на платформе 1С — востребованное направление для карьеры в IT и экономике.",
    accent: "linear-gradient(180deg, #1e3a5f 0%, #0f172a 100%)",
  },
  {
    id: "web",
    track: "tech",
    tag: "Среднее техническое",
    title: "WEB-программирование",
    description:
      "Создавайте современные сайты и веб-приложения: от вёрстки до backend-разработки и работы с базами данных.",
    accent: "linear-gradient(180deg, #1e40af 0%, #0f172a 100%)",
  },
  {
    id: "robot",
    track: "tech",
    tag: "Среднее техническое",
    title: "Промышленная робототехника",
    description:
      "Проектируйте и программируйте роботизированные системы для современного производства.",
    accent: "linear-gradient(180deg, #7c2d12 0%, #0f172a 100%)",
  },
  {
    id: "med",
    track: "human",
    tag: "Среднее техническое",
    title: "Лечебное дело и медицинская техника",
    description:
      "Подготовка специалистов для здравоохранения с практикой на современном оборудовании.",
    accent: "linear-gradient(180deg, #831843 0%, #0f172a 100%)",
  },
];

export const EVENTS: EventItem[] = [
  {
    id: "olympiad",
    title: "Олимпиада «Формула будущего»",
    tags: ["Олимпиада", "Онлайн"],
    accent: "linear-gradient(180deg, #1e3a8a 0%, #0f172a 70%)",
  },
  {
    id: "open-day",
    title: "День открытых дверей",
    tags: ["Офлайн", "Алабуга"],
    accent: "linear-gradient(180deg, #047857 0%, #0f172a 70%)",
  },
  {
    id: "cs2",
    title: "Кибертурнир по CS 2",
    tags: ["Турнир", "Онлайн"],
    accent: "linear-gradient(180deg, #5b21b6 0%, #0f172a 70%)",
  },
  {
    id: "grant",
    title: "Грантовый этап",
    tags: ["Очный", "Региональный"],
    accent: "linear-gradient(180deg, #b45309 0%, #0f172a 70%)",
  },
];

export const NEWS: NewsItem[] = [
  {
    id: "featured",
    date: "12.05.2026",
    category: "События",
    title: "Студенты Алабуга Политех — победители регионального этапа",
    excerpt:
      "Команда колледжа показала лучший результат среди участников СПО региона.",
    featured: true,
    accent: "linear-gradient(180deg, #334155 0%, #0f172a 100%)",
  },
  {
    id: "n1",
    date: "10.05.2026",
    category: "Мероприятия",
    title: "Старт регистрации на олимпиаду «Формула будущего»",
    excerpt: "Приём заявок открыт до 1 июня.",
    accent: "#111827",
  },
  {
    id: "n2",
    date: "08.05.2026",
    category: "Обучение",
    title: "Новый курс по WEB-программированию",
    excerpt: "Доступен бесплатный вводный модуль для абитуриентов.",
    accent: "#111827",
  },
  {
    id: "n3",
    date: "05.05.2026",
    category: "Киберспорт",
    title: "ALABUGA POLYTECH CUP CS2: анонс финала",
    excerpt: "Прямая трансляция 13 февраля.",
    accent: "#111827",
  },
];

export const ARTICLE_FILTERS = [
  { id: "all" as const, label: "Все" },
  { id: "media" as const, label: "Медиа" },
  { id: "theory" as const, label: "Теория" },
];

export const ARTICLES: ArticleItem[] = [
  {
    id: "a1",
    category: "media",
    title:
      "Команда колледжа студентов «Алабуга Политех» приняла участие в хакатоне",
    excerpt: "Студенты представили проект по автоматизации производства.",
    date: "11.05.2026",
    accent: "linear-gradient(180deg, #374151 0%, #111827 100%)",
  },
  {
    id: "a2",
    category: "theory",
    title: "Лаборатория химического анализа открыла новый учебный сезон",
    excerpt: "Практические занятия проходят на современном оборудовании.",
    date: "09.05.2026",
    accent: "linear-gradient(180deg, #9d174d 0%, #111827 100%)",
  },
  {
    id: "a3",
    category: "media",
    title: "Бизнес-кейс на платформе 1С: итоги весеннего потока",
    excerpt: "Участники решали задачи реального предприятия.",
    date: "07.05.2026",
    accent: "linear-gradient(180deg, #065f46 0%, #111827 100%)",
  },
  {
    id: "a4",
    category: "theory",
    title: "FPV и БПЛА: мастер-класс для абитуриентов",
    excerpt: "Знакомство с направлением операторов беспилотников.",
    date: "04.05.2026",
    accent: "linear-gradient(180deg, #4c1d95 0%, #111827 100%)",
  },
  {
    id: "a5",
    category: "media",
    title: "Биотехнологии: визит на производственную площадку",
    excerpt: "Экскурсия для будущих специалистов медицинского профиля.",
    date: "02.05.2026",
    accent: "linear-gradient(180deg, #be123c 0%, #111827 100%)",
  },
  {
    id: "a6",
    category: "theory",
    title: "Экономика и управление: старт учебного модуля",
    excerpt: "Первые занятия по проектному менеджменту.",
    date: "30.04.2026",
    accent: "linear-gradient(180deg, #78350f 0%, #111827 100%)",
  },
  {
    id: "a7",
    category: "media",
    title: "День открытых дверей: фотоотчёт",
    excerpt: "Более 500 абитуриентов посетили кампус.",
    date: "28.04.2026",
    accent: "linear-gradient(180deg, #1e40af 0%, #111827 100%)",
  },
  {
    id: "a8",
    category: "theory",
    title: "Промышленная безопасность: лекция эксперта",
    excerpt: "Встреча с инженером производственной площадки.",
    date: "25.04.2026",
    accent: "linear-gradient(180deg, #713f12 0%, #111827 100%)",
  },
  {
    id: "a9",
    category: "media",
    title: "Кибертурнир CS2: итоги отборочного этапа",
    excerpt: "Определились финалисты турнира.",
    date: "22.04.2026",
    accent: "linear-gradient(180deg, #6d28d9 0%, #111827 100%)",
  },
];

/** Дата прямого эфира из макета */
export const STREAM_TARGET = new Date("2026-02-13T18:00:00+03:00");
