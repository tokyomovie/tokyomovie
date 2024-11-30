export interface StatusLabelProps {
  rsvp: "no_rsvp" | "attending" | "not_attending";
}

export default function StatusLabel(props: StatusLabelProps) {
  const { rsvp = "no_rsvp" } = props;
  return (
    <div class="text-xs">
      {rsvp === "attending" && (
        <div class="p-1 bg-yellow-green text-white rounded text-center">
          going
        </div>
      )}
      {rsvp === "not_attending" && (
        <div class="p-1 bg-razzmataz text-white rounded text-center">
          not going
        </div>
      )}
      {rsvp === "no_rsvp" && (
        <div class="p-1 bg-gray text-white rounded text-center">
          not yet RSVP'd
        </div>
      )}
    </div>
  );
}
