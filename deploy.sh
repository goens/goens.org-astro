#!/usr/bin/env /bin/bash

rsync -avz --delete dist/ goens.org:~/astro-website/
