import React from "react";
import { motion } from "framer-motion";
import { Board } from "../types";
import { BoardActionsMenu } from "./BoardActionsMenu";

interface BoardsListViewProps {
  boards: Board[];
  onOpenBoard: (id: string) => void;
  onDeleteBoard: (id: string) => void;
}

export const BoardsListView: React.FC<BoardsListViewProps> = ({
  boards,
  onOpenBoard,
  onDeleteBoard,
}) => {
  return (
    <motion.div
      key="list"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="overflow-hidden rounded-lg-tf border border-border bg-surface shadow-soft"
    >
      <div className="hidden md:grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_40px] gap-4 px-4 py-3 text-[11px] uppercase tracking-[0.14em] text-text-muted border-b border-border">
        <span>Доска</span>
        <span>Описание</span>
        <span>Задачи</span>
        <span>Обновлено</span>
        <span />
      </div>

      <div className="divide-y divide-border">
        {boards.map((board) => (
          <div
            key={board.id}
            className="w-full text-left px-4 py-3 md:py-3.5 flex flex-col gap-2 md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_40px] md:items-center md:gap-4 transition-colors duration-150 hover:bg-surface"
          >
            <button
              type="button"
              onClick={() => onOpenBoard(board.id)}
              className="flex flex-col gap-1 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text">
                  {board.name}
                </span>
                <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-text-muted">
                  {board.status}
                </span>
              </div>
              <p className="text-xs text-text-muted md:hidden">
                {board.description}
              </p>
            </button>

            <button
              type="button"
              onClick={() => onOpenBoard(board.id)}
              className="hidden md:block text-xs text-text-muted text-left hover:text-text transition-colors"
            >
              {board.description}
            </button>

            <button
              type="button"
              onClick={() => onOpenBoard(board.id)}
              className="flex items-center gap-2 text-xs text-text-muted text-left"
            >
              <span>{board.tasks} задач</span>
              <span className="hidden sm:inline-flex h-1 w-10 overflow-hidden rounded-full bg-bg">
                <span className="block h-full w-2/3 rounded-full bg-primary" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => onOpenBoard(board.id)}
              className="text-xs text-text-muted text-left hover:text-text transition-colors"
            >
              {board.updatedAt}
            </button>

            <div className="flex justify-end">
              <BoardActionsMenu onDelete={() => onDeleteBoard(board.id)} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
