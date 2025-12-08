import { Board } from "@/features/boards/types";

let boardsCache: Board[] | null = null;

export const getBoardsCache = (): Board[] | null => boardsCache;

export const setBoardsCache = (boards: Board[]) => {
  boardsCache = boards;
};
