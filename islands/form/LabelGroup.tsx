export interface LabelGroupProps {
  labelText: string;
  htmlFor: string;
  required?: boolean;
  helperText?: string;
}

export default function LabelGroup(props: LabelGroupProps) {
  const { labelText, htmlFor, required, helperText } = props;
  return (
    <div class="flex gap-0 flex-col">
      <div class="flex gap-2">
        <label
          htmlFor={htmlFor}
          class="text-large font-bold relative text-foreground"
        >
          {labelText}
          {required && (
            <div class="text-error absolute right-[-25px] top-0">⭐</div>
          )}
        </label>
      </div>
      {helperText && <div class="text-foreground-back">{helperText}</div>}
    </div>
  );
}
