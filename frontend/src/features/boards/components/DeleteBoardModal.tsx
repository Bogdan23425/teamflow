import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

interface DeleteBoardModalProps {
  isOpen: boolean;
  boardName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteBoardModal: React.FC<DeleteBoardModalProps> = ({
  isOpen,
  boardName,
  onConfirm,
  onCancel,
}) => {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_60px_rgba(0,0,0,0.22)] text-text"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative px-5 py-4 bg-card">
              <h3 className="relative text-base font-semibold">Удалить доску?</h3>
              <p className="relative mt-1.5 text-sm text-text-muted leading-relaxed">
                Это действие необратимо.{" "}
                {boardName ? `Будет удалена доска «${boardName}».` : "Вы уверены?"}
              </p>
            </div>
            <div className="px-5 py-4 flex items-center justify-end gap-2 bg-card">
              <button
                type="button"
                onClick={onCancel}
                className="h-10 rounded-xl px-4 border border-border bg-card text-sm text-text hover:bg-bg transition-all duration-150"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="h-10 rounded-xl px-4 bg-danger text-white text-sm shadow-soft hover:brightness-105 transition-all duration-150"
              >
                Удалить
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
