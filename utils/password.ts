import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(8);

  return bcrypt.hash(password, salt);
}

export function checkPassword(hash: string, password: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
