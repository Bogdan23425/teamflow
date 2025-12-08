import { apiFetch } from "./client";
import { Board, BoardColumn, BoardTask } from "@/features/boards/types";

export const fetchBoards = () => apiFetch<Board[]>("/boards");

export const fetchBoard = (id: string) => apiFetch<Board>(`/boards/${id}`);

export const createBoard = (payload: { name: string; description: string }) =>
  apiFetch<Board>("/boards", {
    method: "POST",
    body: payload,
  });

export const deleteBoard = (id: string) =>
  apiFetch<{ success: boolean; removedId: string }>(`/boards/${id}`, {
    method: "DELETE",
  });

export const fetchBoardColumns = (boardId: string) =>
  apiFetch<BoardColumn[]>(`/boards/${boardId}/columns`);

export const createBoardColumn = (boardId: string, title: string) =>
  apiFetch<BoardColumn>(`/boards/${boardId}/columns`, {
    method: "POST",
    body: { title },
  });

export const createBoardTask = (
  boardId: string,
  columnId: string,
  title: string
) =>
  apiFetch<BoardTask>(`/boards/${boardId}/columns/${columnId}/tasks`, {
    method: "POST",
    body: { title },
  });

export const deleteBoardColumn = (boardId: string, columnId: string) =>
  apiFetch<{ success: boolean; removedId: string }>(
    `/boards/${boardId}/columns/${columnId}`,
    { method: "DELETE" }
  );

export const updateBoardBackground = (boardId: string, backgroundUrl: string) =>
  apiFetch<{ success: boolean; backgroundUrl?: string }>(
    `/boards/${boardId}/background`,
    {
      method: "PATCH",
      body: { backgroundUrl },
    }
  );

export const updateBoardTask = (
  boardId: string,
  columnId: string,
  taskId: string,
  payload: { title?: string; description?: string; coverColor?: string }
) =>
  apiFetch<BoardTask>(
    `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    {
      method: "PATCH",
      body: payload,
    }
  );
