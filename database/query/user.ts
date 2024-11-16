import { Database } from "jsr:@db/sqlite@0.11";

export type Role = "user" | "admin";

export type User = {
  id: number;
  name: string;
  role: Role;
  email: string;
  passwordHash: string;
};

export type UserCreate = Omit<User, "id">;

export function findUsers(db: Database, opts = {
  limit: 10,
  offset: 0,
}): User[] {
  const stmt = db.prepare(`
    SELECT * FROM users
    LIMIT ? OFFSET ?
  `);
  const rows = stmt.all<User>(opts.limit, opts.offset);

  return rows;
}

export function createUser(db: Database, user: UserCreate): User {
  const stmt = db.prepare(`
    INSERT INTO users
      (name, role, email, passwordHash)
    VALUES (:name, :role, :email, :passwordHash)
    RETURNING id, name, role, email
  `);
  const [created] = stmt.all<User>(user);

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
  return db.exec(
    `
    DELETE FROM users
    WHERE id = ?
  `,
    id,
  );
}
