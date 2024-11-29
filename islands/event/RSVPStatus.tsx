import { useSignal, useSignalEffect } from "@preact/signals";
import StatusLabel from "./StatusLabel.tsx";
import Button from "../Button.tsx";
import Stars from "../stars/Stars.tsx";

export interface RSVPStatusProps {
  rsvp: boolean;
  going?: boolean;
}

export default function RSVPStatus(props: RSVPStatusProps) {
  const {
    rsvp = false,
    going,
  } = props;

  const showStars = useSignal(false);
  useSignalEffect(() => {
    showStars.value = false;
  });

  return (
    <div>
      <StatusLabel rsvp={rsvp} going={going} />
    </div>
  );
}
