import { Database } from "jsr:@db/sqlite@0.11";

// TODO: move me to env
const DB_PATH = "test.db"
export const db = new Database(DB_PATH);;

// const [version] = db.prepare(".tables").value<[string]>()!;
