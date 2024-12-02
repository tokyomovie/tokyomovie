import { Handlers, PageProps } from "$fresh/server.ts";
import { z } from "zod";
import { updatePassword, User } from "#/database/query/user.ts";
import Button from "#/islands/Button.tsx";
import { InputField } from "#/islands/form/mod.ts";
import { hashPassword } from "#/utils/auth.ts";
import { errorsToString } from "#/utils/forms.ts";
import { State } from "#/types/request.ts";
import Info, { InfoProps } from "#/components/Info.tsx";

const updatePasswordSchema = z.object({
  password: z.string().min(8).regex(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
  ),
});

export const handler: Handlers<UpdatePassword, State> = {
  async GET(_req, ctx) {
    return await ctx.render({ user: ctx.state.context.user });
  },
  async POST(req, ctx) {
    const { db, user } = ctx.state.context;

    const form = await req.formData();
    const password = form.get("password")?.toString() || "";
    const passwordConfirm = form.get("passwordConfirm")?.toString() || "";

    const parsed = await updatePasswordSchema.safeParseAsync({
      password,
    });
    if (!user) {
      return ctx.render({
        info: {
          message: "An unexpected error occurred.",
          type: "error",
        },
        user,
      });
    }

    if (!parsed.success) {
      return ctx.render({
        info: {
          message: errorsToString(parsed.error.errors),
          type: "error",
        },
        user,
      });
    }

    if (password !== passwordConfirm) {
      return ctx.render({
        info: {
          message:
            "Passwords don't match, TRY TO TYPE BETTER THIS TIME hehehehe",
          type: "error",
        },
        user,
      });
    }
    const passwordHash = await hashPassword(parsed.data.password);

    try {
      updatePassword(db, user.id, passwordHash);
      return ctx.render({
        info: {
          message: `Password successfully updated.`,
          type: "success",
        },
        user: ctx.state.context.user,
        reset: true,
      });
    } catch (e) {
      console.error(e);
      return ctx.render({
        info: {
          message: `Error resetting password`,
          type: "error",
        },
        user: ctx.state.context.user,
      });
    }
  },
};

type UpdatePassword = {
  user: User | null;
  info?: InfoProps;
  reset?: boolean;
};

export default function Users(props: PageProps<UpdatePassword>) {
  const { user, info, reset = false } = props.data;
  return (
    <div class="flex flex-col gap-8 p-4">
      <h1 class="text-xl font-bold">Password Update</h1>
      {info && (
        <Info type={info.type}>
          <div>{info.message}</div>
          {reset && (
            <div>
              Return to <a href="/login" class="text-highlight">login page</a>
            </div>
          )}
        </Info>
      )}
      <form method="post">
        <div class="flex flex-col text-xs gap-4">
          <h2 class="text-lg font-bold">
            Update the password for {user?.name} - {user?.email}
          </h2>
          <InputField
            label="Password"
            type="password"
            name="password"
            helperText="Must contain a number and a capital letter"
            disabled={reset}
          />
          <InputField
            label="Confirm Password"
            type="password"
            name="passwordConfirm"
            helperText="We just need to make sure you can type"
            disabled={reset}
          />
          <div>
            <Button type="submit" disabled={reset}>
              Update Password
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
