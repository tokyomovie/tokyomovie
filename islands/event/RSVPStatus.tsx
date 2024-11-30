import { useSignal, useSignalEffect } from "@preact/signals";
import StatusLabel from "./StatusLabel.tsx";

export interface RSVPStatusProps {
  rsvp: "no_rsvp" | "attending" | "not_attending";
}

export default function RSVPStatus(props: RSVPStatusProps) {
  const {
    rsvp = "no_rsvp",
  } = props;

  const showStars = useSignal(false);
  useSignalEffect(() => {
    showStars.value = false;
  });

  return (
    <div>
      <StatusLabel rsvp={rsvp} />
    </div>
  );
}
