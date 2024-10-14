#!/bin/bash

set -e
set -u

function create_user_and_database() {
  local database=$1

  echo "  Creating user and database '$database'"


  mongo --eval "
    db = db.getSiblingDB('$database');
    db.createUser({
      user: '$MONGO_USER',
      pwd: '$MONGO_PASSWORD', 
      roles: [{ role: 'readWrite', db: '$database' }]
    });
  "
}

if [ -n "$MONGO_MULTIPLE_DATABASES" ]; then
  echo "Multiple database creation requested: $MONGO_MULTIPLE_DATABASES"

  for db in $(echo $MONGO_MULTIPLE_DATABASES | tr ',' ' '); do
    create_user_and_database $db
  done
  
  echo "Multiple databases created"
fi