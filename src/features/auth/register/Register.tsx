import React, { useMemo, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/utils/cn";
import {
  EnvelopeIcon,
  LockClosedIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { Toast, ToastViewport } from "@/shared/ui/Toast";

interface RegisterErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

type PasswordScore = 0 | 1 | 2 | 3;

const getPasswordScore = (value: string): PasswordScore => {
  if (!value) return 0;
  let score: PasswordScore = 1;
  if (value.length >= 8) score = (score + 1) as PasswordScore;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score = (score + 1) as PasswordScore;
  if (/\d/.test(value) || /[^A-Za-z0-9]/.test(value)) score = (score + 1) as PasswordScore;
  return score > 3 ? 3 : score;
};

const widthByScore: Record<PasswordScore, string> = {
  0: "0%",
  1: "33%",
  2: "66%",
  3: "100%",
};

const labelByScore: Record<PasswordScore, string> = {
  0: "",
  1: "Лёгкий",
  2: "Нормальный",
  3: "Сложный",
};

const colorByScore: Record<PasswordScore, string> = {
  0: "bg-border",
  1: "bg-danger",
  2: "bg-primary",
  3: "bg-success",
};

const textColorByScore: Record<PasswordScore, string> = {
  0: "text-text-muted",
  1: "text-danger",
  2: "text-primary",
  3: "text-success",
};

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const rawScore = useMemo(() => getPasswordScore(password), [password]);
  const hasPassword = password.length > 0;
  const activeScore: PasswordScore = hasPassword ? (rawScore === 0 ? 1 : rawScore) : 0;

  const validate = () => {
    const nextErrors: RegisterErrors = {};

    if (!email.trim()) nextErrors.email = "Введите email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      nextErrors.email = "Некорректный email";

    if (!password) nextErrors.password = "Введите пароль";
    else if (password.length < 8) nextErrors.password = "Минимум 8 символов";

    if (!confirmPassword) nextErrors.confirmPassword = "Повторите пароль";
    else if (password && confirmPassword !== password)
      nextErrors.confirmPassword = "Пароли не совпадают";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("register", { email, password });

      setShowSuccessToast(true);

      setTimeout(() => {
        navigate("/login");
      }, 900);

      setTimeout(() => {
        setShowSuccessToast(false);
        setIsSubmitting(false);
      }, 2500);
    }, 500);
  };

  const getStatusIcon = (value: string, error?: string) => {
    const hasValue = value.trim().length > 0;
    const hasError = !!error;
    if (!hasValue && !hasError) return null;

    return (
      <div
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-full border text-[10px]",
          hasError
            ? "border-danger text-danger bg-danger/10"
            : "border-success text-success bg-success/10"
        )}
      >
        {hasError ? (
          <XMarkIcon className="h-3.5 w-3.5" />
        ) : (
          <CheckIcon className="h-3.5 w-3.5" />
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className="
          relative
          w-full
          md:w-[520px]
          lg:w-[520px]
          rounded-2xl bg-surface 
          border border-border/70 
          shadow-soft 
          p-6 md:p-10 
          space-y-7
        "
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Создайте аккаунт
          </h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={errors.email}
            leftIcon={<EnvelopeIcon className="h-5 w-5 text-text-muted" />}
            rightIcon={getStatusIcon(email, errors.email)}
          />

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              error={errors.password}
              leftIcon={<LockClosedIcon className="h-5 w-5 text-text-muted" />}
              rightIcon={getStatusIcon(password, errors.password)}
            />

            <AnimatePresence initial={false}>
              {hasPassword && (
                <motion.div
                  key="password-strength"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="space-y-1"
                >
                  <div
                    className={cn(
                      "text-[11px] leading-none",
                      textColorByScore[activeScore]
                    )}
                  >
                    {labelByScore[activeScore]}
                  </div>

                  <div className="relative h-1.5 w-full rounded-full bg-border overflow-hidden">
                    <motion.div
                      className={cn("h-full rounded-full", colorByScore[activeScore])}
                      initial={false}
                      animate={{ width: widthByScore[activeScore] }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Input
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword)
                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }}
            error={errors.confirmPassword}
            leftIcon={<LockClosedIcon className="h-5 w-5 text-text-muted" />}
            rightIcon={getStatusIcon(confirmPassword, errors.confirmPassword)}
          />

          <Button type="submit" fullWidth size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Создаём..." : "Создать аккаунт"}
          </Button>

          <div className="pt-1 text-center text-xs text-text-muted">
            Уже есть аккаунт?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Войти
            </Link>
          </div>
        </form>
      </div>

      <ToastViewport>
        <Toast
          open={showSuccessToast}
          title="Аккаунт создан"
          description="Вы успешно зарегистрировались. Перенаправляем на страницу входа."
          onClose={() => setShowSuccessToast(false)}
        />
      </ToastViewport>
    </>
  );
};
