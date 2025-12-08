import React, { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { cn } from "@/shared/utils/cn";
import {
  EnvelopeIcon,
  LockClosedIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { Toast, ToastViewport } from "@/shared/ui/Toast";
import * as authApi from "@/shared/api/auth";
import { isApiError } from "@/shared/api/client";

interface LoginErrors {
  email?: string;
  password?: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const validate = () => {
    const nextErrors: LoginErrors = {};

    if (!email.trim()) nextErrors.email = "Введите email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      nextErrors.email = "Некорректный email";

    if (!password) nextErrors.password = "Введите пароль";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setFormError(null);

    try {
      const res = await authApi.login({ email: email.trim(), password });
      localStorage.setItem("accessToken", res.accessToken);

      setShowSuccessToast(true);

      setTimeout(() => {
        navigate("/app");
      }, 900);

      setTimeout(() => {
        setShowSuccessToast(false);
        setIsSubmitting(false);
      }, 2500);
    } catch (err) {
      if (isApiError(err)) {
        if (err.fieldErrors) {
          setErrors((prev) => ({ ...prev, ...err.fieldErrors }));
        }
        setFormError(err.message);
      } else {
        setFormError("Не удалось войти");
      }
      setIsSubmitting(false);
    }
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
            Вход в аккаунт
          </h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email)
                setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={errors.email}
            leftIcon={<EnvelopeIcon className="h-5 w-5 text-text-muted" />}
            rightIcon={getStatusIcon(email, errors.email)}
          />

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

          <Button type="submit" fullWidth size="lg" disabled={isSubmitting}>
            {isSubmitting ? "Входим..." : "Войти"}
          </Button>

          {formError && (
            <div className="text-center text-sm text-danger">{formError}</div>
          )}

          <div className="pt-1 text-center text-xs text-text-muted">
            Нет аккаунта?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Создать
            </Link>
          </div>
        </form>
      </div>

      <ToastViewport>
        <Toast
          open={showSuccessToast}
          title="Добро пожаловать в TeamFlow"
          description="Вы успешно вошли в аккаунт. Перенаправляем в дашборд."
          onClose={() => setShowSuccessToast(false)}
        />
      </ToastViewport>
    </>
  );
};
