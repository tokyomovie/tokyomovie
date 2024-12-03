import Important from "#/components/icons/Important.tsx";

export default function FormFieldError({ errorText }: { errorText?: string }) {
  if (!errorText) return null;
  return (
    <div class="flex gap-2 my-2">
      <Important
        width="w-4"
        primaryFill="fill-error"
        secondaryFill="fill-error-2"
      />
      <div class="text-error leading-tight">
        {errorText}
      </div>
    </div>
  );
}
