import { load } from "@std/dotenv";
import * as migrate from "../database/migrate.ts";
import { Database } from "jsr:@db/sqlite@0.11";

async function runMigrateAll(envPath: string) {
  const { DB_PATH } = await load({
    envPath,
  });
  const db = new Database(DB_PATH);
  await migrate.migrateAll(db);
  db.close();
}


await runMigrateAll(`.env.development.local`);
await runMigrateAll(`.env.test.local`);
