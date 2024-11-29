import { ComponentChildren, JSX } from "preact";

export type TitleProps = {
  /** 1 means h1, 2 means h2, 3 means h3 */
  level: 1 | 2 | 3;
  children: ComponentChildren;
  invert?: boolean;
} & JSX.HTMLAttributes<HTMLHeadingElement>;
export default function Title(props: TitleProps) {
  const { level, invert, children, ...rest } = props;
  const topColor = invert ? "text-primary" : "text-foreground";
  const shadowColor = invert ? "text-primary-4" : "text-primary-2";
  const topClasses = "absolute font-extrabold text-foreground italic z-20" +
    " " + topColor;
  const shadowClasses =
    "absolute font-extrabold text-primary-2 italic z-10 top-[3px] left-[2px]" +
    " " + shadowColor;

  if (level === 1) {
    return (
      <div class="relative h-[2.5rem]" {...rest}>
        <h1 class={topClasses + " text-4xl"}>
          {children}
        </h1>
        <h1 class={shadowClasses + " text-4xl"}>
          {children}
        </h1>
      </div>
    );
  }
  if (level === 2) {
    return (
      <div class="relative h-[2.5rem]" {...rest}>
        <h2 class={topClasses + " text-3xl"}>
          {children}
        </h2>
        <h2 class={shadowClasses + " text-3xl"}>
          {children}
        </h2>
      </div>
    );
  }
  if (level === 3) {
    return (
      <div class="relative h-[2.5rem]" {...rest}>
        <h3 class={topClasses + " text-2xl"}>
          {children}
        </h3>
        <h3 class={shadowClasses + " text-2xl"}>
          {children}
        </h3>
      </div>
    );
  }
  return <h1>{children}</h1>;
}
