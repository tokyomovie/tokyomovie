import Event, { EventProps } from "../islands/event/Event.tsx";
import Movie, { MovieProps } from "../islands/movie/Movie.tsx";

export interface CardProps {
  event?: EventProps;
  movie?: MovieProps;
}
export default function Card({ event, movie }: CardProps) {
  const generateCard = () => {
    if (movie) {
      return (
        <Movie
          movieTitle={movie.movieTitle}
          releaseYear={movie.releaseYear}
          synopsis={movie.synopsis}
          runtime={movie.runtime}
          genre={movie.genre}
          poster={movie.poster}
        />
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
      <div class="p-2 flex flex-row gap-3 shadow-block border border-highlight rounded text-foreground w-full">
        {card}
      </div>
    </div>
  );
}
