#!/bin/sh

log()
{
  echo "[SETUP] - " $@
}

log_emphasize()
{
  echo ""
  echo "************************"
  echo $@
  echo "************************"
  echo ""
}

check_bin()
{
  which $1 >/dev/null 2>&1
  if [ $! -ne 0 ]; then
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

log "Setting up local sqlite db"
mkdir resources
DB_NAME="dev.db"
sqlite3 "resources/" + $DB_NAME
log "Local db setup at " + "resources/" + $DB_NAME 

log "Setting up env vars"
cp -n .env.development.example .env.development.local
cp -n .env.test.example .env.test.local
log "Setting up env vars OK"
log_emphasize "If you need to please change the values inside your .env.* files"

log "Migrating local database"
deno task db:migrateAll
log "Migrating OK"

log "Setting up initial admin"
read -p "Would you like to setup an admin for the app (recommended on first setup)? [n/Y]" choice
case "$choice" in 
  y|Y ) deno task db:addAdmin;;
  n|N ) log "Skipping admin setup";;
  * ) echo "invalid";;
esac
log "Admin creation OK"

log_emphasize "Your setup is finished. You can run the app with \`deno task dev\`."
