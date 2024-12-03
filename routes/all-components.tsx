import FormIsland from "#/islands/FormIsland/FormIsland.tsx";
import Header from "#/components/Header.tsx";

export default function () {
  return (
    <div className="flex flex-col gap-2 bg-background min-h-screen">
      <Header />
      <FormIsland />
    </div>
  );
}
