export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  reward: number;
  icon: "trophy" | "game" | "story" | "task" | "friend";
}

export const DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: "prof-test",
    title: "Пройти проф-тест",
    description: "Заверши профориентацию на платформе",
    current: 1,
    target: 1,
    reward: 2000,
    icon: "trophy",
  },
  {
    id: "dream-team",
    title: "Собрать лидера в модуль",
    description: "Добавь лидера в модуль «Команда мечты»",
    current: 0,
    target: 1,
    reward: 500,
    icon: "game",
  },
  {
    id: "stories",
    title: "Посмотреть сторис",
    description: "Открой 3 сторис на главной",
    current: 2,
    target: 3,
    reward: 300,
    icon: "story",
  },
  {
    id: "platform-task",
    title: "Задание на платформе",
    description: "Выполни любое задание из раздела удержания",
    current: 0,
    target: 1,
    reward: 400,
    icon: "task",
  },
  {
    id: "referral",
    title: "Пригласить друга",
    description: "Друг прошёл демо-версию по твоей ссылке",
    current: 0,
    target: 1,
    reward: 500,
    icon: "friend",
  },
];
