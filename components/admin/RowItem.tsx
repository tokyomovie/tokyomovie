import { ComponentChildren, JSX } from "preact";
import clsx from "clsx";
import Button from "../../islands/Button.tsx";

export default function RowItem({ onDeleteClick, children, ...listProps }: {
  children: ComponentChildren;
  onDeleteClick?: () => void;
} & JSX.HTMLAttributes<HTMLLIElement>) {
  return (
    <li {...listProps} class={clsx("flex items-center", listProps.class)}>
      <span class="flex-1">
        {children}
      </span>
      <span>
        <Button onClick={onDeleteClick}>Delete</Button>
      </span>
    </li>
  );
}
