#!/usr/bin/env bash

for F in audios/*.m4a
do
    f=$(echo $F | tr '[:upper:]' '[:lower:]')
    avconv -i "$F" "${f/%m4a/wav}"
done
