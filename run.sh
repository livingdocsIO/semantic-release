#!/bin/bash

git fetch --tags -q

if [ "$DRY_RUN" = "true" ]; then
  /release/node_modules/.bin/semantic-release --dry-run
else
  /release/node_modules/.bin/semantic-release
fi
