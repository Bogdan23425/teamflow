import { getAccessToken } from "@/shared/auth/session";

export const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:3001";

type Options = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

type ApiErrorPayload = {
  error?: unknown;
  message?: unknown;
};

type ApiFieldErrors = Record<string, string>;

export class ApiError extends Error {
  status: number;
  payload: ApiErrorPayload | null;
  fieldErrors?: ApiFieldErrors;

  constructor(args: {
    message: string;
    status: number;
    payload: ApiErrorPayload | null;
    fieldErrors?: ApiFieldErrors;
  }) {
    super(args.message);
    this.name = "ApiError";
    this.status = args.status;
    this.payload = args.payload;
    this.fieldErrors = args.fieldErrors;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

function extractFieldErrors(raw: unknown): ApiFieldErrors | undefined {
  if (!raw || typeof raw !== "object" || !("fieldErrors" in raw)) return undefined;
  const { fieldErrors } = raw as { fieldErrors?: Record<string, unknown> };
  if (!fieldErrors || typeof fieldErrors !== "object") return undefined;

  const normalized: ApiFieldErrors = {};
  for (const [key, value] of Object.entries(fieldErrors)) {
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === "string") {
      normalized[key] = value[0];
    }
  }

  return Object.keys(normalized).length ? normalized : undefined;
}

function pickMessage(payload: ApiErrorPayload | null, status: number, fieldErrors?: ApiFieldErrors) {
  if (fieldErrors && Object.values(fieldErrors).length > 0) {
    return Object.values(fieldErrors)[0];
  }

  const raw = payload?.error ?? payload?.message;
  if (typeof raw === "string") return mapKnownMessages(raw, status);
  if (Array.isArray(raw) && typeof raw[0] === "string") return raw[0];

  if (raw && typeof raw === "object" && "formErrors" in raw) {
    const { formErrors } = raw as { formErrors?: unknown };
    if (Array.isArray(formErrors) && typeof formErrors[0] === "string") return formErrors[0];
  }

  if (status >= 500) return "На сервере произошла ошибка. Попробуйте позже.";
  return "Запрос не удался. Попробуйте ещё раз.";
}

function mapKnownMessages(message: string, status: number) {
  const normalized = message.toLowerCase();
  if (normalized.includes("invalid credentials")) return "Неверный email или пароль";
  if (normalized.includes("user already exists")) return "Аккаунт с таким email уже зарегистрирован";
  if (normalized.includes("missing refresh token")) return "Нужно войти, чтобы продолжить";
  if (normalized.includes("invalid refresh token")) return "Сессия истекла, войдите снова";
  if (normalized.includes("user not found")) return "Пользователь не найден";
  if (status === 0) return "Не удалось связаться с сервером. Проверьте соединение.";
  return message;
}

export async function apiFetch<TResponse>(path: string, options: Options = {}): Promise<TResponse> {
  let response: Response;

  try {
    const token = getAccessToken();
    response = await fetch(`${API_URL}${path}`, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
      },
      credentials: "include",
      body: options.body ? JSON.stringify(options.body) : undefined
    });
  } catch (error) {
    throw new ApiError({
      message: mapKnownMessages("Network error", 0),
      status: 0,
      payload: null
    });
  }

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const payload: ApiErrorPayload | null = isJson ? await response.json() : null;

  if (!response.ok) {
    const fieldErrors = extractFieldErrors(payload?.error ?? payload);
    const message = pickMessage(payload, response.status, fieldErrors);
    throw new ApiError({
      message,
      status: response.status,
      payload,
      fieldErrors
    });
  }

  return payload as TResponse;
}
