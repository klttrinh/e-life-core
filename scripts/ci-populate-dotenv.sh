#!/usr/bin/env bash

set -e

DIR=$(pwd | sed -e 's/^.*\///')

# -------------------------< Read .env file >-------------------------

if [[ "$DEPLOYMENT_STAGE" != "production" ]] && [[ "$DEPLOYMENT_STAGE" != "dev" ]] && [[ "$DEPLOYMENT_STAGE" != "stage" ]] && [[ "$DEPLOYMENT_STAGE" != "preprod" ]]; then
  AWS_DOTENV_NAME="/xcoins-$DIR/$DEPLOYMENT_STAGE/"

  while read -r key; do
    key="$(echo "${key}" | tr -d '[:space:]')"

    if [[ $key != "#"* ]] && [[ -n "$key" ]] && [[ "$key" == *"="* ]]; then
      arr=(${key//=/ })
      key=${arr[0]}
      key="$(echo "$key" | tr -d '[:space:]')"

      defaultValue=${arr[1]}
      defaultValue="$(echo "$defaultValue" | tr -d '[:space:]')"

      echo "Reading environment variable: $key"

      value=$(aws ssm get-parameter --with-decryption --region "$AWS_REGION" --name "$AWS_DOTENV_NAME$key" | jq .Parameter.Value)

      echo "Setting environment variable in the .env file: $key"

      if [[ $value != "" ]]; then
        echo "${key}=$value" >> .env
      elif [[ $defaultValue != "" ]]; then
        echo "WARNING: Setting environment variable from .env.example: $key"
        echo "${key}=$defaultValue" >> .env
      else
        echo "Missing environment variable: $key"
        exit 1
      fi
    fi
  done <.env.example
fi
