import { Handlers, PageProps } from "$fresh/server.ts";
import { USER_ROLE } from "../../constants/user.ts";
import { getConnection } from "../../database/db.ts";
import { Role } from "../../database/query/user.ts";
import { createUser, findUsers, User } from "../../database/query/user.ts";
import Button from "../../islands/Button.tsx";
import { InputField, SelectField } from "../../islands/form/mod.ts";
import { hashPassword } from "../../utils/auth.ts";
import { z } from "zod";
import { errorsToString } from "../../utils/forms.ts";

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8).regex(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
    "must contain a number and a symbol",
  ),
  role: z.enum(USER_ROLE),
});

export const handler: Handlers = {
  async GET(_req, ctx) {
    using connection = getConnection();
    const users = findUsers(connection.db);
    return await ctx.render({ users });
  },
  async POST(req, ctx) {
    using connection = getConnection();

    const form = await req.formData();
    const name = form.get("name")?.toString() || "";
    const email = form.get("email")?.toString() || "";
    const password = form.get("password")?.toString() || "";
    const role = form.get("role")?.toString() as Role;

    const parsed = await createUserSchema.safeParseAsync({
      name,
      email,
      password,
      role,
    });
    if (!parsed.success) {
      return ctx.render({
        flash: {
          message: errorsToString(parsed.error.errors),
          type: "error",
        },
      });
    }

    try {
      const { data } = parsed;
      const user = {
        ...data,
        passwordHash: await hashPassword(data.password),
      };
      // @ts-ignore because
      delete user.password;
      createUser(connection.db, user);
      const users = findUsers(connection.db);

      return ctx.render({
        flash: {
          message: `User successfully created`,
          type: "success",
        },
        users,
      });
    } catch (e) {
      console.error(e);
      return ctx.render({
        flash: {
          message: `Error creating user`,
          type: "error",
        },
      });
    }
  },
};

type UsersProps = {
  users?: User[];
  flash?: { message: string; type: string };
};

export default function Users(props: PageProps<UsersProps>) {
  const { users, flash } = props.data;
  return (
    <div class="flex flex-col gap-8 p-4">
      <h1 class="text-xl font-bold">Users Admin</h1>
      {flash && <pre class={`p-2 text-${flash.type}`}>{flash.message}</pre>}
      <form method="post">
        <div class="flex flex-col text-xs gap-4">
          <h2 class="text-lg font-bold">Create a User</h2>
          <InputField label="Name" type="text" name="name" />
          <InputField label="E-mail" type="email" name="email" />
          <InputField label="Password" type="password" name="password" />
          <SelectField
            label="Role"
            name="role"
            options={[
              { label: "User", value: "user" },
              { label: "Admin", value: "admin" },
            ]}
          />
          <div>
            <Button type="submit">
              Create User
            </Button>
          </div>
        </div>
      </form>

      <div>
        <h2 class="text-xl font-bold">Users</h2>
        <ul>
          {users?.map(({ name, email }) => (
            <li>
              {name} - <a href={`mailto:${email}`}>{email}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
