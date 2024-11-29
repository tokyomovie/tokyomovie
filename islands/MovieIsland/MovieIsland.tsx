import Card from "../../components/Card.tsx";

const sampleMovieData = [
  {
    movieTitle: "Society",
    releaseYear: 1989,
    synopsis:
      "A California teen's worst nightmares about his parents come true when he returns home to find a grotesque party in full swing.",
    runtime: 99,
    genre: "body horror",
    poster: "../../images/posters/society.jpg",
  },
  {
    movieTitle: "Cocktail",
    releaseYear: 1988,
    synopsis:
      "A talented New York City bartender takes a job at a bar in Jamaica and falls in love.",
    runtime: 104,
    genre: "romance",
    poster: "../../images/posters/cocktail.jpg",
  },
  {
    movieTitle: "Elvis",
    releaseYear: 2022,
    synopsis:
      "The life of American music icon Elvis Presley, from his childhood to becoming a rock and movie star in the 1950s while maintaining a complex relationship with his manager, Colonel Tom Parker.",
    runtime: 159,
    genre: "biopic",
    poster: "../../images/posters/elvis.jpg",
  },
];

const movies = sampleMovieData.map((movie) => <Card movie={movie} />);

export default function MovieIsland() {
  return (
    <div>
      {movies}
    </div>
  );
}
