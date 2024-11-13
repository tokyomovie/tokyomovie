import { Database } from "jsr:@db/sqlite@0.11";
import { hashPassword } from "../../utils/password.ts";

export type Role = "user" | "admin";

export type UserRecord = {
  id: number;
  name: string;
  role: Role;
  email: string;
  passwordHash: string;
};

export type User = Omit<UserRecord, 'passwordHash'>

export type UserCreate = Omit<User, "passwordHash" | "id"> & {
  password: string;
};

export async function createUser(db: Database, user: UserCreate): Promise<User> {
  const passwordHash = await hashPassword(user.password);

  const stmt = db.prepare(`
    INSERT INTO users
      (name, role, email, passwordHash)
    VALUES (:name, :role, :email, :passwordHash)
    RETURNING id, name, role, email
  `);
  //@ts-ignore: because
  delete user.password;
  const [created] = stmt.all<User>({...user, passwordHash});

  return created;
}

export function findUserByEmail(db: Database, email: string): null | User {
  const stmt = db.prepare(`
    SELECT * FROM users
    WHERE email = ?
    LIMIT 1
  `);
  const [user] = stmt.all<User>(email);

  return user ?? null;
}

export function deleteUser(db: Database, id: number): number {
  return db.exec(`
    DELETE FROM users
    WHERE id = ?
  `, id);
}
