/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";
import config from "./fresh.config.ts";
import { db } from './database/db.ts';

function sigIntHandler() {
  console.log('Received SIGINT, cleaning up');
  Deno.removeSignalListener("SIGINT", sigIntHandler);
  console.log('Closing DB...');
  db.close();
  console.log('Closed DB successfully!');
  Deno.exit(0);
}

Deno.addSignalListener("SIGINT", sigIntHandler);

await start(manifest, config);
