#!/bin/bash
git fetch --tags -q

if [ "$DRY_RUN" = "true" ]; then
  exec /release/node_modules/.bin/semantic-release --dry-run
else
  exec /release/node_modules/.bin/semantic-release
fi
