import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/shared/ui/Button";

export const BottomCta: React.FC = () => {
  return (
    <section className="pt-10 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div className="space-y-2 max-w-xl">
          <h2 className="text-lg font-semibold">
            Запустите первую доску для своей команды
          </h2>
          <p className="text-sm text-text-muted">
            Создайте аккаунт, заведите команду и разложите задачи по колонкам за
            несколько минут. Без онбординга на полдня и сложных настроек.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/register">
            <Button>Создать команду</Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost">Войти</Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
