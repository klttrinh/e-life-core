#!/usr/bin/env bash

set -e

DIR=$(pwd | sed -e 's/^.*\///')

# -------------------------< Build Docker Image >-------------------------

DOCKER_REGISTRY_IMAGE="$DOCKER_REGISTRY_URL/$DIR-$DEPLOYMENT_STAGE"

DOCKER_TAG_SHA="$DOCKER_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
DOCKER_TAG_LATEST="$DOCKER_REGISTRY_IMAGE:latest"

APP="@xcoins/$DIR"

docker build --build-arg APP="$APP" -t "$DOCKER_TAG_SHA" -t "$DOCKER_TAG_LATEST" ../..

if [ -n "$CI_COMMIT_TAG" ]; then
  docker tag "$DOCKER_TAG_SHA" "$DOCKER_REGISTRY_IMAGE:$CI_COMMIT_TAG"
fi

# -------------------------< Push Docker Image >-------------------------

docker push "$DOCKER_TAG_SHA"
docker push "$DOCKER_TAG_LATEST"

if [ -n "$CI_COMMIT_TAG" ]; then
  docker push "$DOCKER_REGISTRY_IMAGE:$CI_COMMIT_TAG"
fi
