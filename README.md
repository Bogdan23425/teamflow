# TeamFlow — task management для команд

TeamFlow — pet-проект в формате канбан-доски (аналог Trello) для управления задачами внутри команды: фриланс-команды, небольшие стартапы, учебные проекты.

## Структура

- `frontend/` — текущий фронтенд на TypeScript + React + Vite (ранее лежал в корне)
- `backend/` — Node.js + TypeScript API (Express, Prisma, JWT + OAuth)

## Запуск фронтенда

```bash
cd frontend
npm install
npm run dev
```

## Запуск бэкенда

```bash
cd backend
npm install
cp .env.example .env
# заполни DATABASE_URL, JWT_* и фронтовый origin
npm run dev
```

## Технологии фронта

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/) с кастомными дизайн-токенами через CSS-переменные
- Алиасы импортов через `@` → `src`

Планируется:
- i18n (ru/en/uk)
- Zustand / React Query для работы с данными
