#!/usr/bin/env /bin/bash

nix develop --command astro build
rsync -avz --delete dist/ goens.org:~/astro-website/
