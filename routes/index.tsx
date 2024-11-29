import Header from "../components/Header.tsx";
import Button from "../islands/Button.tsx";
import StackCenter from "../components/StackCenter.tsx";
import Title from "../components/Title.tsx";
import { PageProps } from "$fresh/server.ts";
import * as serverResponse from "../utils/response/server.ts";
import SpinningStar from "../components/SpinningStar.tsx";

import { FreshContext } from "$fresh/server.ts";
import { State } from "../types/request.ts";

export const handler = {
  async GET(_req: Request, ctx: FreshContext<State>) {
    const { user } = ctx.state;

    if (user) {
      return serverResponse.redirect("/user/event");
    }

    return await ctx.render();
  },
};

export default function Home(props: PageProps) {
  return (
    <div>
      <Header />
      <div class="flex justify-center my-2 p-8">
        <StackCenter>
          <div class="text-center">
            <Title level={1}>welcome to tokyo movie group</Title>
            <p class="mt-14">
              the only tokyo movie group that has its own website for some
              unknown reason
            </p>
            <Title level={1}>東京ムービーグループへよーこそ</Title>
            <p class="mt-14">
              なぜか分からんWEBサイトのある東京ムービーグループの一つである
            </p>
          </div>
          <a class="w-full" href="./login">
            <Button fullWidth>
              enter エンター
            </Button>
          </a>
        </StackCenter>
      </div>
    </div>
  );
}
