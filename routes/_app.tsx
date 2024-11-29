import Stars from "../islands/stars/Stars.tsx";
import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>tokyomovie</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="bg-background text-foreground">
        <Component />
        <a
          class="m-1 text-background-low font-bold cursor-pointer"
          href="./bng"
        >
          real heads know
        </a>
        <Stars />
      </body>
    </html>
  );
}
