#!/bin/sh -l

docker build -t mobile-test .
docker container run -it --rm mobile-test
