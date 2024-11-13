import { Database } from "jsr:@db/sqlite@0.11";
import { DB_PATH } from "../config.ts";

export const db = new Database(DB_PATH);
