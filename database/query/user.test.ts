import { expect } from "@std/expect";
import { createUser, deleteUser, User } from "./user.ts";
import { getConnection } from "../db.ts";
import { findUserByEmail, findUserById } from "./user.ts";

Deno.test("database operations", async (t) => {
  using connection = getConnection();
  const { db } = connection;
  let user: User;
  await t.step("insert user", () => {
    user = createUser(db, {
      name: "foo",
      email: "foo@fooland.com",
      role: "admin",
      passwordHash: "password",
    });

    expect(user.id).toBeTruthy();
    // @ts-ignore yeahhhhh
    expect(user.passwordHash).toBeUndefined();
  });

  await t.step("find user with email", () => {
    const user = findUserByEmail(db, "foo@fooland.com");
    expect(user).not.toBeUndefined();
    const userNotExist = findUserByEmail(db, "doop@fooland.com");
    expect(userNotExist).toBeNull();
  });

  await t.step("find user with id", () => {
    const found = findUserById(db, user.id);
    expect(found).not.toBeUndefined();

    const userNotExist = findUserById(db, Date.now());
    expect(userNotExist).toBeNull();
  });

  await t.step("delete user", () => {
    expect(deleteUser(db, user.id)).toBe(1);
  });
});
