import { Handlers, PageProps } from "$fresh/server.ts";
import { findUserById, findUsers, User } from "../../../database/query/user.ts";
import Button from "../../../islands/Button.tsx";
import { State } from "../../../types/request.ts";
import { createJwt } from "../../../services/jwt.ts";
import { SENDGRID_API_KEY } from "../../../config.ts";

export const handler: Handlers<ResetProps, State> = {
  async GET(_req, ctx) {
    const users = findUsers(ctx.state.context.db);
    return await ctx.render({ users });
  },
  async POST(req, ctx) {
    const { db, mail } = ctx.state.context;

    const form = await req.formData();
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
  },
};

type ResetProps = {
  users?: User[];
  flash?: { message: string; type: string };
};

export default function Reset(props: PageProps<ResetProps>) {
  const { users, flash } = props.data;
  return (
    <div class="flex flex-col gap-8 p-4">
      <h1 class="text-xl font-bold">Users Admin - Reset Password</h1>
      {flash && <p class={`p-2 m-0 p-0 text-${flash.type}`}>{flash.message}</p>}

      <div>
        <h2 class="text-xl font-bold">Users</h2>
        <ul>
          {users?.map(({ id, name, email }) => (
            <li>
              {name} - <a href={`mailto:${email}`}>{email}</a>
              <form method="post">
                <input type="hidden" name="userId" value={id} />
                <Button type="submit">Reset Password</Button>
              </form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
