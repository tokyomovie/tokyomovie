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
  price: string;
  rsvp: boolean;
  going?: boolean;
  seatsLeft: number;
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
    price,
    rsvp = false,
    going,
    seatsLeft,
  } = props;
  return (
    <div class="p-3 flex">
      <div class="p-2 flex flex-row gap-3 shadow-block border border-highlight rounded text-foreground">
        <div class="px-3 flex flex-col">
          <div class="my-2 p-2 shadow-block border border-highlight rounded">
            <p>{date}</p>
            <p>{time}</p>
          </div>
          <div class="my-2 p-2 shadow-block border border-highlight rounded">
            <p>@ {location}</p>
          </div>
          <div class="my-2 p-2 shadow-block border border-highlight rounded">
            <p>{price}</p>
            <p>(1 drink)</p>
          </div>
          <div class="my-2 p-2 shadow-block border border-highlight rounded">
            <p>seats left:</p>
            <p>{seatsLeft}</p>
          </div>
          <div class="my-2 p-2 shadow-block border border-highlight rounded">
            <RSVPStatus rsvp={rsvp} going={going} />
          </div>
        </div>
        <div class="py-5 px-3">
          <div class="py-2 flex">
            {eventTitle && (
              <div>
                <h2 class="text-2xl text-error">
                  {eventTitle}
                </h2>
                <h3 text->{movieTitle} ({releaseYear})</h3>
              </div>
            )}
            {!eventTitle && (
              <div>
                <h2 class="text-2xl text-error">
                  {movieTitle} ({releaseYear})
                </h2>
              </div>
            )}
          </div>
          <div>
            <p>{eventDescription}</p>
            {synopsis && (
              <div class="py-2">
                <h4 class="text-l text-error">Film Synopsis</h4>
                <p>{synopsis}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
