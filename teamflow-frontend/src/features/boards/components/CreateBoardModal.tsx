import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BoardType } from "../types";
import { Input } from "@/shared/ui/Input";

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (payload: {
    name: string;
    type: BoardType;
    description: string;
  }) => void;
}

export const CreateBoardModal: React.FC<CreateBoardModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState<BoardType>("team");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    onCreate({
      name: trimmedName,
      type,
      description: description.trim(),
    });

    setName("");
    setType("team");
    setDescription("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md mx-4 rounded-lg-tf border border-border bg-surface shadow-soft p-5 sm:p-6 flex flex-col gap-4"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm md:text-base font-semibold text-text">
                  Новая доска
                </h2>
                <p className="text-xs text-text-muted mt-0.5">
                  Назови доску и выбери тип — это можно будет поменять позже.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-bg text-[13px] text-text-muted hover:text-text hover:bg-bg/80 transition-colors duration-150"
              >
                ✕
              </button>
            </div>

            <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
              <Input
                label="Название доски"
                placeholder="Например, «Команда разработки»"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-text">
                  Тип доски
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as BoardType)}
                  className="h-9 rounded-md-tf bg-bg border border-border px-3 text-xs md:text-sm text-text focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <option value="team">Командная</option>
                  <option value="personal">Личная</option>
                  <option value="sprint">Спринт</option>
                  <option value="backlog">Бэклог</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-text">
                  Описание
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Коротко опиши, для чего эта доска."
                  rows={3}
                  className="rounded-md-tf bg-bg border border-border px-3 py-2 text-xs md:text-sm text-text placeholder:text-text-muted/70 resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs md:text-sm text-text-muted hover:text-text hover:bg-bg transition-colors duration-150"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs md:text-sm font-medium text-white shadow-soft hover:shadow-strong active:scale-[0.97] transition-[transform,box-shadow,background-color] duration-150"
                >
                  Создать доску
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
