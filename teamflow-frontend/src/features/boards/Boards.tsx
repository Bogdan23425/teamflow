import React from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { Board, BoardFilterId, BoardsViewMode } from "./types";
import { MOCK_BOARDS } from "./mocks";

import { BoardsHeader } from "./components/BoardsHeader";
import { BoardsControls } from "./components/BoardsControls";
import { BoardsGridView } from "./components/BoardsGridView";
import { BoardsListView } from "./components/BoardsListView";
import { BoardsEmptyState } from "./components/BoardsEmptyState";
import { CreateBoardModal } from "./components/CreateBoardModal";

export const Boards: React.FC = () => {
  const navigate = useNavigate();

  const [boards, setBoards] = React.useState<Board[]>(MOCK_BOARDS);
  const [activeFilter, setActiveFilter] = React.useState<BoardFilterId>("all");
  const [view, setView] = React.useState<BoardsViewMode>("grid");
  const [search, setSearch] = React.useState("");
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);

  const filteredBoards = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    return boards.filter((board) => {
      if (activeFilter !== "all" && board.type !== activeFilter) return false;
      if (!query) return true;

      const haystack = `${board.name} ${board.description}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [boards, activeFilter, search]);

  const hasBoards = filteredBoards.length > 0;

  const handleOpenBoard = (id: string) => {
    navigate(`/boards/${id}`);
  };

  const handleOpenCreate = () => setIsCreateOpen(true);
  const handleCloseCreate = () => setIsCreateOpen(false);

  const handleCreateBoard = (payload: {
    name: string;
    type: Board["type"];
    description: string;
  }) => {
    const board: Board = {
      id: `${Date.now()}`,
      name: payload.name,
      description:
        payload.description || "Новая доска для задач команды.",
      status: "Активна",
      tasks: 0,
      type: payload.type,
      updatedAt: "Только что",
    };

    setBoards((prev) => [board, ...prev]);
    handleCloseCreate();
  };

  return (
    <main className="flex-1">
      <div className="w-full px-4 md:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-6 md:gap-8">
        <BoardsHeader onCreateClick={handleOpenCreate} />

        <BoardsControls
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          view={view}
          onViewChange={setView}
          search={search}
          onSearchChange={setSearch}
        />

        <AnimatePresence mode="wait">
          {hasBoards ? (
            view === "grid" ? (
              <BoardsGridView
                boards={filteredBoards}
                onOpenBoard={handleOpenBoard}
              />
            ) : (
              <BoardsListView
                boards={filteredBoards}
                onOpenBoard={handleOpenBoard}
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
