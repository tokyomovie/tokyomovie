#!/bin/sh

OUTPUT_PATH="$1"
MIGRATION_NAME="$2"

usage()
{
  echo "./create_migration.sh <migration name> <output path>"  
}

if ! [ -d "$OUTPUT_PATH" ]; then
  echo "output directory is invalid"
  usage
  exit 1
fi

if [ "$MIGRATION_NAME" = "" ]; then
  echo "need a migration name"
  usage
  exit 1
fi

FILENAME_BASE="$(date +%s)_$MIGRATION_NAME"
FILENAME_UP="$FILENAME_BASE.up.sql"
FILENAME_DOWN="$FILENAME_BASE.down.sql"

cd $OUTPUT_PATH
touch $FILENAME_DOWN
touch $FILENAME_UP

echo "Created migrations $FILENAME_DOWN and $FILENAME_UP in $OUTPUT_PATH"
