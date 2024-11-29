#!/bin/bash

log()
{
  echo "[SETUP] - " $@
}

log_emphasize()
{
  echo ""
  echo "************************"
  echo "$@"
  echo "************************"
  echo ""
}

check_bin()
{
  which $1 >/dev/null 2>&1
  if [[ $! -ne 0 ]]; then
    log "$1 not found: you will need this for development, please install from your local command line"
    exit 1
  fi
}

check_bin_warn()
{
  which $1 >/dev/null 2>&1
  if [ $! -ne 0 ]; then
    log "WARNING: $1 not found, you may want this for development"
  fi
}

log "Checking deps"
check_bin deno
check_bin sqlite3
log "Installing deno deps"
deno install
log "Deps OK"

mkdir resources

log "Setting up env vars"
cp -n .env.development.example .env.development.local
cp -n .env.test.example .env.test.local
log "Setting up env vars OK"

log "Setting up local sqlite db"
source .env.development.local
sqlite3 "$DB_PATH" ""
log "Local db setup at $DB_PATH"
log "Setting up test sqlite db"
source .env.test.local
sqlite3 "$DB_PATH" ""
log "Test db setup at $DB_PATH"

log "Migrating databases"
deno task db:migrateAll
log "Migrating OK"

source .env.development.local

log "Seeding local database"
cat database/seed.sql | sqlite3 "$DB_PATH"
log "Seed OK"

log "DB setup OK"

log "Setting up initial admin"

echo ""
echo "You already have an admin for development. The details will be given at the end."
read -p "Would you like to setup an admin for the app (recommended on first setup)? [n/Y]" choice
case "$choice" in 
  y|Y ) deno task db:addAdmin;;
  n|N ) log "Skipping admin setup";;
  * ) echo "invalid";;
esac
log "Admin creation OK"

log_emphasize "Your setup is finished. You can run the app with \`deno task dev\`. 

You can login with with you default admin:
- username: foo@foo.com
- password: foo

If you need to please change the values inside your .env.* files"
