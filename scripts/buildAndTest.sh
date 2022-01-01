#!/usr/bin/env bash
"$(dirname "$0")"/buildPubAndTestPackages.sh && \
node ./test/node_modules/mocha/bin/mocha test/dist/esc/bin/index.js