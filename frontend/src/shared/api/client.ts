export const API_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:3001";

type Options = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

export async function apiFetch<TResponse>(path: string, options: Options = {}): Promise<TResponse> {
  const response = await fetch(`${API_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    credentials: "include",
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const message =
      (payload && (payload.error || payload.message)) ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload as TResponse;
}
