import { Database } from "jsr:@db/sqlite@0.11";
import { DB_PATH } from "../config.ts";

type Connection = {
  db: Database;
  [Symbol.dispose]: () => void;
};

export function getConnection(): Connection {
  const db = new Database(DB_PATH);
  return {
    db,
    [Symbol.dispose]: () => {
      db.close();
    },
  };
}
