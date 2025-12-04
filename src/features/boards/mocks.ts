// src/features/boards/mocks.ts
import {
  Board,
  BoardFilterId,
  BoardDetail,
} from "./types";

export const BOARD_FILTERS: { id: BoardFilterId; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "team", label: "Командные" },
  { id: "personal", label: "Личные" },
  { id: "sprint", label: "Спринты" },
  { id: "backlog", label: "Бэклог" },
];

export const MOCK_BOARDS: Board[] = [
  {
    id: "team-dev",
    name: "Команда разработки",
    description: "Фичи, баги, техдолг и инфраструктура.",
    status: "Активна",
    tasks: 32,
    type: "team",
    updatedAt: "Сегодня",
  },
  {
    id: "team-marketing",
    name: "Маркетинг",
    description: "Кампании, креативы и growth-гипотезы.",
    status: "В работе",
    tasks: 18,
    type: "team",
    updatedAt: "2 дня назад",
  },
  {
    id: "me-focus",
    name: "Мои задачи",
    description: "Личный фокус без шума и лишних контекстов.",
    status: "Фокус",
    tasks: 14,
    type: "personal",
    updatedAt: "Сегодня",
  },
  {
    id: "sprint-12",
    name: "Спринт 12",
    description: "Текущий спринт: цели, дедлайны и статусы.",
    status: "Спринт",
    tasks: 21,
    type: "sprint",
    updatedAt: "Вчера",
  },
  {
    id: "backlog-ideas",
    name: "Бэклог идей",
    description: "Идеи и гипотезы на будущее.",
    status: "Бэклог",
    tasks: 56,
    type: "backlog",
    updatedAt: "На этой неделе",
  },
  {
    id: "backlog-research",
    name: "Research / UX",
    description: "Интервью, исследования и инсайты пользователей.",
    status: "Бэклог",
    tasks: 11,
    type: "backlog",
    updatedAt: "3 дня назад",
  },
];

// Моки для детальной страницы доски /boards/:id
export const MOCK_BOARD_DETAILS: Record<string, BoardDetail> = {
  "team-dev": {
    id: "team-dev",
    name: "Команда разработки",
    description: "Рабочая доска для команды разработки продукта.",
    columns: [
      { id: "todo",        title: "To Do" },
      { id: "in_progress", title: "In Progress" },
      { id: "done",        title: "Done" },
    ],
    tasks: [
      {
        id: "dev-1",
        title: "Аутентификация",
        description: "Логин, регистрация, сброс пароля.",
        assignee: "Bogdan",
        status: "in_progress",
        updatedAt: "Сегодня",
      },
      {
        id: "dev-2",
        title: "UI-компоненты",
        description: "Кнопки, инпуты, модалки в едином стиле.",
        assignee: "Designer",
        status: "todo",
        updatedAt: "Сегодня",
      },
      {
        id: "dev-3",
        title: "Защита маршрутов",
        status: "done",
        updatedAt: "Вчера",
      },
    ],
  },

  "team-marketing": {
    id: "team-marketing",
    name: "Маркетинг",
    description: "Команда маркетинга и гипотез по росту.",
    columns: [
      { id: "todo",        title: "To Do" },
      { id: "in_progress", title: "Doing" },
      { id: "done",        title: "Done" },
    ],
    tasks: [
      {
        id: "mkt-1",
        title: "Лендинг продукта",
        status: "todo",
        updatedAt: "Сегодня",
      },
      {
        id: "mkt-2",
        title: "SEO-стратегия",
        status: "in_progress",
        updatedAt: "Сегодня",
      },
      {
        id: "mkt-3",
        title: "Аналитика трафика",
        status: "done",
        updatedAt: "Вчера",
      },
    ],
  },

  "me-focus": {
    id: "me-focus",
    name: "Мои задачи",
    description: "Персональная доска для фокуса и рутины.",
    columns: [
      { id: "todo", title: "To Do" },
      { id: "done", title: "Done" },
    ],
    tasks: [
      {
        id: "me-1",
        title: "Обновить портфолио",
        status: "todo",
        updatedAt: "Сегодня",
      },
      {
        id: "me-2",
        title: "Тренировка",
        status: "done",
        updatedAt: "Сегодня",
      },
    ],
  },
};
