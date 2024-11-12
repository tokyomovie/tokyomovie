import { Database } from "jsr:@db/sqlite@0.11";

const MIGRATIONS_TABLE = "migrations"
const MIGRATIONS_PATH = "database/migrations"

type MigrationRecord = {
  name: string;
  created_at: string;
}

type Migration = {
  name: string;
  createdAt: string;
}

async function fileToString(path: string): Promise<string> {
  const decoder = new TextDecoder("utf-8");
  const data = await Deno.readFile(path);

  return decoder.decode(data)
}

function createMigration(db: Database, { name, createdAt }: Migration) {
  return db.exec(`
    INSERT INTO ${MIGRATIONS_TABLE}
      (name, created_at)
    VALUES ('${name}', '${createdAt}');
  `) 
}

function deleteMigration(db: Database, name: string) {
  return db.exec(`
    DELETE FROM ${MIGRATIONS_TABLE}
    WHERE name = '${name}'
  `) 
}

function getMigrations(db: Database): Migration[] { 
  const stmt = db.prepare(`
    SELECT name, created_at FROM ${MIGRATIONS_TABLE}
  `);
  const rows = stmt.all<MigrationRecord>();

  return rows.map(({ name, created_at }) => ({ name, createdAt: created_at }))
}

function runMigrationUp(db: Database, sql: string, name: string) {
  const runTransaction = db.transaction(() => {
    db.exec(sql);
    const createdCount = createMigration(db, { name, createdAt: Date.now().toString() });
    if (!createdCount) {
      throw Error(`Could not create migration: ${name}`);
    }
  });
  runTransaction();
}

function runMigrationDown(db: Database, sql: string, name: string) {
  const runTransaction = db.transaction(() => {
    db.exec(sql);
    const deletedCount = deleteMigration(db, name);
    if (!deletedCount) {
      throw Error(`Could not delete migration: ${name}`);
    }
  });
  runTransaction();
}

async function getMigrationsToRun(db: Database): Promise<{ sql: string, name: string }[]> {
  const files = [];
  const migrationNames = getMigrations(db).map(m => m.name);

  for await (const file of Deno.readDir(MIGRATIONS_PATH)) {
    if (file.isFile && file.name.endsWith("up.sql")) {
      files.push(file);
    }
  }

  const filtered = files.filter(f => !migrationNames.includes(f.name.replace(".up.sql", "")));
  const migrationsToRun = [];
  for (const f of filtered) {
    const p = `${MIGRATIONS_PATH}/${f.name}`;
    const sql = await fileToString(p);
    migrationsToRun.push({
      sql,
      name: f.name.replace(".up.sql", ""),
    });
  }

  return migrationsToRun;
}

function tableExists(db: Database, tableName: string) {
  return db.sql`
    SELECT name FROM sqlite_master 
    WHERE type='${tableName}' AND name='{${tableName}}';
  `.length !== 0;
}

function createMigrationsTable(db: Database) {
  return db.exec(`
    CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (
      name TEXT PRIMARY KEY,
      created_at TEXT NOT NULL
    );
  `)
}

export async function rollback(db: Database) {
  const migrations = getMigrations(db)
  const lastMigration = migrations[migrations.length - 1];

  if (!lastMigration) {
    console.log('No migration to run.');
    return;
  }

  const sql = await fileToString(`${MIGRATIONS_PATH}/${lastMigration.name}.down.sql`);
  if (!sql) {
    console.error('Could not find migration file for :', lastMigration.name);
    return;
  }

  console.log(`Rolling back ${lastMigration.name}`);
  runMigrationDown(db, sql, lastMigration.name);
}

export async function runMigrationsIfNecessary(db: Database) {
  if (!tableExists(db, MIGRATIONS_TABLE)) {
    createMigrationsTable(db);
  }

  const migrationsToRun = await getMigrationsToRun(db);
  if (!migrationsToRun.length) {
    return;
  }

  console.log(`Found migrations to run.`)
  for (const migrationToRun of migrationsToRun) {
    console.log(`Running migration: ${migrationToRun.name}`);
    runMigrationUp(db, migrationToRun.sql, migrationToRun.name);
  }
  console.log(`Successfully migrated.`)
}
