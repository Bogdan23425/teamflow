import { Router } from "express";
import { randomUUID } from "crypto";
import { z } from "zod";

type Board = {
  id: string;
  name: string;
  description: string;
  status: string;
  tasks: number;
  type: "team" | "personal" | "sprint" | "backlog";
  updatedAt: string;
  backgroundUrl?: string;
};

type BoardColumn = {
  id: string;
  boardId: string;
  title: string;
  order: number;
  tasks: BoardTask[];
  createdAt: string;
};

type BoardTask = {
  id: string;
  columnId: string;
  title: string;
  description?: string;
  coverColor?: string;
  createdAt: string;
};

const initialBoards: Board[] = [];

const boardsStore: Board[] = [...initialBoards];
const boardColumnsStore: Record<string, BoardColumn[]> = {};

const createBoardSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  description: z.string().optional()
});
const createColumnSchema = z.object({
  title: z.string().min(1, "Название обязательно")
});
const createTaskSchema = z.object({
  title: z.string().min(1, "Название обязательно")
});
const updateTaskSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  coverColor: z.string().optional()
});
const updateBackgroundSchema = z.object({
  backgroundUrl: z.string().url("Неверный URL").optional().or(z.literal(""))
});

export const boardsRouter = Router();

boardsRouter.get("/", (_req, res) => {
  res.json(boardsStore);
});

boardsRouter.post("/", (req, res) => {
  const parsed = createBoardSchema.safeParse(req.body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return res.status(400).json({
      error: "Validation error",
      fieldErrors
    });
  }

  const { name, description } = parsed.data;
  const board: Board = {
    id: randomUUID(),
    name,
    description: description ?? "",
    status: "Активна",
    tasks: 0,
    type: "team",
    updatedAt: new Date().toISOString(),
    backgroundUrl: undefined
  };

  boardsStore.unshift(board);
  res.status(201).json(board);
});

boardsRouter.get("/:id", (req, res) => {
  const board = boardsStore.find((b) => b.id === req.params.id);
  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }
  return res.json(board);
});

boardsRouter.patch("/:id/background", (req, res) => {
  const board = boardsStore.find((b) => b.id === req.params.id);
  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }

  const parsed = updateBackgroundSchema.safeParse(req.body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return res.status(400).json({
      error: "Validation error",
      fieldErrors
    });
  }

  board.backgroundUrl = parsed.data.backgroundUrl || undefined;
  board.updatedAt = new Date().toISOString();
  return res.json({ success: true, backgroundUrl: board.backgroundUrl });
});

boardsRouter.delete("/:id", (req, res) => {
  const index = boardsStore.findIndex((b) => b.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Board not found" });
  }
  const [removed] = boardsStore.splice(index, 1);
  return res.json({ success: true, removedId: removed.id });
});

boardsRouter.get("/:id/columns", (req, res) => {
  const board = boardsStore.find((b) => b.id === req.params.id);
  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }
  const columns = boardColumnsStore[board.id] ?? [];
  return res.json(columns);
});

boardsRouter.post("/:id/columns", (req, res) => {
  const board = boardsStore.find((b) => b.id === req.params.id);
  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }

  const parsed = createColumnSchema.safeParse(req.body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return res.status(400).json({
      error: "Validation error",
      fieldErrors
    });
  }

  const columns = boardColumnsStore[board.id] ?? [];
  const nextColumn: BoardColumn = {
    id: randomUUID(),
    boardId: board.id,
    title: parsed.data.title.trim(),
    order: columns.length,
    tasks: [],
    createdAt: new Date().toISOString()
  };

  const updated = [...columns, nextColumn];
  boardColumnsStore[board.id] = updated;
  board.updatedAt = new Date().toISOString();

  return res.status(201).json(nextColumn);
});

boardsRouter.post("/:id/columns/:columnId/tasks", (req, res) => {
  const board = boardsStore.find((b) => b.id === req.params.id);
  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }

  const parsed = createTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return res.status(400).json({
      error: "Validation error",
      fieldErrors
    });
  }

  const columns = boardColumnsStore[board.id] ?? [];
  const column = columns.find((c) => c.id === req.params.columnId);
  if (!column) {
    return res.status(404).json({ error: "Column not found" });
  }

  const task: BoardTask = {
    id: randomUUID(),
    columnId: column.id,
    title: parsed.data.title.trim(),
    description: "",
    coverColor: undefined,
    createdAt: new Date().toISOString()
  };

  column.tasks.push(task);
  board.updatedAt = new Date().toISOString();
  return res.status(201).json(task);
});

boardsRouter.delete("/:id/columns/:columnId", (req, res) => {
  const board = boardsStore.find((b) => b.id === req.params.id);
  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }
  const columns = boardColumnsStore[board.id] ?? [];
  const index = columns.findIndex((c) => c.id === req.params.columnId);
  if (index === -1) {
    return res.status(404).json({ error: "Column not found" });
  }
  const [removed] = columns.splice(index, 1);
  boardColumnsStore[board.id] = columns.map((col, idx) => ({
    ...col,
    order: idx
  }));
  board.updatedAt = new Date().toISOString();
  return res.json({ success: true, removedId: removed.id });
});

boardsRouter.patch("/:id/columns/:columnId/tasks/:taskId", (req, res) => {
  const board = boardsStore.find((b) => b.id === req.params.id);
  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }
  const columns = boardColumnsStore[board.id] ?? [];
  const column = columns.find((c) => c.id === req.params.columnId);
  if (!column) {
    return res.status(404).json({ error: "Column not found" });
  }
  const task = column.tasks.find((t) => t.id === req.params.taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return res.status(400).json({
      error: "Validation error",
      fieldErrors
    });
  }

  const updates = parsed.data;
  task.title = updates.title?.trim() || task.title;
  task.description = updates.description ?? task.description;
  task.coverColor = updates.coverColor ?? task.coverColor;
  board.updatedAt = new Date().toISOString();

  return res.json(task);
});
