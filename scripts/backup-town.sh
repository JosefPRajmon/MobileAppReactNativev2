#!/bin/sh
# Záloha daného města z parametru

if [ -z "$1" ]
  then
    echo "No files to backup"
    exit 1
fi

cp -r ./app.json ./towns/$1/
cp -r ./app/themes/Colors.tsx ./towns/$1/themes/
cp -r ./app/config/App.config.tsx ./towns/$1/config/
cp -r ./app/assets/images/* ./towns/$1/assets/images/ 