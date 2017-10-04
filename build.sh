#!/bin/bash
git fetch --all
git reset --hard origin/gh-pages
jekyll b
