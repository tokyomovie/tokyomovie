function configEnvVar(name: string): string {
  const envVar = Deno.env.get(name);
  if (!envVar) {
    throw new Error(`[ERROR] config: ${name}`);
  }

  return envVar;
}

export const DB_PATH = configEnvVar("DB_PATH");
export const SESSION_TOKEN = configEnvVar("SESSION_TOKEN");
export const SENDGRID_API_KEY = configEnvVar("SENDGRID_API_KEY");
export const ADMIN_EMAIL_ADDRESS = configEnvVar("ADMIN_EMAIL_ADDRESS");
