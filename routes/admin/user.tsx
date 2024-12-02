import { z } from "zod";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { USER_ROLE } from "#/constants/user.ts";
import { findUserById, Role } from "#/database/query/user.ts";
import { createUser, findUsers, User } from "#/database/query/user.ts";
import Button from "#/islands/Button.tsx";
import { InputField, SelectField } from "#/islands/form/mod.ts";
import { hashPassword } from "#/utils/auth.ts";
import { errorsToString } from "#/utils/forms.ts";
import { State } from "#/types/request.ts";
import { createJwt } from "#/services/jwt.ts";

async function handleResetPassword(form: FormData, ctx: FreshContext<State>) {
  const { db, mail } = ctx.state.context;

  const userId = parseInt(form.get("userId")?.toString() || "");
  if (!userId) {
    return ctx.render({
      flash: {
        message: "Please contact the site owner.",
        type: "error",
      },
      users: findUsers(db),
    });
  }
  const user = findUserById(db, userId);
  if (!user) {
    return ctx.render({
      flash: {
        message: "No user associated with that ID.",
        type: "error",
      },
      users: findUsers(db),
    });
  }

  try {
    const jwt = await createJwt(userId, {}, 60 * 15);
    const message = {
      to: user.email,
      subject: "Password change request at tokyomovie.group",
      text:
        `Hey, someone special from TokyoMovie.Group says you requested to change your password. So go over to http://localhost:8000/reset-password?u=${userId}&j=${jwt} to change it. This request will be invalid in fifteen minutes.
      
      If you didn't request this, then their may be an issue and you should probably get in contact with the tokyomovie.group administrator.`,
      html:
        `<p>Hey, someone special from TokyoMovie.Group says you requested to change your password. So <a href="http://localhost:8000/reset-password?u=${userId}&j=${jwt}">go over to https://tokyomovie.group</a> to change it. This request will be invalid in fifteen minutes.</p>
      </p>If you didn't request this, then their may be an issue and you should probably get in contact with the tokyomovie.group administrator.</p>`,
    };
    const wasSent = await mail.send(message);
    if (!wasSent) {
      return ctx.render({
        flash: {
          message: `There was an error sending the update password e-mail`,
          type: "error",
        },
        users: findUsers(db),
      });
    }
    return ctx.render({
      flash: {
        message: `The user has been e-mailed to reset their password`,
        type: "success",
      },
      users: findUsers(db),
    });
  } catch (e) {
    console.error(e);
    return ctx.render({
      flash: {
        message: `Error creating user`,
        type: "error",
      },
      users: findUsers(db),
    });
  }
}

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8).regex(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
    "must contain a number and a capital letter",
  ),
  role: z.enum(USER_ROLE),
});

async function handleCreateUser(form: FormData, ctx: FreshContext<State>) {
  const { db } = ctx.state.context;
  const name = form.get("name")?.toString() || "";
  const email = form.get("email")?.toString() || "";
  const password = form.get("password")?.toString() || "";
  const passwordConfirm = form.get("passwordConfirm")?.toString() || "";
  const role = form.get("role")?.toString() as Role;
  const formInputs = {
    name,
    email,
    password,
    passwordConfirm,
    role,
  };

  if (password !== passwordConfirm) {
    return ctx.render({
      flash: {
        message: "Passwords don't match, TRY TO TYPE BETTER THIS TIME hehehehe",
        type: "error",
      },
      users: findUsers(db),
      form: formInputs,
    });
  }

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
      users: findUsers(db),
      form: formInputs,
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
    createUser(db, user);

    return ctx.render({
      flash: {
        message: `User successfully created`,
        type: "success",
      },
      users: findUsers(db),
      form: formInputs,
    });
  } catch (e) {
    console.error(e);
    return ctx.render({
      flash: {
        message: `Error creating user`,
        type: "error",
      },
      users: findUsers(db),
      form: formInputs,
    });
  }
}

export const handler: Handlers<UsersProps, State> = {
  async GET(_req, ctx) {
    const users = findUsers(ctx.state.context.db);
    return await ctx.render({ users });
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const actionName = form.get("action")?.toString() || "";
    if (actionName === "reset-password") {
      return await handleResetPassword(form, ctx);
    }

    return await handleCreateUser(form, ctx);
  },
};

function UserRow({ id, name, email }: User) {
  return (
    <li class="flex flex-row items-center">
      <span class="grow">
        {name} - <a href={`mailto:${email}`}>{email}</a>
      </span>
      <span>
        <form method="post">
          <input type="hidden" name="action" value="reset-password" />
          <input type="hidden" name="userId" value={id} />
          <Button type="submit">Reset Password</Button>
        </form>
      </span>
    </li>
  );
}

type UsersProps = {
  users?: User[];
  flash?: { message: string; type: string };
  form?: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    role: Role;
  };
};

export default function Users(props: PageProps<UsersProps>) {
  const { users, flash, form } = props.data;
  return (
    <div class="flex flex-col gap-8 p-4">
      <h1 class="text-xl font-bold">Users Admin</h1>
      {flash && <p class={`p-2 m-0 p-0 text-${flash.type}`}>{flash.message}</p>}
      <form method="post">
        <div class="flex flex-col text-xs gap-4">
          <h2 class="text-lg font-bold">Create a User</h2>
          <input type="hidden" name="action" value="create-user" />
          <InputField value={form?.name} label="Name" type="text" name="name" />
          <InputField
            value={form?.email}
            label="E-mail"
            type="email"
            name="email"
          />
          <InputField
            value={form?.password}
            label="Password"
            type="password"
            name="password"
          />
          <InputField
            value={form?.passwordConfirm}
            label="Confirm Password"
            type="password"
            name="passwordConfirm"
            helperText="We just need to make sure you can type"
          />
          <SelectField
            label="Role"
            name="role"
            value={form?.role}
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
          {users?.map(UserRow)}
        </ul>
      </div>
    </div>
  );
}
