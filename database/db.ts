import { Database } from "jsr:@db/sqlite@0.11";
import { DB_PATH } from "#/config.ts";

type Connection = {
  db: Database;
  [Symbol.dispose]: () => void;
};

/**
 * Can be used with the `using` keyword for quick and dirty access
 */
export function getConnection(): Connection {
  const db = new Database(DB_PATH);
  return {
    db,
    [Symbol.dispose]: () => {
      db.close();
    },
  };
}

let db: Database;

/**
 * Get a singleton reference to the db
 */
export function getDb(): Database {
  if (!db) {
    db = new Database(DB_PATH);
  }

  return db;
}

/**
 * Close the singleton reference to the db
 */
export function closeDb(): void {
  if (db) {
    db.close();
  }
}
