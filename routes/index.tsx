import Header from "../components/Header.tsx";
import Button from "../islands/Button.tsx";
import StackCenter from "../components/StackCenter.tsx";
import Title from "../components/Title.tsx";
import Divider from "../components/Divider.tsx";
import { PageProps } from "$fresh/server.ts";

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
            <Title level={1}>東京ムービグループへよーこそ</Title>
            <p class="mt-14">
              なぜか分からんWEBサイトのある東京ムービグループの一つである
            </p>
            <Divider />
            <p>
              to experience everything tokyo movie group has to offer you must
              log in
            </p>
            <p>
              このサイト提供しているものを体験するにはローグインが必要となってる
            </p>
          </div>
          <a class="w-full" href="./login">
            <Button fullWidth>proceed to login</Button>
          </a>
        </StackCenter>
      </div>
    </div>
  );
}
