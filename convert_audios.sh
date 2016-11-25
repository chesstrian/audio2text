#!/usr/bin/env bash

for F in audios/*.m4a
do
    f=$(echo $F | tr '[:upper:]' '[:lower:]')
    avconv -i "$F" "${f/%m4a/wav}"
done

for F in audios/*.aac
do
    f=$(echo $F | tr '[:upper:]' '[:lower:]')
    avconv -i "$F" "${f/%aac/wav}"
done
