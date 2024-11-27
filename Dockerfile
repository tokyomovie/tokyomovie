FROM denoland/deno:2.1.1

EXPOSE 8000

WORKDIR /app

COPY . .
RUN deno install

RUN deno task db:migrateAll
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

CMD ["run", "--allow-read", "--allow-env", "--allow-write", "--allow-net", "--allow-ffi", "main.ts"]
