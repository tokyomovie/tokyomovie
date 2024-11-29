import Divider from "../../components/Divider.tsx";
import RSVPStatus from "./RSVPStatus.tsx";

export interface ShowingProps {
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

export default function Showing(props: ShowingProps) {
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
    <div class="py-1 flex flex-row gap-3 columns-2">
      <div>
        <div class="py-2 px-2 bg-primary text-foreground shadow-block border border-secondary rounded text-xs">
          <p>{date}</p>
          <p>{time}</p>
        </div>
      </div>
      <div class="py-2 px-2 border border-background-low rounded">
        <div class="flex flex-row columns-2 place-content-between">
          {eventTitle && (
            <div>
              <h2 class="text-2xl text-primary">{eventTitle}</h2>
              <h3 class="text-l">{movieTitle} ({releaseYear})</h3>
            </div>
          )}
          {!eventTitle && (
            <div>
              <h2 class="text-2xl text-primary">
                {movieTitle} ({releaseYear})
              </h2>
            </div>
          )}
          <div class="py-2 px-2">
            <RSVPStatus rsvp={rsvp} going={going} />
          </div>
        </div>

        <Divider />
        <h3 class="text-xl text-primary">Event Details</h3>
        <h4 class="text-highlight">Location</h4>
        <p>{location}</p>
        <h4 class="text-highlight">Description</h4>
        <p>{eventDescription}</p>
        {synopsis && (
          <div>
            <Divider />
            <h3 class="text-xl text-primary">Synopsis</h3>
            <p>{synopsis}</p>
          </div>
        )}
      </div>
    </div>
  );
}
