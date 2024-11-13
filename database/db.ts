import { Database } from "jsr:@db/sqlite@0.11";
import { DB_PATH } from "../config.ts";

type Connection = {
  db: Database;
  [Symbol.dispose]: () => void;
};

let connection: Connection;

export function getConnection(): Connection {
  if (!connection) {
    const db = new Database(DB_PATH);
    connection = {
      db,
      [Symbol.dispose]: () => {
        db.close();
      },
    };
  }

  return connection;
}
