import React from "react";

interface BoardActionsMenuProps {
  onDelete: () => void;
}

export const BoardActionsMenu: React.FC<BoardActionsMenuProps> = ({
  onDelete,
}) => {
  const [open, setOpen] = React.useState(false);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  const handleDelete = () => {
    onDelete();
    close();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggle}
        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border bg-bg text-[14px] text-text-muted hover:text-text transition-colors"
      >
        ⋯
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-10 min-w-[140px] rounded-lg border border-border bg-surface shadow-soft p-1">
          <button
            type="button"
            onClick={handleDelete}
            className="w-full rounded-md px-3 py-2 text-left text-sm text-danger hover:bg-danger/10"
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};
