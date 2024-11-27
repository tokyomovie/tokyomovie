# Description

Tokyo Movie time!

## Developing

### Environment Setup

Make sure you have the `deno` runtime [setup](https://docs.deno.com/runtime/).
Make sure you have `sqlite3` command line tools installed, if you're on a mac
this can be done through `brew`, if you're on linux it's probably pre-installed.

Set up your dev environment with

```
deno task setup
```

If this is your first time running the setup script, please follow the prompts
to make an admin user.

Run the local dev server with

```
deno task dev
```

Visit http://localhost:8000/login to log in with your user

### Stack

- [runtime - deno](https://deno.land/)
- [framework - fresh](https://fresh.deno.dev)
- [styling - tailwindcss](https://tailwindcss.com)
- [database - sqlite3](https://deno.land/x/sqlite3@0.12.0)

### DB

For now, this project uses sqlite3 for simplicity's sake. Sqlite3 can run on pretty much anything, and the data is just stored as a file. 
The way this is structured at the present moment is like this:

```
Reads
[Database] ===> [Query] ===> [Fresh Page]  
Writes
[Fresh Page] ===> [Query] ===> [Database]

If we wanted to do something asyncronously, then you'd stick an api in there and fetch it client side
[Database] ===> [Query] ===> [JSON API] ===> [Fresh Page]  
```

Query will get data from database, do any data transformations if necessary, and then it gets rendered into the page.
The query functions are there so we don't have to look at a bunch of SQL and we can make data from the database easier to use, if necessary.

*directory structure*

```
/database
  /migrations  (all migration files)
  /query       (functions to get data from the db, they are divided by domain e.g. movie)
  migration.ts (all logic for migrations)
  db.ts        (for making connections to the db)
```

#### Migrations

There is a small migrations system to help us manage the database schema. When you want to alter the schema of the database, you will have to make a migration. When there is a change to the database, you will have to run the migrations, so your copy of the database works.

- `deno task db:migration:create` - create migration sql file for modifying db schema, see database/migrations for examples
- `deno task db:migration` - for migrations and rollbacks - you can choose to migrate / rollback one at a time or all at once
- `deno task db:migrateAll` - convenience script for running all migrations

#### ERD Diagram

TBD

For now, you can probably use some tools out there like https://www.datensen.com/blog/erd-creator-for-sqlite/.
