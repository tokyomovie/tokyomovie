function reportConfigError(msg: string) {
  throw new Error(`error in config: ${msg}`);
}

const DB_PATH = Deno.env.get("DB_PATH") as string;
if (!DB_PATH) {
  reportConfigError("DB_PATH is required");
}

export { DB_PATH };
