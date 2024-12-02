import { Handlers, PageProps } from "$fresh/server.ts";
import { z } from "zod";
import { updatePassword, User } from "#/database/query/user.ts";
import Button from "#/islands/Button.tsx";
import { InputField } from "#/islands/form/mod.ts";
import { hashPassword } from "#/utils/auth.ts";
import { errorsToString } from "#/utils/forms.ts";
import { State } from "#/types/request.ts";

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
        flash: {
          message: "An unexpected error occurred.",
          type: "error",
        },
        user,
      });
    }

    if (!parsed.success) {
      return ctx.render({
        flash: {
          message: errorsToString(parsed.error.errors),
          type: "error",
        },
        user,
      });
    }

    if (password !== passwordConfirm) {
      return ctx.render({
        flash: {
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
        flash: {
          message: `Password successfully updated.`,
          type: "success",
        },
        user: ctx.state.context.user,
      });
    } catch (e) {
      console.error(e);
      return ctx.render({
        flash: {
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
  flash?: { message: string; type: string };
};

export default function Users(props: PageProps<UpdatePassword>) {
  const { user, flash } = props.data;
  return (
    <div class="flex flex-col gap-8 p-4">
      <h1 class="text-xl font-bold">Password Update</h1>
      {flash && <p class={`p-2 m-0 p-0 text-${flash.type}`}>{flash.message}</p>}
      <form method="post">
        <div class="flex flex-col text-xs gap-4">
          <h2 class="text-lg font-bold">
            Update the password for {user?.name}
          </h2>
          <InputField
            label="Password"
            type="password"
            name="password"
            helperText="must contain a number and a capital letter"
          />
          <InputField
            label="Confirm Password"
            type="password"
            name="passwordConfirm"
            helperText="We just need to make sure you can type"
          />
          <div>
            <Button type="submit">
              Create User
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
