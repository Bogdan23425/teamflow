import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiTag,
  FiCalendar,
  FiUserPlus,
  FiImage,
} from "react-icons/fi";
import { BoardTask } from "../types";
import { Button } from "@/shared/ui/Button";

type TaskModalProps = {
  task: BoardTask | null;
  columnTitle?: string;
  onClose: () => void;
  onSave: (updates: { description?: string; coverColor?: string }) => void;
};

const COVER_PRESETS: string[] = [
  "#2563eb",
  "#22c55e",
  "#ef4444",
  "#ec4899",
  "#f97316",
  "#a855f7",
  "#eab308",
  "#06b6d4",
  "#e5e7eb",
  "#020617",
];

type ActivityItem = {
  id: string;
  text: string;
  timestamp?: string;
};

const INITIAL_ACTIVITY: ActivityItem[] = [
  {
    id: "1",
    text: "User 1 добавил(а) эту карточку в список .",
    timestamp: "Сегодня, 12:04",
  },
  {
    id: "2",
    text: "User 2 установил(а) срок выполнения на 27 дек. в 16:29.",
    timestamp: "Сегодня, 12:06",
  },
];

export const TaskModal: React.FC<TaskModalProps> = ({
  task,
  columnTitle,
  onClose,
  onSave,
}) => {
  const [description, setDescription] = React.useState("");
  const [coverColor, setCoverColor] = React.useState<string | null>(null);
  const [coverEnabled, setCoverEnabled] = React.useState(false);
  const [coverMode, setCoverMode] = React.useState<"top" | "full">("top");
  const [colorMenuOpen, setColorMenuOpen] = React.useState(false);
  const [colorTab, setColorTab] = React.useState<"presets" | "custom">(
    "presets"
  );

  const [isDone, setIsDone] = React.useState(false);

  const [labelsMenuOpen, setLabelsMenuOpen] = React.useState(false);
  const [dateMenuOpen, setDateMenuOpen] = React.useState(false);
  const [addMenuOpen, setAddMenuOpen] = React.useState(false);
  const [participantsMenuOpen, setParticipantsMenuOpen] =
    React.useState(false);

  const [labels, setLabels] = React.useState<
    { id: string; name: string; color: string }[]
  >([]);
  const [editingLabelId, setEditingLabelId] = React.useState<string | null>(
    null
  );
  const [editingLabelName, setEditingLabelName] = React.useState("");
  const [editingLabelColor, setEditingLabelColor] =
    React.useState("#2563eb");

  const [dateFrom, setDateFrom] = React.useState<string>("");
  const [dateTo, setDateTo] = React.useState<string>("");

  const [newComment, setNewComment] = React.useState("");
  const [activity, setActivity] =
    React.useState<ActivityItem[]>(INITIAL_ACTIVITY);

  React.useEffect(() => {
    if (task) {
      setDescription(task.description ?? "");
      if (task.coverColor) {
        setCoverColor(task.coverColor);
        setCoverEnabled(true);
      } else {
        setCoverColor(null);
        setCoverEnabled(false);
      }
      setColorMenuOpen(false);
      setColorTab("presets");
      setIsDone(false);
      setLabelsMenuOpen(false);
      setDateMenuOpen(false);
      setAddMenuOpen(false);
      setParticipantsMenuOpen(false);
      setEditingLabelId(null);
      setEditingLabelName("");
      setEditingLabelColor("#2563eb");
      setDateFrom("");
      setDateTo("");
      setNewComment("");
      setActivity(INITIAL_ACTIVITY);
    }
  }, [task]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && task) {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [task, onClose]);

  const handleSave = () => {
    onSave({
      description,
      coverColor: coverEnabled && coverColor ? coverColor : undefined,
    });
    onClose();
  };

  const handlePickPresetColor = (color: string) => {
    setCoverColor(color);
    setCoverEnabled(true);
  };

  const handleRemoveCover = () => {
    setCoverEnabled(false);
  };

  const handleStartEditLabel = (id: string) => {
    const label = labels.find((l) => l.id === id);
    if (!label) return;
    setEditingLabelId(id);
    setEditingLabelName(label.name);
    setEditingLabelColor(label.color);
  };

  const handleSaveLabel = () => {
    if (!editingLabelName.trim()) return;
    if (!editingLabelId) {
      const id = Math.random().toString(36).slice(2);
      setLabels((prev) => [
        ...prev,
        {
          id,
          name: editingLabelName.trim(),
          color: editingLabelColor,
        },
      ]);
      setEditingLabelId(null);
      setEditingLabelName("");
      setEditingLabelColor("#2563eb");
      return;
    }
    setLabels((prev) =>
      prev.map((l) =>
        l.id === editingLabelId
          ? {
              ...l,
              name: editingLabelName.trim(),
              color: editingLabelColor,
            }
          : l
      )
    );
    setEditingLabelId(null);
    setEditingLabelName("");
    setEditingLabelColor("#2563eb");
  };

  const handleDeleteLabel = () => {
    if (!editingLabelId) return;
    setLabels((prev) => prev.filter((l) => l.id !== editingLabelId));
    setEditingLabelId(null);
    setEditingLabelName("");
    setEditingLabelColor("#2563eb");
  };

  const handleAddLabelClick = () => {
    setEditingLabelId(null);
    setEditingLabelName("");
    setEditingLabelColor("#2563eb");
  };

  const handleSaveDates = () => {
    setDateMenuOpen(false);
  };

  const handleClearDates = () => {
    setDateFrom("");
    setDateTo("");
  };

  const handleAddComment = () => {
    const text = newComment.trim();
    if (!text) return;
    const item: ActivityItem = {
      id: Math.random().toString(36).slice(2),
      text: `User 1: ${text}`,
      timestamp: "Только что",
    };
    setActivity((prev) => [item, ...prev]);
    setNewComment("");
  };

  if (!task) return null;

  return (
    <AnimatePresence>
      {task && (
        <motion.div
          key={`task-modal-${task.id}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-[2px] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-[1080px] rounded-2xl border border-border bg-bg shadow-soft p-6 md:p-7 flex flex-col gap-5 overflow-hidden"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-35"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 0% 0%, rgba(37,99,235,0.16), transparent 45%), radial-gradient(circle at 100% 100%, rgba(15,23,42,0.4), transparent 50%)",
                filter: "blur(40px)",
              }}
            />

            {/* HEADER */}
            <div className="relative flex items-center justify-between gap-3 mb-1">
              <div className="inline-flex items-center gap-2">
                <div className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-text">
                  {columnTitle || "Без списка"}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setColorMenuOpen((v) => !v)}
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border bg-card text-text hover:bg-surface transition-colors shadow-soft/30"
                    aria-label="Цвет обложки"
                  >
                    <FiImage className="h-4 w-4" />
                  </button>
                  <AnimatePresence>
                    {colorMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.14, ease: "easeOut" }}
                        className="absolute right-0 top-11 z-10 w-72 rounded-xl border border-border bg-card shadow-soft p-3 space-y-3"
                      >
                        <div className="space-y-2">
                          <p className="text-[11px] uppercase tracking-[0.16em] text-text-muted">
                            Обложка
                          </p>
                          <div className="inline-flex bg-bg rounded-full p-1 text-[11px]">
                            <button
                              type="button"
                              onClick={() => setCoverMode("top")}
                              className={
                                "px-3 h-7 rounded-full transition-colors " +
                                (coverMode === "top"
                                  ? "bg-card text-text shadow-soft"
                                  : "text-text-muted")
                              }
                            >
                              Сверху
                            </button>
                            <button
                              type="button"
                              onClick={() => setCoverMode("full")}
                              className={
                                "px-3 h-7 rounded-full transition-colors " +
                                (coverMode === "full"
                                  ? "bg-card text-text shadow-soft"
                                  : "text-text-muted")
                              }
                            >
                              На всю
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="inline-flex bg-bg rounded-full p-1 text-[11px]">
                            <button
                              type="button"
                              onClick={() => setColorTab("presets")}
                              className={
                                "px-3 h-7 rounded-full transition-colors " +
                                (colorTab === "presets"
                                  ? "bg-card text-text shadow-soft"
                                  : "text-text-muted")
                              }
                            >
                              Готовые
                            </button>
                            <button
                              type="button"
                              onClick={() => setColorTab("custom")}
                              className={
                                "px-3 h-7 rounded-full transition-colors " +
                                (colorTab === "custom"
                                  ? "bg-card text-text shadow-soft"
                                  : "text-text-muted")
                              }
                            >
                              Свой
                            </button>
                          </div>

                          {colorTab === "presets" && (
                            <div className="grid grid-cols-5 gap-2 pt-1">
                              {COVER_PRESETS.map((c) => {
                                const active =
                                  coverEnabled && coverColor === c;
                                return (
                                  <button
                                    key={c}
                                    type="button"
                                    onClick={() =>
                                      handlePickPresetColor(c)
                                    }
                                    className={
                                      "h-8 rounded-lg border transition-all " +
                                      (active
                                        ? "border-primary shadow-soft"
                                        : "border-border hover:border-primary/70")
                                    }
                                    style={{ backgroundColor: c }}
                                  />
                                );
                              })}
                            </div>
                          )}

                          {colorTab === "custom" && (
                            <div className="space-y-3 pt-1">
                              <div
                                className="h-8 w-full rounded-md border border-border"
                                style={{
                                  backgroundColor:
                                    coverEnabled && coverColor
                                      ? coverColor
                                      : "#111827",
                                }}
                              />
                              <div className="flex items-center gap-2">
                                <input
                                  type="color"
                                  value={coverColor || "#2563eb"}
                                  onChange={(e) => {
                                    setCoverColor(e.target.value);
                                    setCoverEnabled(true);
                                  }}
                                  className="h-9 w-9 rounded-md border border-border bg-card cursor-pointer"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {coverEnabled && (
                          <div className="pt-1">
                            <button
                              type="button"
                              onClick={handleRemoveCover}
                              className="text-[11px] text-danger hover:underline"
                            >
                              Убрать обложку
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-border bg-card text-sm text-text hover:bg-surface hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-colors shadow-soft"
                  aria-label="Закрыть"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* COVER */}
            {coverEnabled && (
              <div
                className={
                  coverMode === "top"
                    ? "relative h-20 w-full rounded-xl border border-border"
                    : "relative h-32 w-full rounded-xl border border-border"
                }
                style={{ backgroundColor: coverColor || "#111827" }}
              />
            )}

            {/* BODY */}
            <div className="relative grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] mt-1">
              {/* LEFT */}
              <div className="space-y-5">
                {/* TITLE + CONTROLS */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() => setIsDone((v) => !v)}
                        aria-pressed={isDone}
                        className="mt-[2px] h-5 w-5 rounded-full border border-border bg-card flex items-center justify-center transition-all duration-150 hover:border-primary/70 shadow-soft/30"
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full bg-primary transition-transform duration-150"
                          style={{
                            transform: isDone ? "scale(1)" : "scale(0)",
                          }}
                        />
                      </button>
                      <div className="flex flex-col gap-1">
                        <p className="text-[11px] text-text-muted uppercase tracking-[0.14em]">
                          Задача
                        </p>
                        <h2
                          className={
                            "text-base md:text-lg font-semibold text-text break-words " +
                            (isDone
                              ? "line-through text-text-muted"
                              : "")
                          }
                        >
                          {task.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* PRIMARY ACTIONS */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setAddMenuOpen((v) => !v)}
                      className="h-8 rounded-full border border-border bg-bg px-3 text-[11px] text-text hover:bg-surface transition-colors"
                    >
                      <span className="inline-flex items-center gap-1">
                        <FiPlus className="h-3.5 w-3.5" />
                        Добавить
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLabelsMenuOpen((v) => !v)}
                      className="h-8 rounded-full border border-border bg-bg px-3 text-[11px] text-text hover:bg-surface transition-colors"
                    >
                      <span className="inline-flex items-center gap-1">
                        <FiTag className="h-3.5 w-3.5" />
                        Метки
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDateMenuOpen((v) => !v)}
                      className="h-8 rounded-full border border-border bg-bg px-3 text-[11px] text-text hover:bg-surface transition-colors"
                    >
                      <span className="inline-flex items-center gap-1">
                        <FiCalendar className="h-3.5 w-3.5" />
                        Дата
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setParticipantsMenuOpen((v) => !v)
                      }
                      className="h-8 rounded-full border border-border bg-bg px-3 text-[11px] text-text hover:bg-surface transition-colors"
                    >
                      <span className="inline-flex items-center gap-1">
                        <FiUserPlus className="h-3.5 w-3.5" />
                        Участники
                      </span>
                    </button>
                  </div>

                  {/* ACTIVE LABELS + DATE BADGE */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {labels.map((label) => (
                      <span
                        key={label.id}
                        className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] text-white"
                        style={{ backgroundColor: label.color }}
                      >
                        {label.name}
                      </span>
                    ))}
                    {(dateFrom || dateTo) && (
                      <span className="inline-flex items-center rounded-full border border-border bg-bg px-2 py-0.5 text-[11px] text-text-muted">
                        {dateFrom || "—"} {dateTo && "–"} {dateTo}
                      </span>
                    )}
                  </div>

                  {/* MENUS */}
                  <div className="relative">
                    {/* Add menu */}
                    <AnimatePresence>
                      {addMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.12 }}
                          className="absolute z-20 mt-2 w-64 rounded-xl border border-border bg-card shadow-soft p-3 space-y-2"
                        >
                          <p className="text-[11px] text-text-muted uppercase tracking-[0.16em] mb-1">
                            Добавить на карточку
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setAddMenuOpen(false);
                              setLabelsMenuOpen(true);
                            }}
                            className="flex items-center justify-between gap-2 w-full rounded-lg px-2 py-1.5 text-xs hover:bg-bg"
                          >
                            <span className="flex items-center gap-2">
                              <FiTag className="h-3.5 w-3.5" />
                              <span>Метки</span>
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setAddMenuOpen(false);
                              setDateMenuOpen(true);
                            }}
                            className="flex items-center justify-between gap-2 w-full rounded-lg px-2 py-1.5 text-xs hover:bg-bg"
                          >
                            <span className="flex items-center gap-2">
                              <FiCalendar className="h-3.5 w-3.5" />
                              <span>Дата</span>
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setAddMenuOpen(false);
                              setParticipantsMenuOpen(true);
                            }}
                            className="flex items-center justify-between gap-2 w-full rounded-lg px-2 py-1.5 text-xs hover:bg-bg"
                          >
                            <span className="flex items-center gap-2">
                              <FiUserPlus className="h-3.5 w-3.5" />
                              <span>Участники</span>
                            </span>
                          </button>
                          <button
                            type="button"
                            className="flex items-center justify-between gap-2 w-full rounded-lg px-2 py-1.5 text-xs hover:bg-bg"
                          >
                            <span className="flex items-center gap-2">
                              <span>📎</span>
                              <span>Вложения</span>
                            </span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Labels menu */}
                    <AnimatePresence>
                      {labelsMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.12 }}
                          className="absolute z-20 mt-2 w-72 rounded-xl border border-border bg-card shadow-soft p-3 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] text-text-muted uppercase tracking-[0.16em]">
                              Метки
                            </p>
                            <button
                              type="button"
                              onClick={() => setLabelsMenuOpen(false)}
                              className="text-xs text-text-muted hover:text-text"
                            >
                              ✕
                            </button>
                          </div>

                          <div className="space-y-1 max-h-40 overflow-auto pr-1">
                            {labels.length === 0 && (
                              <p className="text-[11px] text-text-muted">
                                Пока нет меток. Создайте первую.
                              </p>
                            )}
                            {labels.map((label) => (
                              <div
                                key={label.id}
                                className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-bg"
                              >
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-primary"
                                  />
                                  <div
                                    className="h-4 w-16 rounded-full"
                                    style={{ backgroundColor: label.color }}
                                  />
                                  <span className="text-[11px] text-text">
                                    {label.name}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStartEditLabel(label.id)
                                  }
                                  className="text-[11px] text-text-muted hover:text-text"
                                >
                                  ✎
                                </button>
                              </div>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={handleAddLabelClick}
                            className="w-full h-8 rounded-md border border-border bg-bg text-[11px] text-text hover:bg-surface transition-colors"
                          >
                            Создать метку
                          </button>

                          {(editingLabelId !== null || editingLabelName) && (
                            <div className="mt-2 space-y-2 rounded-lg border border-border bg-bg px-3 py-2">
                              <p className="text-[11px] text-text-muted uppercase tracking-[0.16em]">
                                Изменение метки
                              </p>
                              <div
                                className="h-5 w-20 rounded-full mb-1"
                                style={{
                                  backgroundColor: editingLabelColor,
                                }}
                              />
                              <input
                                type="text"
                                value={editingLabelName}
                                onChange={(e) =>
                                  setEditingLabelName(e.target.value)
                                }
                                placeholder="Название метки"
                                className="w-full h-8 rounded-md border border-border bg-card px-2 text-xs text-text placeholder:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                              />
                              <div className="grid grid-cols-5 gap-1 pt-1">
                                {COVER_PRESETS.map((c) => (
                                  <button
                                    key={c}
                                    type="button"
                                    onClick={() =>
                                      setEditingLabelColor(c)
                                    }
                                    className={
                                      "h-6 rounded-md border " +
                                      (editingLabelColor === c
                                        ? "border-primary"
                                        : "border-border hover:border-primary/60")
                                    }
                                    style={{ backgroundColor: c }}
                                  />
                                ))}
                              </div>
                              <div className="flex items-center justify-end gap-2 pt-2">
                                {editingLabelId && (
                                  <button
                                    type="button"
                                    onClick={handleDeleteLabel}
                                    className="text-[11px] text-danger hover:underline"
                                  >
                                    Удалить
                                  </button>
                                )}
                                <Button
                                  size="sm"
                                  variant="primary"
                                  onClick={handleSaveLabel}
                                >
                                  Сохранить
                                </Button>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Date menu */}
                    <AnimatePresence>
                      {dateMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.12 }}
                          className="absolute z-20 mt-2 w-72 rounded-xl border border-border bg-card shadow-soft p-3 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] text-text-muted uppercase tracking-[0.16em]">
                              Срок задачи
                            </p>
                            <button
                              type="button"
                              onClick={() => setDateMenuOpen(false)}
                              className="text-xs text-text-muted hover:text-text"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex flex-col gap-1">
                              <span className="text-[11px] text-text-muted">
                                Интервал
                              </span>
                              <div className="flex items-center gap-2">
                                <input
                                  type="date"
                                  value={dateFrom}
                                  onChange={(e) =>
                                    setDateFrom(e.target.value)
                                  }
                                  className="flex-1 h-8 rounded-md border border-border bg-bg px-2 text-xs text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                                />
                                <span className="text-[11px] text-text-muted">
                                  —
                                </span>
                                <input
                                  type="date"
                                  value={dateTo}
                                  onChange={(e) =>
                                    setDateTo(e.target.value)
                                  }
                                  className="flex-1 h-8 rounded-md border border-border bg-bg px-2 text-xs text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                                />
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-1">
                              <button
                                type="button"
                                onClick={handleClearDates}
                                className="text-[11px] text-text-muted hover:underline"
                              >
                                Удалить
                              </button>
                              <Button
                                size="sm"
                                variant="primary"
                                onClick={handleSaveDates}
                              >
                                Сохранить
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Participants menu */}
                    <AnimatePresence>
                      {participantsMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.12 }}
                          className="absolute z-20 mt-2 w-72 rounded-xl border border-border bg-card shadow-soft p-3 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-[11px] text-text-muted uppercase tracking-[0.16em]">
                              Участники
                            </p>
                            <button
                              type="button"
                              onClick={() =>
                                setParticipantsMenuOpen(false)
                              }
                              className="text-xs text-text-muted hover:text-text"
                            >
                              ✕
                            </button>
                          </div>
                          <p className="text-[11px] text-text-muted">
                            Пока заглушка. Позже здесь будет выбор
                            участников команды.
                          </p>
                          <div className="flex items-center gap-2 pt-1">
                            <div className="h-7 w-7 rounded-full bg-primary text-[11px] flex items-center justify-center text-white">
                              БП
                            </div>
                            <span className="text-[11px] text-text">
                              Богдан Паламарчук
                            </span>
                          </div>
                          <button
                            type="button"
                            className="mt-2 h-8 w-full rounded-md border border-border bg-bg text-[11px] text-text hover:bg-surface transition-colors"
                          >
                            Добавить участника
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                  <p className="text-[11px] text-text-muted uppercase tracking-[0.16em]">
                    Описание
                  </p>
                  <div className="rounded-xl bg-card shadow-soft/20 overflow-hidden border border-border">
                    <div className="h-0.5 w-full bg-primary-soft" />
                    <textarea
                      value={description}
                      onChange={(e) =>
                        setDescription(e.target.value)
                      }
                      placeholder="Опишите, что нужно сделать, важные детали, критерии готовности…"
                      rows={9}
                      className="w-full rounded-xl border-0 bg-transparent px-3 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus-visible:ring-0 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT: COMMENTS & ACTIVITY */}
              <div className="space-y-3 rounded-2xl bg-card shadow-soft/25 p-3 border border-border">
                <div className="space-y-2">
                  <p className="text-[11px] text-text-muted uppercase tracking-[0.16em]">
                    Комментарии и события
                  </p>
                  {/* Add comment block */}
                  <div className="rounded-xl bg-bg px-3 py-3 space-y-2 shadow-soft/10 border border-border">
                    <textarea
                      value={newComment}
                      onChange={(e) =>
                        setNewComment(e.target.value)
                      }
                      rows={2}
                      placeholder="Напишите комментарий…"
                      className="w-full rounded-md bg-card px-2 py-2 text-xs text-text placeholder:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 border border-border resize-none"
                    />
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={handleAddComment}
                      >
                        Добавить
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Activity list */}
                <div className="space-y-2 max-h-[260px] overflow-auto pr-1">
                  {activity.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg bg-bg px-3 py-2 text-xs text-text shadow-soft/10 border border-border"
                    >
                      <p className="text-text/90">{item.text}</p>
                      {item.timestamp && (
                        <p className="mt-1 text-[10px] text-text/80">
                          {item.timestamp}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="relative flex items-center justify-end pt-3">
              <Button variant="primary" size="md" onClick={handleSave}>
                Сохранить
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
