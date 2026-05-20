/** Контент раздела «Путь политеховца» — механики удержания абитуриента */

/** Игры из «Сопровождение и удержание» (блок игровых механик) */
export const GAMES = [
  {
    id: "team",
    title: "Команда мечты",
    description:
      "Собирай карточки лидеров, укомплектуй модуль по пирамиде грейдов и получай импульсы каждый день. Влияй на рейтинг игрока и направления.",
  },
  {
    id: "fifteen",
    title: "Пятнашки",
    description:
      "Memory 4×4: ищи пары карточек лидеров. +1 импульс за пару, 3 жизни, 1 игра в день. 7 дней подряд — лидер-пак.",
  },
] as const;

export interface TournamentItem {
  id: string;
  name: string;
  date: string;
  participants: string;
  prizes: string;
}

export const TOURNAMENTS: TournamentItem[] = [
  {
    id: "1",
    name: "Кибертурнир ALABUGA POLYTECH CUP",
    date: "13.02.2024",
    participants: "128 участников",
    prizes: "Импульсы, мерч, приглашение на День открытых дверей",
  },
  {
    id: "2",
    name: "Олимпиада «Формула будущего»",
    date: "22.03.2024",
    participants: "64 участника",
    prizes: "Грантовые баллы, сувениры",
  },
  {
    id: "3",
    name: "Хакатон промышленной робототехники",
    date: "05.04.2024",
    participants: "40 команд",
    prizes: "Стажировка, импульсы",
  },
];

export type WeekdayStatus = "missed" | "done" | "today" | "upcoming";

export interface WeekdayItem {
  id: string;
  label: string;
  status: WeekdayStatus;
}

export const WEEK_STREAK: WeekdayItem[] = [
  { id: "mon", label: "Пн", status: "missed" },
  { id: "tue", label: "Вт", status: "missed" },
  { id: "wed", label: "Ср", status: "done" },
  { id: "thu", label: "Чт", status: "today" },
  { id: "fri", label: "Пт", status: "upcoming" },
  { id: "sat", label: "Сб", status: "upcoming" },
  { id: "sun", label: "Вс", status: "upcoming" },
];

export const DAILY_TASKS = [
  {
    id: "1",
    title: "Пройти проф-тест",
    coins: 2000,
    energy: 20,
  },
  {
    id: "2",
    title: "Зайти на платформу 7 дней подряд",
    coins: 1500,
    energy: 15,
  },
  {
    id: "3",
    title: "Пригласить друга по реферальной ссылке",
    coins: 500,
    energy: 50,
  },
] as const;

export const LEADERBOARD = [
  { id: "1", name: "Игрок", rank: 1 },
  { id: "2", name: "Игрок", rank: 1 },
  { id: "3", name: "Игрок", rank: 1 },
  { id: "4", name: "Игрок", rank: 1 },
  { id: "5", name: "Игрок", rank: 1 },
] as const;

export const USER_LEADERBOARD_RANK = 1099;
