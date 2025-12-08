# TeamFlow Backend (Node + TypeScript)

Стек: Express, Prisma (PostgreSQL), JWT auth (access + refresh в httpOnly cookie), Passport для OAuth (Google, GitHub, LinkedIn, Facebook), Zod для валидации.

## Быстрый старт

```bash
cd backend
npm install
cp .env.example .env
# пропиши DATABASE_URL, JWT_* и фронтовый origin
npm run dev
```

Сервис поднимется на `http://localhost:3001` (порт задаётся в `.env`).

## Базовые маршруты (email/пароль)

- `POST /auth/register` — `email`, `password`, `name?`
- `POST /auth/login` — `email`, `password`
- `POST /auth/refresh` — использует `refreshToken` из httpOnly cookie
- `POST /auth/logout` — чистит cookie

## Google OAuth (черновик)

- `GET /auth/google` → редирект в Google
- `GET /auth/google/callback` → выдаёт accessToken + ставит refresh cookie
- Требуются `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `OAUTH_CALLBACK_URL` (например, `http://localhost:3001/auth/google/callback`)

Ответ содержит `accessToken` и объект `user`. `refreshToken` уходит в cookie (`SameSite=Lax`, `httpOnly`).

## Структура

- `src/server.ts` — вход, создает HTTP сервер
- `src/app.ts` — middleware, CORS, маршруты
- `src/config/env.ts` — парсинг `.env` через Zod
- `src/routes/auth` — ручки регистрации/логина (OAuth будет добавлен)
- `src/lib` — Prisma, JWT, парольные хелперы
- `prisma/schema.prisma` — модель User и enum провайдеров

## TODO (ближайшее)

- Добавить OAuth стратегии (Google/GitHub/LinkedIn/Facebook) и единый callback
- Хранение/ротация refresh токенов в базе
- Защищенные маршруты и middleware для проверки access токена
- Rate limit на login/register
