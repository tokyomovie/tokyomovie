import { Handlers, PageProps } from "$fresh/server.ts";
import { getConnection } from "../../database/db.ts";
import { Role } from "../../database/query/user.ts";
import { createUser, findUsers, User } from "../../database/query/user.ts";
import { hashPassword } from "../../utils/auth.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
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
    const user = {
      name,
      email,
      passwordHash: await hashPassword(password),
      role,
    };

    // Add email to list.
    try {
      // TODO: validation solution
      if (Object.values(user).some(v => !v)) {
        throw Error(`invalid user`)
      }

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

function InputField(
  { name, type, value }: { name: string; type: string; value?: string },
) {
  return (
    <div class="flex gap-2">
      <label>{name}</label>
      <input class="border" type={type} name={name} value={value} />
    </div>
  );
}

function SelectField(
  { name, options }: {
    name: string;
    options: { value: string; label: string }[];
  },
) {
  return (
    <div class="flex gap-2">
      <label>{name}</label>
      <select name={name}>
        {options.map(({ value, label }) => (
          <option value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}

export default function Users(
  props: PageProps<
    { users?: User[]; flash?: { message: string; type: string } }
  >,
) {
  const { users, flash } = props.data;
  return (
    <div class="flex flex-col gap-8 p-4">
      <h1 class="text-xl font-bold">Users Admin</h1>
      {flash && <p class={`p-2 text-${flash.type}`}>{flash.message}</p>}
      <form method="post">
        <h2 class="text-xl font-bold">Create a User</h2>
        <div class="flex flex-col text-xs">
          <InputField type="text" name="name" />
          <InputField type="email" name="email" />
          <InputField type="password" name="password" />
          <SelectField
            name="role"
            options={[
              { label: "User", value: "user" },
              { label: "Admin", value: "admin" },
            ]}
          />
          <div>
            <button class="py-2 px-4 border rounded" type="submit">
              Create User
            </button>
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
