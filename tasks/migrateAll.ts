import { load } from "@std/dotenv";
import * as migrate from "../database/migrate.ts";

async function runMigrateAll() {
  const { getConnection } = await import("../database/db.ts");
  using connection = getConnection();
  await migrate.migrateAll(connection.db);
}

await load({
  envPath: `.env.development.local`,
  export: true,
});
await runMigrateAll();

await load({
  envPath: `.env.test.local`,
  export: true,
});
await runMigrateAll();
