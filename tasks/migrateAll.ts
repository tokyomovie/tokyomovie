import { load } from "@std/dotenv";
import * as migrate from "#/database/migrate.ts";
import { Database } from "jsr:@db/sqlite@0.11";

const [path] = Deno.args;

async function runMigrateAll(envPath: string) {
  let dbPath;
  if (envPath) {
    const { DB_PATH } = await load({
      envPath,
    });
    dbPath = DB_PATH;
  } else {
    dbPath = Deno.env.get("DB_PATH") || "";
  }

  const db = new Database(dbPath);
  await migrate.migrateAll(db);
  db.close();
}

await runMigrateAll(path);
