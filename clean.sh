#!/bin/bash
docker-compose kill
# Stop all containers
docker stop $(docker ps -a -q) -f
# Delete all containers
docker rm $(docker ps -a -q) -f
# Delete all images
docker rmi $(docker images -q) -f