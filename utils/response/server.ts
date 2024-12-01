export function notFound(
  headers: Record<string, string> = {},
): Response {
  return new Response(null, {
    headers,
    status: 404,
  });
}

export function redirect(
  path: string,
  headers: Record<string, string> = {},
): Response {
  return new Response(null, {
    headers: { Location: path, ...headers },
    status: 303,
  });
}
