import Event, { EventProps } from "../islands/event/Event.tsx";
export interface CardProps {
    event?: EventProps;
    movie?: string;
}
export default function Card({ event, movie }: CardProps) {
    const generateCard = () => {
        if (movie) {
            return (
                <div>
                    {movie}
                </div>
            );
        }
        if (event) {
            return (
                <Event
                    eventTitle={event.eventTitle}
                    movieTitle={event.movieTitle}
                    releaseYear={event.releaseYear}
                    synopsis={event.synopsis}
                    eventDescription={event.eventDescription}
                    date={event.date}
                    time={event.time}
                    location={event.location}
                    price={event.price}
                    rsvp={event.rsvp}
                    going={event.going}
                    seatsLeft={event.seatsLeft}
                />
            );
        }
    };
    const card = generateCard();

    return (
        <div class="p-3 flex">
            <div class="p-2 flex flex-row gap-3 shadow-block border border-highlight rounded text-foreground min-h-screen">
                {card}
            </div>
        </div>
    );
}
