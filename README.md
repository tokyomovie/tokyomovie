# Description

Tokyo Movie time!

## Developing

### Environment Setup

Setup your local sqlite database. This project is configured to look to
`resources/dev.db`

```
mkdir resources
sqlite3 resources/dev.db
```

Next, perform database migrations and setup an admin user for yourself

```
deno task setup
```

Run the local dev server

```
deno task dev
```

Visit http://localhost:8000/login to log in with your user

### Stack

- [runtime - deno](https://deno.land/)
- [framework - fresh](https://fresh.deno.dev)
- [styling - tailwindcss](https://tailwindcss.com)
