#!/usr/bin/env sh

set -e

DIR=$(pwd | sed -e 's/^.*\///')

APP_NAME="$DIR-$DEPLOYMENT_STAGE"

TASK_DEFINITION_NAME="$APP_NAME-td"
SERVICE_NAME="$APP_NAME-svc"

DOCKER_IMAGE="$DOCKER_REGISTRY_URL/$APP_NAME:$CI_COMMIT_SHORT_SHA"

echo "$DOCKER_IMAGE"

TASK_DEFINITION=$(aws ecs describe-task-definition --task-definition "$TASK_DEFINITION_NAME" --region "$AWS_REGION")

echo "$TASK_DEFINITION"

NEW_CONTAINER_DEFINITION=$(echo "$TASK_DEFINITION" | jq --arg IMAGE "$DOCKER_IMAGE" '.taskDefinition.containerDefinitions[0].image = $IMAGE | .taskDefinition.containerDefinitions[0]')

echo "$NEW_CONTAINER_DEFINITION"

echo "Registering new container definition..."

aws ecs register-task-definition --region "$AWS_REGION" --family "$TASK_DEFINITION_NAME" --container-definitions "$NEW_CONTAINER_DEFINITION" --requires-compatibilities "FARGATE" --network-mode "awsvpc" --execution-role-arn "$EXECUTION_ROLE_ARN" --task-role-arn "$TASK_ROLE_ARN" --cpu 256 --memory 1024

echo "Updating the service..."

aws ecs update-service --region "$AWS_REGION" --cluster "$APP_NAME" --service "$SERVICE_NAME" --task-definition "$TASK_DEFINITION_NAME" --enable-execute-command
