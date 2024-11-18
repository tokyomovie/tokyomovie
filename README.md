# Description

Tokyo Movie time!

## Developing

### Environment Setup

Make sure you have the `deno` runtime [setup](https://docs.deno.com/runtime/). Make sure you have `sqlite3` command line tools installed, if you're on a mac this can be done through `brew`, if you're on linux it's probably pre-installed.

Set up your dev environment with

```
deno task setup
```

If this is your first time running the setup script, please follow the prompts to make an admin user.

Run the local dev server with

```
deno task dev
```

Visit http://localhost:8000/login to log in with your user

### Stack

- [runtime - deno](https://deno.land/)
- [framework - fresh](https://fresh.deno.dev)
- [styling - tailwindcss](https://tailwindcss.com)
