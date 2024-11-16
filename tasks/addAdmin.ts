import { getConnection } from "../database/db.ts";
import * as user from "../database/query/user.ts";
import { hashPassword } from "../utils/auth.ts";

let confirmed = false;
const userData = {
  name: "",
  email: "",
  passwordHash: "",
  role: "admin" as user.Role,
};

while (!confirmed) {
  userData.name = prompt("Enter name: ") ?? "";
  userData.email = prompt("Enter email: ") ?? "";
  userData.passwordHash = prompt("Enter password: ") ?? "";
  confirmed = confirm(`Going to created a user with:
    - name: ${userData.name}
    - email: ${userData.email}
    - password: ${userData.passwordHash}
Is that OK?`.trim());
}

try {
  using connection = getConnection();
  const { db } = connection;
  userData.passwordHash = await hashPassword(userData.passwordHash);
  user.createUser(db, userData);
  console.log("Successfully created admin user:", userData.name);
  Deno.exit(0);
} catch (e) {
  console.error(`Could not create user`, e);
  Deno.exit(1);
}
