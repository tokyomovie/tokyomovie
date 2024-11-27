export interface StatusLabelProps {
    rsvp: boolean;
    going?: boolean;
}

export default function StatusLabel(props: StatusLabelProps) {
    const { rsvp = "false", going } = props;
    return (
        <div class="text-xs">
            {rsvp && going && (
                <div class="p-1 bg-yellow-green text-white rounded">going</div>
            )}
            {rsvp && !going && (
                <div class="p-1 bg-razzmataz text-white rounded">not going</div>
            )}
            {!rsvp && (
                <div class="p-1 bg-gray text-white rounded">not yet RSVP'd</div>
            )}
        </div>
    );
}
