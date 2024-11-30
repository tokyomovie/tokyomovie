export default function Divider({ classes }: { classes?: string }) {
  return (
    <div class={`w-full my-5 shadow-glow ${classes}`}>
      <div class="h-[1px] bg-background-low"></div>
    </div>
  );
}
