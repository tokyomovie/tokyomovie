import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    return await ctx.render();
  },
};

export default function Admin() {
  return (
    <>
      <h1 class="text-xl font-bold py-4">Admin</h1>
      <nav class="p-2 border rounded">
        <ul>
          <li>
            <a href="/admin/event">Events</a>
          </li>
          <li>
            <a href="/admin/movie">Movies</a>
          </li>
          <li>
            <a href="/admin/user">Users</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
