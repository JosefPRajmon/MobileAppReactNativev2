#!/bin/sh
# copy config and assets files to correct folders in application

if [ -z "$1" ]
  then
    echo "No env supplied"
    exit 1
fi

cp -r ./towns/$1/app.json ./
cp -r ./towns/$1/themes/* ./app/themes/
cp -r ./towns/$1/assets/* ./app/assets/
cp -r ./towns/$1/config/* ./app/config/