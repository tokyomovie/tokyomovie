import { FreshContext, PageProps } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";
import { getConnection } from "../database/db.ts";
import { findUserByEmail } from "../database/query/user.ts";
import Button from "../islands/Button.tsx";
import { InputField } from "../islands/form/mod.ts";
import { z } from "zod";
import { checkPassword } from "../utils/auth.ts";
import { encodeSession } from "../utils/session.ts";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const handler = {
  async POST(req: Request, ctx: FreshContext) {
    using connection = getConnection();

    const form = await req.formData();
    const email = form.get("email")?.toString() || "";
    const password = form.get("password")?.toString() || "";

    const parsed = await loginSchema.safeParseAsync({
      email,
      password,
    });
    if (!parsed.success) {
      return ctx.render({
        validationError: parsed.error.flatten(),
      });
    }

    try {
      const { data } = parsed;
      const user = findUserByEmail(connection.db, data.email);

      if (!user || !(await checkPassword(user.passwordHash, data.password))) {
        throw new Error("invalid login");
      }

      const headers = new Headers();
      setCookie(headers, {
        name: "auth",
        value: await encodeSession({ userId: user.id }),
        sameSite: "Strict",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      headers.set("location", `/user`);
      return new Response(null, {
        status: 303, // See Other
        headers,
      });
    } catch (e) {
      console.error(e);
      return ctx.render({
        flash: {
          message: `Error loging in`,
          type: "error",
        },
      });
    }
  },
};

type LoginProps = {
  flash?: { message: string; type: string };
  validationError?: z.inferFlattenedErrors<typeof loginSchema>;
};

export default function Login(props: PageProps<LoginProps>) {
  const { flash, validationError } = props.data || {};
  return (
    <div class="test px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        {flash && <p class={`p-2 text-${flash.type}`}>{flash.message}</p>}
        <form method="post">
          <h2 class="text-xl font-bold">Login</h2>
          <div class="flex flex-col text-xs">
            <InputField
              label="email:"
              type="email"
              name="email"
              error={validationError?.fieldErrors?.email?.join(", ")}
            />
            <InputField
              label="passwords:"
              type="password"
              name="password"
              error={validationError?.fieldErrors?.password?.join(", ")}
            />
            <div>
              <Button type="submit">
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
