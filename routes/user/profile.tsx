import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { State } from "#/types/request.ts";
import Stars from "#/islands/stars/Stars.tsx";
import Title from "#/components/Title.tsx";
import Card from "#/components/Card.tsx";
import Divider from "#/components/Divider.tsx";
import Button from "#/islands/Button.tsx";
import { startResetPasswordProcess } from "#/services/password.ts";

async function handleResetPassword(ctx: FreshContext<State>) {
  const { user, mail } = ctx.state.context;

  if (!user) {
    return ctx.render({
      flash: {
        message: "No user associated with that ID.",
        type: "error",
      },
    });
  }

  try {
    const wasSent = await startResetPasswordProcess(mail, user);
    if (!wasSent) {
      return ctx.render({
        flash: {
          message:
            `There was an error e-mailing you. Please contact the site administrator.`,
          type: "error",
        },
      });
    }
    return ctx.render({
      flash: {
        message: `You has been e-mailed to reset their password`,
        type: "success",
      },
    });
  } catch (e) {
    console.error(e);
    return ctx.render({
      flash: {
        message: `An unknown error occured resetting password`,
        type: "error",
      },
    });
  }
}

export const handler: Handlers<null, State> = {
  GET(_req, ctx) {
    return ctx.render();
  },
  async POST(_req, ctx) {
    return await handleResetPassword(ctx);
  },
};

type EventProps = {
  flash?: { message: string; type: string };
};

export default function Event(props: PageProps<EventProps, State>) {
  const { flash } = props.data || {};
  const { user } = props.state.context;
  return (
    <div>
      <div>
        {flash && <p class={`p-2 text-${flash.type}`}>{flash.message}</p>}
        <div class="p-6">
          <Title level={1}>Profile</Title>
        </div>
        <div class="px-6">
          <Title level={3}>Info</Title>
          <Card>
            <div class="flex flex-col gap-2">
              <span>
                <span class="text-razzmataz">Name:</span> {user?.name}
              </span>
              <span>
                <span class="text-razzmataz">E-mail:</span> {user?.email}
              </span>
              <span>
                <span class="text-razzmataz">Role:</span> {user?.role}
              </span>
            </div>
          </Card>
          <Divider />
          <Title level={3}>Password</Title>

          <form method="post">
            <Button type="submit">Reset Password</Button>
          </form>
        </div>
      </div>
      <Stars />
    </div>
  );
}
