export interface MovieProps {
  movieTitle: string;
  releaseYear: number;
  synopsis: string;
  runtime: number;
  genre: string;
  poster: string;
}

export default function Movie(
  { movieTitle, releaseYear, synopsis, runtime, genre, poster }: MovieProps,
) {
  return (
    <>
      <div class="px-3 flex flex-col">
        <div class="my-2 p-2 shadow-block border border-highlight rounded">
          <p>{releaseYear}</p>
        </div>
        <div class="my-2 p-2 shadow-block border border-highlight rounded">
          <p>{runtime} mins</p>
        </div>
        <div class="my-2 p-2 shadow-block border border-highlight rounded">
          <p>{genre}</p>
        </div>
      </div>
      <div class="py-5 px-3">
        <div class="py-2">
          <h2 class="text-2xl text-error">{movieTitle}</h2>
          <div class="p-4 m-3 rounded bg-white shadow-block border border-highlight">
            <img src={poster} />
          </div>
          <p>{synopsis}</p>
        </div>
      </div>
    </>
  );
}
