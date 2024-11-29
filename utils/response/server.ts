export function redirect(
  path: string,
  headers: Record<string, string> = {},
): Response {
  return new Response(null, {
    headers: { Location: path, ...headers },
    status: 303,
  });
}
