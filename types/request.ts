import { User } from "#/database/query/user.ts";
import { createSessionKeyAndIv, SessionKeyAndIv } from "#/utils/session.ts";
import { SESSION_TOKEN } from "#/config.ts";
import { Database } from "jsr:@db/sqlite@0.11";
import { getDb } from "#/database/db.ts";
import { createMailClient, type MailClient } from "#/services/mail.ts";

let sessionKeyAndIv: SessionKeyAndIv;

export class Context {
  private static context: Context;
  public sessionKeyAndIv: SessionKeyAndIv;
  public db: Database;
  public mail: MailClient;
  public user: User | null;

  public constructor(sessionKeyAndIv: SessionKeyAndIv) {
    this.sessionKeyAndIv = sessionKeyAndIv;
    this.db = getDb();
    this.mail = createMailClient();
    // appended in auth middleware
    this.user = null;
  }

  public static async init() {
    if (!sessionKeyAndIv) {
      sessionKeyAndIv = await createSessionKeyAndIv(SESSION_TOKEN);
    }
    Context.context = new Context(sessionKeyAndIv);
  }

  public static instance() {
    if (this.context) return this.context;
    else throw new Error("Context is not initialized!");
  }
}

export interface State {
  context: Context;
}

export interface Session {
  userId: number;
}
