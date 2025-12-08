import React from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Board, BoardsViewMode } from "./types";

import { BoardsHeader } from "./components/BoardsHeader";
import { BoardsControls } from "./components/BoardsControls";
import { BoardsGridView } from "./components/BoardsGridView";
import { BoardsListView } from "./components/BoardsListView";
import { BoardsEmptyState } from "./components/BoardsEmptyState";
import { CreateBoardModal } from "./components/CreateBoardModal";
import { createBoard, deleteBoard, fetchBoards } from "@/shared/api/boards";
import { getBoardsCache, setBoardsCache } from "@/shared/store/boardsCache";

export const Boards: React.FC = () => {
  const navigate = useNavigate();

  const [boards, setBoards] = React.useState<Board[]>([]);
  const [view, setView] = React.useState<BoardsViewMode>("list");
  const [search, setSearch] = React.useState("");
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const hasFetchedOnceRef = React.useRef(false);

  const loadBoards = React.useCallback(async () => {
    if (hasFetchedOnceRef.current) return;
    hasFetchedOnceRef.current = true;

    const cached = getBoardsCache();
    if (cached) {
      setBoards(cached);
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchBoards();
      setBoards(data);
      setBoardsCache(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  const filteredBoards = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    return boards.filter((board) => {
      if (!query) return true;

      const haystack = `${board.name} ${board.description}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [boards, search]);

  const handleOpenBoard = (id: string) => {
    navigate(`/boards/${id}`);
  };

  const handleOpenCreate = () => setIsCreateOpen(true);
  const handleCloseCreate = () => setIsCreateOpen(false);

  const handleCreateBoard = (payload: { name: string; description: string }) => {
    const run = async () => {
      const created = await createBoard({
        name: payload.name,
        description: payload.description,
      });
      const next = [created, ...boards];
      setBoards(next);
      setBoardsCache(next);
    };
    run().finally(handleCloseCreate);
  };

  const handleDeleteBoard = (id: string) => {
    const run = async () => {
      setBoards((prev) => {
        const next = prev.filter((b) => b.id !== id);
        setBoardsCache(next);
        return next;
      });
    try {
      await deleteBoard(id);
    } catch {
    }
  };
    run();
  };

  const hasBoards = filteredBoards.length > 0;

  return (
    <main className="flex-1">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-6 md:gap-8">
        <BoardsHeader onCreateClick={handleOpenCreate} />

        <BoardsControls
          view={view}
          onViewChange={setView}
          search={search}
          onSearchChange={setSearch}
        />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="rounded-lg-tf border border-border bg-surface p-4 text-sm text-text-muted">
              Загружаем доски…
            </div>
          ) : hasBoards ? (
            view === "grid" ? (
              <BoardsGridView
                boards={filteredBoards}
                onOpenBoard={handleOpenBoard}
                onDeleteBoard={handleDeleteBoard}
              />
            ) : (
              <BoardsListView
                boards={filteredBoards}
                onOpenBoard={handleOpenBoard}
                onDeleteBoard={handleDeleteBoard}
              />
            )
          ) : (
            <BoardsEmptyState onCreateClick={handleOpenCreate} />
          )}
        </AnimatePresence>

        <CreateBoardModal
          isOpen={isCreateOpen}
          onClose={handleCloseCreate}
          onCreate={handleCreateBoard}
        />
      </div>
    </main>
  );
};
