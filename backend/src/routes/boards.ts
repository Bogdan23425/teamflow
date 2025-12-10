import { Router } from "express";
import { z } from "zod";
import type { Board as PrismaBoard, BoardType as PrismaBoardType } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

type BoardResponse = {
  id: string;
  name: string;
  description: string;
  status: string;
  tasks: number;
  type: "team" | "personal" | "sprint" | "backlog";
  updatedAt: string;
  backgroundUrl?: string | null;
};

type BoardWithCount = PrismaBoard & { _count: { tasks: number } };

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

boardsRouter.get("/", async (_req, res) => {
  const boards = await prisma.board.findMany({
    orderBy: { updatedAt: "desc" },
    include: { _count: { select: { tasks: true } } }
  });

  return res.json(boards.map(toBoardResponse));
});

boardsRouter.post("/", async (req, res) => {
  const parsed = createBoardSchema.safeParse(req.body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return res.status(400).json({
      error: "Validation error",
      fieldErrors
    });
  }

  const { name, description } = parsed.data;
  const board = await prisma.board.create({
    data: {
      name: name.trim(),
      description: description?.trim() ?? "",
      status: "Активна",
      type: "TEAM"
    }
  });

  return res.status(201).json(
    toBoardResponse({
      ...board,
      _count: { tasks: 0 }
    })
  );
});

boardsRouter.get("/:id", async (req, res) => {
  const board = await prisma.board.findUnique({
    where: { id: req.params.id },
    include: { _count: { select: { tasks: true } } }
  });

  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }

  return res.json(toBoardResponse(board));
});

boardsRouter.patch("/:id/background", async (req, res) => {
  const parsed = updateBackgroundSchema.safeParse(req.body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return res.status(400).json({
      error: "Validation error",
      fieldErrors
    });
  }

  try {
    const updated = await prisma.board.update({
      where: { id: req.params.id },
      data: { backgroundUrl: parsed.data.backgroundUrl || null }
    });

    return res.json({ success: true, backgroundUrl: updated.backgroundUrl });
  } catch {
    return res.status(404).json({ error: "Board not found" });
  }
});

boardsRouter.delete("/:id", async (req, res) => {
  try {
    const removed = await prisma.board.delete({ where: { id: req.params.id } });
    return res.json({ success: true, removedId: removed.id });
  } catch {
    return res.status(404).json({ error: "Board not found" });
  }
});

boardsRouter.get("/:id/columns", async (req, res) => {
  const board = await prisma.board.findUnique({ where: { id: req.params.id } });
  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }

  const columns = await prisma.boardColumn.findMany({
    where: { boardId: req.params.id },
    orderBy: { order: "asc" },
    include: { tasks: { orderBy: { createdAt: "asc" } } }
  });

  return res.json(columns);
});

boardsRouter.post("/:id/columns", async (req, res) => {
  const board = await prisma.board.findUnique({ where: { id: req.params.id } });
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

  const columnsCount = await prisma.boardColumn.count({ where: { boardId: board.id } });
  const created = await prisma.boardColumn.create({
    data: {
      boardId: board.id,
      title: parsed.data.title.trim(),
      order: columnsCount
    }
  });
  await touchBoard(board.id);

  return res.status(201).json({ ...created, tasks: [] });
});

boardsRouter.post("/:id/columns/:columnId/tasks", async (req, res) => {
  const board = await prisma.board.findUnique({ where: { id: req.params.id } });
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

  const column = await prisma.boardColumn.findFirst({
    where: { id: req.params.columnId, boardId: board.id }
  });
  if (!column) {
    return res.status(404).json({ error: "Column not found" });
  }

  const task = await prisma.boardTask.create({
    data: {
      boardId: board.id,
      columnId: column.id,
      title: parsed.data.title.trim()
    }
  });
  await touchBoard(board.id);

  return res.status(201).json(task);
});

boardsRouter.delete("/:id/columns/:columnId", async (req, res) => {
  const boardId = req.params.id;
  const columnId = req.params.columnId;

  const column = await prisma.boardColumn.findFirst({
    where: { id: columnId, boardId }
  });
  if (!column) {
    return res.status(404).json({ error: "Column not found" });
  }

  await prisma.$transaction(async (tx) => {
    await tx.boardColumn.delete({ where: { id: columnId } });
    const remaining = await tx.boardColumn.findMany({
      where: { boardId },
      orderBy: { order: "asc" }
    });
    await Promise.all(
      remaining.map((col, idx) =>
        tx.boardColumn.update({
          where: { id: col.id },
          data: { order: idx }
        })
      )
    );
    await tx.board.update({ where: { id: boardId }, data: { updatedAt: new Date() } });
  });

  return res.json({ success: true, removedId: columnId });
});

boardsRouter.patch("/:id/columns/:columnId/tasks/:taskId", async (req, res) => {
  const boardId = req.params.id;
  const columnId = req.params.columnId;
  const taskId = req.params.taskId;

  const parsed = updateTaskSchema.safeParse(req.body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return res.status(400).json({
      error: "Validation error",
      fieldErrors
    });
  }

  const task = await prisma.boardTask.findFirst({
    where: { id: taskId, boardId, columnId }
  });
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  const updates = parsed.data;
  const updated = await prisma.boardTask.update({
    where: { id: taskId },
    data: {
      title: updates.title ? updates.title.trim() : undefined,
      description: updates.description ?? undefined,
      coverColor: updates.coverColor ?? undefined
    }
  });
  await touchBoard(boardId);

  return res.json(updated);
});

const boardTypeMap: Record<PrismaBoardType, BoardResponse["type"]> = {
  TEAM: "team",
  PERSONAL: "personal",
  SPRINT: "sprint",
  BACKLOG: "backlog"
};

function toBoardResponse(board: BoardWithCount): BoardResponse {
  return {
    id: board.id,
    name: board.name,
    description: board.description ?? "",
    status: board.status,
    tasks: board._count.tasks,
    type: boardTypeMap[board.type],
    updatedAt: board.updatedAt.toISOString(),
    backgroundUrl: board.backgroundUrl
  };
}

async function touchBoard(boardId: string) {
  await prisma.board.update({ where: { id: boardId }, data: { updatedAt: new Date() } });
}
