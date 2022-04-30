#!/bin/bash
jekyll serve --force_polling

echo "开始生产静态文件"
jekyll b 
