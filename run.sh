#!/bin/bash

git fetch --tags -q

read -r -d '' PATCHPACKAGE << EOL
const pkg = require("./package.json");
const scripts = pkg.scripts || {};
scripts.preversion = undefined;
scripts.postversion = "/release/node_modules/.bin/set-ci";
pkg.scripts = scripts;
fs.writeFileSync("./package.json", JSON.stringify(pkg, null, 2));
EOL

node -e "$PATCHPACKAGE"

if [ "$DRY_RUN" = "true" ]; then
  exec /release/node_modules/.bin/semantic-release --dry-run
else
  exec /release/node_modules/.bin/semantic-release
fi
