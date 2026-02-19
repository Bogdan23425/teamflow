# TeamFlow — вакансии и найм

TeamFlow — pet-проект в формате job platform: публикация вакансий, отклики кандидатов и кабинет работодателя.

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
