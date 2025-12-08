import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchBoard,
  fetchBoardColumns,
  createBoardColumn,
  deleteBoardColumn,
  createBoardTask,
  updateBoardBackground,
} from "@/shared/api/boards";
import { Board, BoardColumn, BoardTask } from "./types";
import { ColumnActionsMenu } from "./components/ColumnActionsMenu";
import { updateBoardTask } from "@/shared/api/boards";

export const BoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [board, setBoard] = React.useState<Board | null>(null);
  const [columns, setColumns] = React.useState<BoardColumn[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [columnsLoading, setColumnsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [isAddingColumn, setIsAddingColumn] = React.useState(false);
  const [newColumnTitle, setNewColumnTitle] = React.useState("");

  const [newTaskTitles, setNewTaskTitles] = React.useState<Record<string, string>>({});
  const [bgMenuOpen, setBgMenuOpen] = React.useState(false);
  const [bgInput, setBgInput] = React.useState("");
  const [bgSaving, setBgSaving] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<{
    task: BoardTask;
    columnId: string;
  } | null>(null);
  const [taskDesc, setTaskDesc] = React.useState("");
  const [taskCover, setTaskCover] = React.useState("");

  React.useEffect(() => {
    if (!id) return;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const meta = await fetchBoard(id);
        setBoard(meta);
        setBgInput(meta.backgroundUrl ?? "");
        setColumnsLoading(true);
        const cols = await fetchBoardColumns(id);
        setColumns(cols);
      } catch (e) {
        setError("Доска не найдена");
      } finally {
        setLoading(false);
        setColumnsLoading(false);
      }
    };
    load();
  }, [id]);

  const handleClose = () => navigate("/boards");

  const handleCreateColumn = async () => {
    if (!id) return;
    const title = newColumnTitle.trim();
    if (!title) return;
    try {
      const created = await createBoardColumn(id, title);
      setColumns((prev) => [...prev, created]);
      setNewColumnTitle("");
      setIsAddingColumn(false);
    } catch {
    }
  };

  const handleDeleteColumn = async (columnId: string) => {
    if (!id) return;
    setColumns((prev) => prev.filter((c) => c.id !== columnId));
    try {
      await deleteBoardColumn(id, columnId);
    } catch {
    }
  };

  const handleCreateTask = async (columnId: string) => {
    if (!id) return;
    const raw = newTaskTitles[columnId] ?? "";
    const title = raw.trim();
    if (!title) return;
    try {
      const created = await createBoardTask(id, columnId, title);
      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId ? { ...col, tasks: [...col.tasks, created] } : col
        )
      );
      setNewTaskTitles((prev) => ({ ...prev, [columnId]: "" }));
    } catch {
    }
  };

  const handleOpenTask = (columnId: string, task: BoardTask) => {
    setSelectedTask({ task, columnId });
    setTaskDesc(task.description ?? "");
    setTaskCover(task.coverColor ?? "");
  };

  const handleSaveTask = async () => {
    if (!id || !selectedTask) return;
    const { columnId, task } = selectedTask;
    try {
      const updated = await updateBoardTask(id, columnId, task.id, {
        description: taskDesc,
        coverColor: taskCover,
      });
      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId
            ? {
                ...col,
                tasks: col.tasks.map((t) =>
                  t.id === task.id ? { ...t, ...updated } : t
                ),
              }
            : col
        )
      );
      setSelectedTask((prev) =>
        prev ? { ...prev, task: { ...prev.task, ...updated } } : prev
      );
    } catch {
    }
  };

  const handleCloseTask = () => {
    setSelectedTask(null);
    setTaskDesc("");
    setTaskCover("");
  };

  const handleSaveBackground = async () => {
    if (!id) return;
    setBgSaving(true);
    try {
      const resp = await updateBoardBackground(id, bgInput.trim());
      setBoard((prev) => (prev ? { ...prev, backgroundUrl: resp.backgroundUrl } : prev));
      setBgMenuOpen(false);
    } catch {
    } finally {
      setBgSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="board-layer"
        className="fixed inset-0 z-50 bg-surface"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        <div className="flex flex-col h-full overflow-visible">
          <div className="relative z-40 flex items-center justify-between gap-2 px-4 py-3 md:px-6 bg-surface/95 backdrop-blur border-b border-border">
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-text">
                {board?.name ?? (loading ? "Загрузка…" : "Без имени")}
              </h1>
              <p className="text-sm text-text-muted max-w-3xl">
                {board?.description || "Без описания"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setBgMenuOpen((p) => !p)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg text-sm text-text hover:bg-surface transition-colors"
                >
                  ⚙
                </button>
                {bgMenuOpen && (
                  <div className="fixed right-4 top-16 w-64 rounded-xl border border-border bg-surface p-3 shadow-soft z-50">
                    <p className="text-xs text-text-muted mb-2">
                      Установить фон по URL
                    </p>
                    <input
                      value={bgInput}
                      onChange={(e) => setBgInput(e.target.value)}
                      placeholder="https://..."
                      className="w-full h-9 rounded-md border border-border bg-bg px-3 text-xs text-text placeholder:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    />
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleSaveBackground}
                        disabled={bgSaving}
                        className="flex-1 h-9 rounded-md border border-border bg-card text-xs text-text hover:shadow-soft disabled:opacity-60"
                      >
                        Сохранить
                      </button>
                      <button
                        type="button"
                        onClick={() => setBgInput("")}
                        className="h-9 w-9 rounded-md border border-border bg-bg text-xs text-text-muted hover:text-text"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg text-sm text-text hover:bg-surface transition-colors"
              >
                ✕
              </button>
            </div>
            </div>

          <div className="flex-1 relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={
                board?.backgroundUrl
                  ? {
                      backgroundImage: `url(${board.backgroundUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : { backgroundColor: "var(--color-bg)" }
              }
            />
            <div className="relative h-full px-4 md:px-6 py-4 flex flex-col gap-4">
              {loading && (
                <div className="text-sm text-text-muted">Загрузка доски…</div>
              )}
              {(error || !board) && !loading ? (
                <div className="text-sm text-text">
                  {error ?? "Доска не найдена"}
                </div>
              ) : null}

              {board && !loading && !error && (
                <>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
                      Колонки
                    </span>
                  </div>

                  <div className="relative flex-1 min-h-[320px]">
                    <div className="flex items-start gap-3 overflow-x-auto overflow-y-hidden pb-4 h-[calc(100vh-220px)]">
                      {columnsLoading && (
                        <div className="min-w-[240px] rounded-xl border border-border bg-surface px-4 py-6 text-center text-sm text-text-muted">
                          Загрузка колонок…
                        </div>
                      )}

                      {columns.map((col) => (
                        <div
                          key={col.id}
                          className="min-w-[272px] max-w-[272px] rounded-xl border border-border bg-surface px-4 py-3 flex flex-col gap-3"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-text">
                              {col.title}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-text-muted">
                                {col.order + 1}
                              </span>
                              <ColumnActionsMenu
                                onDelete={() => handleDeleteColumn(col.id)}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            {col.tasks.map((task: BoardTask, taskIndex) => {
                              const taskKey =
                                task.id && task.id.trim().length > 0
                                  ? task.id
                                  : `${col.id}-task-${taskIndex}`;
                              return (
                              <div
                                key={taskKey}
                                className="w-full rounded-md border border-border bg-card text-xs text-text shadow-soft/30 break-words overflow-hidden"
                                style={{ minHeight: 64, maxWidth: "100%" }}
                                onClick={() => handleOpenTask(col.id, task)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    handleOpenTask(col.id, task);
                                  }
                                }}
                              >
                                {task.coverColor && (
                                  <div
                                    className="h-2 w-full rounded-t-md"
                                    style={{ backgroundColor: task.coverColor }}
                                  />
                                )}
                                <div className="px-3 py-2">
                                  {task.title}
                                </div>
                              </div>
                              );
                            })}
                          </div>

                          <div className="mt-auto flex flex-col gap-2">
                            {newTaskTitles[col.id] === undefined ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setNewTaskTitles((prev) => ({
                                    ...prev,
                                    [col.id]: "",
                                  }))
                                }
                              className="h-9 rounded-md border border-border bg-card text-xs text-text hover:bg-surface transition-colors"
                            >
                              Добавить карточку
                            </button>
                          ) : (
                              <div className="flex flex-col gap-2 rounded-md border border-border bg-card p-3 text-xs text-text">
                                <textarea
                                  autoFocus
                                  rows={3}
                                  value={newTaskTitles[col.id] ?? ""}
                                  onChange={(e) =>
                                    setNewTaskTitles((prev) => ({
                                      ...prev,
                                      [col.id]: e.target.value,
                                    }))
                                  }
                                  placeholder="Текст карточки"
                                  className="w-full resize-none rounded-md border border-border bg-card px-2 py-1 text-xs text-text placeholder:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                                  style={{ minHeight: 64 }}
                                />
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    disabled={!newTaskTitles[col.id]?.trim()}
                                    onClick={() => handleCreateTask(col.id)}
                                    className="h-9 flex-1 rounded-md border border-border bg-card text-text text-xs font-medium hover:shadow-soft active:scale-[0.98] transition-[transform,box-shadow,background-color] duration-150 disabled:opacity-50"
                                  >
                                    Добавить карточку
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setNewTaskTitles((prev) => {
                                        const { [col.id]: _, ...rest } = prev;
                                        return rest;
                                      })
                                    }
                                    className="h-9 w-9 rounded-md border border-border bg-card text-xs text-text-muted hover:text-text"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {isAddingColumn ? (
                        <div className="min-w-[272px] max-w-[272px] rounded-xl border border-border bg-surface px-4 py-3 flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-text">
                              Новая колонка
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setIsAddingColumn(false);
                                setNewColumnTitle("");
                              }}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg text-sm text-text-muted hover:text-text transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                          <input
                            value={newColumnTitle}
                            onChange={(e) => setNewColumnTitle(e.target.value)}
                            placeholder="Название колонки"
                            className="h-10 rounded-md border border-border bg-bg px-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                          />
                          <button
                            type="button"
                            disabled={!newColumnTitle.trim()}
                            onClick={handleCreateColumn}
                            className="h-10 rounded-md border border-border bg-primary text-white text-xs font-medium hover:shadow-soft active:scale-[0.98] transition-[transform,box-shadow,background-color] duration-150 disabled:opacity-50"
                          >
                            Добавить в список
                          </button>
                        </div>
                      ) : (
                        !columnsLoading && (
                          <button
                            type="button"
                            onClick={() => setIsAddingColumn(true)}
                            className="min-w-[272px] h-11 rounded-md border border-border bg-primary text-white text-sm font-medium hover:shadow-soft active:scale-[0.98] transition-[transform,box-shadow,background-color] duration-150"
                          >
                            Создать колонку
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Task modal */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            key={`task-modal-${selectedTask.task.id}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl rounded-2xl border border-border bg-surface shadow-soft p-6 flex flex-col gap-4 relative"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <button
                type="button"
                onClick={handleCloseTask}
                className="absolute right-4 top-4 h-9 w-9 rounded-full border border-border bg-bg text-text text-sm hover:bg-surface transition-colors"
              >
                ✕
              </button>

              <div
                className="h-24 w-full rounded-xl border border-border"
                style={{
                  backgroundColor: taskCover || "var(--color-card)",
                }}
              />

              <div className="space-y-1">
                <p className="text-xs text-text-muted uppercase tracking-[0.18em]">
                  Карточка
                </p>
                <h2 className="text-lg font-semibold text-text">
                  {selectedTask.task.title}
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-[1.2fr,0.8fr]">
                <div className="space-y-2">
                  <label className="text-xs text-text-muted">
                    Описание
                    <textarea
                      value={taskDesc}
                      onChange={(e) => setTaskDesc(e.target.value)}
                      placeholder="Добавьте подробности по задаче..."
                      rows={5}
                      className="mt-1 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-text placeholder:text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 resize-none"
                    />
                  </label>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs text-text-muted">
                      Цвет обложки
                    </label>
                    <input
                      type="color"
                      value={taskCover || "#6d8fd1"}
                      onChange={(e) => setTaskCover(e.target.value)}
                      className="h-10 w-full rounded-md border border-border bg-card"
                    />
                  </div>
                  <div className="space-y-1 text-xs text-text-muted">
                    <div>Создал: не задано</div>
                    <div>Обновил: не задано</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseTask}
                  className="h-10 rounded-md border border-border px-4 text-sm text-text-muted hover:text-text hover:bg-surface"
                >
                  Закрыть
                </button>
                <button
                  type="button"
                  onClick={handleSaveTask}
                  className="h-10 rounded-md border border-border bg-card px-5 text-sm font-medium text-text hover:shadow-soft active:scale-[0.98] transition-[transform,box-shadow,background-color] duration-150"
                >
                  Сохранить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};
