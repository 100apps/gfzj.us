#!/bin/bash
cd /home/gf/www/www.gfzj.us
git fetch --all
git reset --hard origin/gh-pages
jekyll b
