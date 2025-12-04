// src/features/auth/register/Register.tsx
import React, { useMemo, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils/cn";

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

type PasswordStrength = {
  score: 0 | 1 | 2 | 3;
  label: string;
  description: string;
  colorClass: string;
};

const getPasswordStrength = (value: string): PasswordStrength => {
  if (!value) {
    return {
      score: 0,
      label: "",
      description: "",
      colorClass: "text-text-muted",
    };
  }

  let score: 0 | 1 | 2 | 3 = 0;
  if (value.length >= 8) score = (score + 1) as any;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score = (score + 1) as any;
  if (/\d/.test(value) || /[^A-Za-z0-9]/.test(value)) score = (score + 1) as any;

  if (score === 0 || score === 1) {
    return {
      score,
      label: "Слабый пароль",
      description: "Добавьте длину, цифры и специальные символы.",
      colorClass: "text-danger",
    };
  }

  if (score === 2) {
    return {
      score,
      label: "Нормальный пароль",
      description: "Можно улучшить: больше длины и разные символы.",
      colorClass: "text-text",
    };
  }

  return {
    score,
    label: "Сильный пароль",
    description: "Хороший пароль: длина, регистры, цифры и символы.",
    colorClass: "text-success",
  };
};

export const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});

  const strength = useMemo(
    () => getPasswordStrength(password),
    [password]
  );

  const validate = () => {
    const nextErrors: RegisterErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Введите имя";
    } else if (name.trim().length < 2) {
      nextErrors.name = "Слишком короткое имя";
    }

    if (!email.trim()) {
      nextErrors.email = "Введите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Некорректный email";
    }

    if (!password) {
      nextErrors.password = "Введите пароль";
    } else if (password.length < 8) {
      nextErrors.password = "Минимум 8 символов";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Повторите пароль";
    } else if (password && confirmPassword !== password) {
      nextErrors.confirmPassword = "Пароли не совпадают";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("register", { name, email, password });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-xl md:max-w-2xl rounded-2xl bg-surface border border-border/70 shadow-soft p-8 md:p-12 space-y-10"
    >
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Создайте аккаунт
        </h1>
        <p className="text-sm text-text-muted max-w-md">
          Соберите команду и управляйте задачами в одном месте.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <Input
          label="Имя"
          type="text"
          placeholder="Как к вам обращаться"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <div className="space-y-2">
          <Input
            label="Пароль"
            type="password"
            placeholder="Минимум 8 символов"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <AnimatePresence initial={false}>
            {password && (
              <motion.div
                key="password-strength"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="rounded-lg border border-border bg-surface shadow-soft p-3 text-xs"
              >
                <div className={cn("font-medium mb-1", strength.colorClass)}>
                  {strength.label}
                </div>
                <p className="text-[11px] text-text-muted leading-snug">
                  {strength.description}
                </p>
                <div className="mt-2 h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-200",
                      strength.score === 0 && "bg-danger w-1/4",
                      strength.score === 1 && "bg-danger w-1/3",
                      strength.score === 2 && "bg-primary w-2/3",
                      strength.score === 3 && "bg-success w-full"
                    )}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Input
          label="Повторите пароль"
          type="password"
          placeholder="Введите пароль ещё раз"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />

        <Button type="submit" fullWidth size="lg">
          Создать аккаунт
        </Button>
      </form>

      <p className="text-xs text-center text-text-muted">
        Уже есть аккаунт?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Войти
        </Link>
      </p>
    </motion.div>
  );
};
