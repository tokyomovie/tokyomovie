import Divider from "../../components/Divider.tsx";
import RSVPStatus from "./RSVPStatus.tsx";

export interface EventProps {
    eventTitle?: string;
    movieTitle: string;
    releaseYear: number;
    synopsis?: string;
    eventDescription: string;
    date: string;
    time: string;
    location: string;
    rsvp: boolean;
    going?: boolean;
}

export default function Event(props: EventProps) {
    const {
        eventTitle,
        movieTitle,
        releaseYear,
        synopsis,
        eventDescription,
        date,
        time,
        location,
        rsvp = false,
        going,
    } = props;
    return (
        <div class="p-2 flex flex-row gap-3 columns-2">
            <div>
                <div class="py-2 px-2 bg-primary text-foreground shadow-block border border-secondary rounded text-xs">
                    <p>{date}</p>
                    <p>{time}</p>
                </div>
            </div>
            <div class="border border-background-low rounded">
                <div class="p-2 flex flex-row columns-2 place-content-between bg-highlight border-primary border-t-8 rounded-t">
                    {eventTitle && (
                        <div>
                            <h2 class="text-2xl text-primary-2">
                                {eventTitle}
                            </h2>
                            <h3 class="text-l text-primary">
                                {movieTitle} ({releaseYear})
                            </h3>
                        </div>
                    )}
                    {!eventTitle && (
                        <div>
                            <h2 class="text-2xl text-primary-2">
                                {movieTitle} ({releaseYear})
                            </h2>
                        </div>
                    )}
                    <div class="py-2 px-2">
                        <RSVPStatus rsvp={rsvp} going={going} />
                    </div>
                </div>
                <div class="bg-primary-3">
                    <h3 class="p-2 text-xl text-primary border-b-2 border-b-highlight">Event Details</h3>
                    <h4 class="p-2 text-highlight">Location</h4>
                    <p class="p-2">{location}</p>
                    <h4 class="p-2 text-highlight">Description</h4>
                    <p class="p-2">{eventDescription}</p>
                    {synopsis && (
                        <div class="p-2">
                            <h3 class="text-primary">Synopsis</h3>
                            <p>{synopsis}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
