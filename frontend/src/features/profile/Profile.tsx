import React from "react";
import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiCalendar,
  FiClock,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSlack,
  FiStar,
  FiUser,
} from "react-icons/fi";
import { Input } from "@/shared/ui/Input";
import { Checkbox } from "@/shared/ui/Checkbox";

const quickStats = [
  {
    id: "tasks",
    label: "Закрытых задач",
    value: "128",
    hint: "+12% к прошлому месяцу",
  },
  {
    id: "boards",
    label: "Активных досок",
    value: "7",
    hint: "Командные и личные",
  },
  {
    id: "focus",
    label: "Фокус-слоты",
    value: "14 ч/нед",
    hint: "Без митингов",
  },
  {
    id: "rating",
    label: "Оценка команды",
    value: "4.8",
    hint: "По результатам ретро",
  },
];

const focusAreas = [
  { id: "discovery", title: "Discovery", description: "Интервью, гипотезы, приоритеты" },
  { id: "delivery", title: "Delivery", description: "Трекинг задач, синки, риск-менеджмент" },
  { id: "quality", title: "Качество", description: "UX ревью, приёмка, метрики" },
];

const activity = [
  { id: "a1", title: "Апдейт дорожной карты", detail: "Согласована версия Q2", time: "Сегодня, 10:15" },
  { id: "a2", title: "Обратная связь по дизайну", detail: "Экран оплаты", time: "Вчера, 18:40" },
  { id: "a3", title: "Встреча с командой", detail: "План спринта", time: "Пн, 12:00" },
];

export const Profile: React.FC = () => {
  return (
    <main className="flex-1">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-6 md:gap-8">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          <div className="relative col-span-1 lg:col-span-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-soft p-5 md:p-6">
            <div className="aura" />
            <div className="relative flex flex-col gap-5 md:flex-row md:items-center">
              <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-3xl bg-primary-soft flex items-center justify-center text-2xl font-semibold text-text shadow-soft">
                Б
                <span className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-success border border-card" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-text">
                    Богдан Филиппов
                  </h1>
                  <span className="inline-flex items-center gap-1 rounded-full bg-bg px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-text-muted border border-border">
                    Product Lead
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/12 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-success border border-success/30">
                    Онлайн
                  </span>
                </div>
                <p className="text-sm text-text-muted max-w-2xl">
                  Помогаю команде двигаться к целям без лишних митингов: собираю фокус-сессии, задаю
                  прозрачные ожидания и быстро снимаю блокеры.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Discovery", "Delivery", "UX-ревью", "Метрики"].map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-bg px-2.5 py-1 text-[11px] text-text-muted border border-border"
                    >
                      <FiCheckCircle className="h-3.5 w-3.5" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-3.5 py-2 text-xs font-medium text-white shadow-soft active:scale-[0.97] transition-transform duration-150"
                >
                  <FiSlack className="h-4 w-4" />
                  Написать в Slack
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs text-text-muted hover:text-text hover:bg-bg transition-colors duration-150"
                >
                  <FiCalendar className="h-4 w-4" />
                  Забронировать слот
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface shadow-soft p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-text-muted">
                  Фокус недели
                </p>
                <h2 className="text-sm font-semibold text-text">Коммуникация команды</h2>
              </div>
              <span className="h-9 w-9 rounded-xl bg-bg flex items-center justify-center text-primary">
                <FiStar className="h-4 w-4" />
              </span>
            </div>
            <div className="space-y-3">
              {focusAreas.map((area) => (
                <div
                  key={area.id}
                  className="rounded-xl bg-surface-variant border border-border px-3 py-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-text">{area.title}</span>
                    <span className="inline-flex h-6 items-center rounded-full bg-bg px-2 text-[10px] uppercase tracking-[0.12em] text-text-muted">
                      В работе
                    </span>
                  </div>
                  <p className="text-xs text-text-muted mt-1">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
        >
          <div className="col-span-1 lg:col-span-2 rounded-2xl border border-border bg-surface shadow-soft p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text">Контакты и профиль</h3>
              <span className="text-[11px] text-text-muted">Основное</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <Input label="Полное имя" defaultValue="Богдан Филиппов" />
              <Input label="Роль" defaultValue="Product Lead" />
              <Input
                label="Рабочая почта"
                type="email"
                defaultValue="bogdan@teamflow.space"
                leftIcon={<FiMail className="h-4 w-4 text-text-muted" />}
              />
              <Input
                label="Телефон"
                defaultValue="+7 999 000 00 00"
                leftIcon={<FiPhone className="h-4 w-4 text-text-muted" />}
              />
              <Input
                label="Локация"
                defaultValue="Санкт-Петербург · GMT+3"
                leftIcon={<FiMapPin className="h-4 w-4 text-text-muted" />}
              />
              <Input
                label="Аккаунт для синков"
                defaultValue="@bogdan"
                leftIcon={<FiSlack className="h-4 w-4 text-text-muted" />}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-surface-variant border border-border px-4 py-3 space-y-2">
                <p className="text-xs font-medium text-text">Доступность</p>
                <div className="flex items-center gap-2 text-[11px] text-text-muted">
                  <FiClock className="h-4 w-4" />
                  10:00–18:00, вторник–пятница
                </div>
                <div className="flex items-center gap-2 text-[11px] text-text-muted">
                  <FiGlobe className="h-4 w-4" />
                  Окно синков: 14:00–17:00
                </div>
              </div>
              <div className="rounded-xl bg-surface-variant border border-border px-4 py-3 space-y-2">
                <p className="text-xs font-medium text-text">Команды</p>
                <div className="flex flex-wrap gap-2">
                  {["Core", "Growth", "Design"].map((team) => (
                    <span
                      key={team}
                      className="inline-flex items-center gap-1 rounded-full bg-bg px-2.5 py-1 text-[11px] text-text-muted border border-border"
                    >
                      <FiUser className="h-3.5 w-3.5" />
                      {team}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface shadow-soft p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text">Активность</h3>
              <span className="text-[11px] text-text-muted">За неделю</span>
            </div>
            <div className="space-y-3">
              {activity.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-surface-variant border border-border px-3 py-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="h-8 w-8 rounded-full bg-bg flex items-center justify-center text-[11px] text-text-muted">
                        •
                      </span>
                      <div className="space-y-0.5">
                        <p className="text-xs font-medium text-text">{item.title}</p>
                        <p className="text-[11px] text-text-muted">{item.detail}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-text-muted whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-bg border border-border px-3 py-2.5 space-y-2">
              <p className="text-xs font-medium text-text">Напоминания</p>
              <Checkbox label="Сообщать о новых комментариях в задачах" defaultChecked />
              <Checkbox label="Сводка за день в 18:00" />
              <Checkbox label="Уведомления о дедлайнах за 24 часа" defaultChecked />
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-2xl border border-border bg-surface shadow-soft p-5 md:p-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-text-muted">
                Быстрый обзор
              </p>
              <h3 className="text-sm font-semibold text-text">Прогресс и фокус</h3>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-white shadow-soft active:scale-[0.97] transition-transform duration-150"
            >
              Обновить профиль
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {quickStats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-2xl bg-surface-variant border border-border px-4 py-3 shadow-soft"
              >
                <p className="text-[11px] uppercase tracking-[0.12em] text-text-muted">
                  {stat.label}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-semibold text-text">{stat.value}</span>
                  <span className="h-8 w-8 rounded-xl bg-bg flex items-center justify-center text-primary">
                    <FiCheckCircle className="h-4 w-4" />
                  </span>
                </div>
                <p className="text-[11px] text-text-muted mt-1.5">{stat.hint}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
};
