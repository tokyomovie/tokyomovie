import { JSX } from "preact";
import clsx from "npm:clsx";

export type TextAreaProps = {
  name: string;
  full?: boolean;
  value?: string;
  placeholder?: string;
  invalid?: boolean;
} & JSX.HTMLAttributes<HTMLTextAreaElement>;

export default function TextArea(props: TextAreaProps) {
  const { name, full = true, value, placeholder, invalid = false, ...rest } =
    props;
  return (
    <textarea
      class={clsx(
        "border rounded p-2 shadow-block outline-offset-0 focus:outline-none focus:shadow-focus transition duration-200 text-black",
        { "w-full": full },
      )}
      id={name}
      name={name}
      value={value}
      placeholder={placeholder}
      aria-invalid={invalid}
      {...rest}
    />
  );
}
