export interface StatusLabelProps {
  rsvp: boolean;
  going?: boolean;
}

export default function StatusLabel(props: StatusLabelProps) {
  const { rsvp = "false", going } = props;
  return (
    <div class="text-xs">
      {rsvp && going && (
        <span class="py-1 px-1 bg-green-600 rounded">going!</span>
      )}
      {rsvp && !going && (
        <span class="py-1 px-1 bg-red-900 rounded">not going!</span>
      )}
      {!rsvp && <span class="py-1 px-1 bg-gray rounded">not yet RSVP'd</span>}
    </div>
  );
}
