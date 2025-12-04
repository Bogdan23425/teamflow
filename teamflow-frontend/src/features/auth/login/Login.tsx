// src/features/auth/login/Login.tsx
import React, { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface LoginErrors {
  email?: string;
  password?: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});

  const validate = () => {
    const nextErrors: LoginErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Введите email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Некорректный email";
    }

    if (!password.trim()) {
      nextErrors.password = "Введите пароль";
    } else if (password.length < 6) {
      nextErrors.password = "Минимум 6 символов";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("login", { email, password });
    navigate("/app");
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
          Вход в TeamFlow
        </h1>
        <p className="text-sm text-text-muted max-w-md">
          Авторизуйтесь, чтобы перейти к задачам команды.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            type="password"
            label="Пароль"
            placeholder="Ваш пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <Checkbox label="Запомнить меня" />
          <button
            type="button"
            className="text-xs text-primary hover:underline transition-colors"
          >
            Забыли пароль?
          </button>
        </div>

        <Button type="submit" fullWidth size="lg">
          Войти
        </Button>
      </form>

      <p className="text-xs text-center text-text-muted">
        Нет аккаунта?{" "}
        <Link to="/register" className="text-primary hover:underline">
          Зарегистрироваться
        </Link>
      </p>
    </motion.div>
  );
};
