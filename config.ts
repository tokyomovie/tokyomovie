function reportConfigError(msg: string) {
  throw new Error(`[ERROR] config: ${msg}`);
}

function reportConfigWarning(msg: string) {
  throw new Error(`[WARN] config: ${msg}`);
}

const DB_PATH = Deno.env.get("DB_PATH") as string;
if (!DB_PATH) {
  reportConfigError("DB_PATH is required");
}

const SESSION_TOKEN = Deno.env.get("SESSION_TOKEN") as string ||
  "master-session-token";
if (!SESSION_TOKEN) {
  reportConfigWarning(
    "SESSION_TOKEN will revert to default. This is unsafe in production.",
  );
}

export { DB_PATH, SESSION_TOKEN };
