import Button from "../islands/Button.tsx";
import FormIsland from "../islands/FormIsland/FormIsland.tsx";
import Header from "../components/Headers.tsx";

export default function () {
  return (
    <div className="flex flex-col gap-2 bg-background h-screen">
      <Header />
      <FormIsland />
    </div>
  );
}
