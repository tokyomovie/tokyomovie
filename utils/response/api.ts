const API_BASE_HEADERS = { "Content-Type": "application/json" };

export type ApiErrorKey = "user-error" | "not-found" | "unknown";

export type ApiError = {
  key: ApiErrorKey;
  msg: string;
};

export type ApiResponse<T> = {
  ok: true;
  data: T;
} | {
  ok: false;
  error: ApiError;
};

export function success<T>(data: T): Response {
  const body: ApiResponse<T> = {
    ok: true,
    data,
  };

  return new Response(JSON.stringify(body), {
    headers: API_BASE_HEADERS,
    status: 200,
  });
}

export function error(msg: string, key: ApiErrorKey = "unknown") {
  const body: ApiResponse<undefined> = { ok: false, error: { msg, key } };

  return new Response(JSON.stringify(body), {
    headers: API_BASE_HEADERS,
    status: 400,
  });
}

export function userError(msg: string, key: ApiErrorKey = "user-error") {
  const body: ApiResponse<undefined> = { ok: false, error: { msg, key } };

  return new Response(JSON.stringify(body), {
    headers: API_BASE_HEADERS,
    status: 422,
  });
}

export function notFound() {
  const body: ApiResponse<undefined> = {
    ok: false,
    error: { msg: "not found", key: "not-found" },
  };

  return new Response(JSON.stringify(body), {
    headers: API_BASE_HEADERS,
    status: 404,
  });
}
