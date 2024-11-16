import { load } from "@std/dotenv";
import * as migrate from "../database/migrate.ts";

async function runMigrateOne() {
  const { getConnection } = await import("../database/db.ts");
  using connection = getConnection();
  await migrate.migrateOne(connection.db);
}
async function runMigrateAll() {
  const { getConnection } = await import("../database/db.ts");
  using connection = getConnection();
  await migrate.migrateAll(connection.db);
}
async function runRollbackOne() {
  const { getConnection } = await import("../database/db.ts");
  using connection = getConnection();
  await migrate.rollbackOne(connection.db);
}
async function runRollbackAll() {
  const { getConnection } = await import("../database/db.ts");
  using connection = getConnection();
  await migrate.rollbackAll(connection.db);
}

const migrationCmds = [
  {
    name: "Migrate everything",
    fn: runMigrateAll,
    dangerous: false,
  },
  {
    name: "Migrate next migration",
    fn: runMigrateOne,
    dangerous: false,
  },
  {
    name: "Rollback last migration",
    fn: runRollbackOne,
    dangerous: true,
  },
  {
    name: "Rollback all migrations",
    fn: runRollbackAll,
    dangerous: true,
  },
];

async function main() {
  const environment = prompt(
    'Which environment would you like to run a migration in? (e.g. "development" or "test")\nDefault: "development"',
  ) || "development";
  await load({
    envPath: `.env.${environment}.local`,
    export: true,
  });

  let cmd: (typeof migrationCmds)[0] | undefined;
  const cmdList = migrationCmds.map(({ name }, i) => `[${i}] ${name}`).join(
    "\n",
  );
  while (!cmd) {
    const selection = prompt(
      `Which command would you like to run? (default: "0")\n${cmdList}`,
    ) || "0";
    cmd = migrationCmds[Number(selection)];

    if (!cmd) {
      console.log(`Invalid selection, try "0", "1", ...etc`);
    }
  }

  if (cmd.dangerous) {
    if (!confirm(`Are you sure you want to run: ${cmd.name}???`)) {
      Deno.exit(0);
    }
  }

  await cmd.fn();
}

await main();
