import React from "react";
import { motion } from "framer-motion";
import {
  FiBell,
  FiClock,
  FiKey,
  FiLock,
  FiMail,
  FiMoon,
  FiShield,
  FiSmartphone,
  FiSun,
  FiToggleLeft,
} from "react-icons/fi";
import { Input } from "@/shared/ui/Input";
import { Checkbox } from "@/shared/ui/Checkbox";

const notificationOptions = [
  { id: "tasks", label: "Изменения в задачах, где я исполнитель" },
  { id: "mentions", label: "Упоминания @team и @me" },
  { id: "digest", label: "Сводка за день (18:00)" },
  { id: "reminders", label: "Напоминания о дедлайнах за 24 часа" },
];

const securityOptions = [
  {
    id: "2fa",
    title: "Двухфакторная защита",
    description: "Поддерживает приложения Google Authenticator и 1Password.",
    cta: "Подключить",
  },
  {
    id: "sessions",
    title: "Устройства и сессии",
    description: "Последний вход: сегодня, 09:42 · MacOS · Chrome.",
    cta: "Управлять",
  },
  {
    id: "backup",
    title: "Резервные коды",
    description: "8 из 10 кодов доступны. Скачайте и храните в менеджере паролей.",
    cta: "Сгенерировать",
  },
];

export const Settings: React.FC = () => {
  const [theme, setTheme] = React.useState<"light" | "dark" | "auto">("auto");
  const [timezone, setTimezone] = React.useState("Europe/Moscow");

  return (
    <main className="flex-1">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-6 md:gap-8">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
        >
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
              Центр настроек
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-text">
              Профиль и рабочая среда
            </h1>
            <p className="text-sm text-text-muted max-w-xl">
              Подстрой уведомления, безопасность и визуальный режим так, как удобно работать каждый день.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-surface border border-border px-3 py-2 shadow-soft">
            <FiToggleLeft className="h-4 w-4 text-primary" />
            <span className="text-xs text-text">Автосохранение</span>
            <span className="text-[11px] text-text-muted">Профиль сохраняется мгновенно</span>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="grid grid-cols-1 xl:grid-cols-3 gap-4"
        >
          <div className="col-span-1 xl:col-span-2 rounded-2xl border border-border bg-surface shadow-soft p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text">Общие</h3>
              <span className="text-[11px] text-text-muted">Рабочее пространство</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <Input label="Название" defaultValue="TeamFlow workspace" />
              <Input
                label="Рабочая почта"
                type="email"
                defaultValue="bogdan@teamflow.space"
                leftIcon={<FiMail className="h-4 w-4 text-text-muted" />}
              />
              <div className="space-y-1">
                <label className="text-xs font-medium text-text">Часовой пояс</label>
                <div className="rounded-md border border-border bg-surface px-3 py-2">
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full bg-transparent text-sm text-text outline-none"
                  >
                    <option value="Europe/Moscow">GMT+3 · Europe/Moscow</option>
                    <option value="Europe/Berlin">GMT+1 · Europe/Berlin</option>
                    <option value="Asia/Almaty">GMT+6 · Asia/Almaty</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-text">Тема</label>
                <div className="flex items-center gap-2">
                  {(["auto", "light", "dark"] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setTheme(mode)}
                      className={[
                        "flex-1 inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs transition-colors duration-150",
                        theme === mode
                          ? "border-primary/60 text-text bg-primary/8 shadow-soft"
                          : "border-border text-text-muted hover:text-text hover:bg-bg",
                      ].join(" ")}
                    >
                      {mode === "dark" ? (
                        <FiMoon className="h-4 w-4" />
                      ) : mode === "auto" ? (
                        <FiClock className="h-4 w-4" />
                      ) : (
                        <FiSun className="h-4 w-4" />
                      )}
                      {mode === "auto" ? "Авто" : mode === "light" ? "Светлая" : "Тёмная"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-surface-variant border border-border px-4 py-3 space-y-2">
              <p className="text-xs font-medium text-text">Уведомления</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {notificationOptions.map((option) => (
                  <Checkbox key={option.id} label={option.label} defaultChecked />
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface shadow-soft p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text">Сигналы</h3>
              <FiBell className="h-4 w-4 text-primary" />
            </div>
            <p className="text-xs text-text-muted">
              Настрой, какие события прилетают в пуши, на почту и в мессенджеры. Можно подключить
              сразу несколько каналов.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-surface-variant border border-border px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <FiMail className="h-4 w-4 text-primary" />
                  <span className="text-xs text-text">Email</span>
                </div>
                <span className="text-[11px] text-text-muted">bogdan@teamflow.space</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface-variant border border-border px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <FiSmartphone className="h-4 w-4 text-primary" />
                  <span className="text-xs text-text">Push</span>
                </div>
                <span className="text-[11px] text-success">Включены</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-surface-variant border border-border px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <FiBell className="h-4 w-4 text-primary" />
                  <span className="text-xs text-text">Slack</span>
                </div>
                <span className="text-[11px] text-text-muted">@bogdan</span>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.34, ease: "easeOut" }}
          className="grid grid-cols-1 xl:grid-cols-3 gap-4"
        >
          <div className="col-span-1 xl:col-span-2 rounded-2xl border border-border bg-surface shadow-soft p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-text">Безопасность</h3>
              <FiShield className="h-4 w-4 text-primary" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {securityOptions.map((option) => (
                <div
                  key={option.id}
                  className="rounded-xl bg-surface-variant border border-border px-4 py-3 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-8 w-8 rounded-full bg-bg flex items-center justify-center text-primary">
                      {option.id === "2fa" ? <FiKey className="h-4 w-4" /> : option.id === "backup" ? <FiLock className="h-4 w-4" /> : <FiSmartphone className="h-4 w-4" />}
                    </span>
                    <p className="text-xs font-medium text-text">{option.title}</p>
                  </div>
                  <p className="text-[11px] text-text-muted flex-1">{option.description}</p>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-3 py-1.5 text-[11px] font-medium text-white shadow-soft active:scale-[0.97] transition-transform duration-150"
                  >
                    {option.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-danger bg-danger/5 shadow-soft p-5 md:p-6 space-y-3">
            <div className="flex items-center gap-2">
              <FiLock className="h-4 w-4 text-danger" />
              <h3 className="text-sm font-semibold text-danger">Опасная зона</h3>
            </div>
            <p className="text-xs text-text-muted">
              Отключает интеграции и удаляет доступы. Используйте только если действительно
              прекращаете работу в пространстве.
            </p>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-danger px-4 py-2 text-xs font-medium text-white shadow-soft active:scale-[0.97] transition-transform duration-150"
            >
              Отключить аккаунт
            </button>
          </div>
        </motion.section>
      </div>
    </main>
  );
};
