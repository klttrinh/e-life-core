# pnpm env:copy
# docker-compose up -d --build --remove-orphans

export PGPASSWORD='Uithoo0OTawaH1JaepheelahquooCa'
pg_dump -U david_usr -h api-payment-gateway.cfpmp3wf9ej9.us-east-2.rds.amazonaws.com -p 5432  -F t api_payment_gateway_db > transaction1.tar
export PGPASSWORD='postgres'
pg_restore -h localhost -p 5432 -U postgres --clean --no-owner -d xcoins-payment-gateway-api transaction1.tar



export PGPASSWORD='Uithoo0OTawaH1JaepheelahquooCa'
pg_dump -U david_usr -h xcoins-transaction-service-dev-db.cfpmp3wf9ej9.us-east-2.rds.amazonaws.com -p 5432  -F t xcoins_transaction_service_dev > transaction4.tar
export PGPASSWORD='postgres'
pg_restore -h localhost -p 5432 -U postgres --clean --no-owner -d xcoins-transaction-service transaction4.tar



export PGPASSWORD='Uithoo0OTawaH1JaepheelahquooCa'
pg_dump -U david_usr -h rate-service-dev-db.cfpmp3wf9ej9.us-east-2.rds.amazonaws.com -p 5432  -F t rate_service_dev > transaction2.tar
export PGPASSWORD='postgres'
pg_restore -h localhost -p 5432 -U postgres --clean --no-owner -d xcoins-rate-service transaction2.tar



export PGPASSWORD='Uithoo0OTawaH1JaepheelahquooCa'
pg_dump -U david_usr -h traffic-protection-engine-dev.cfpmp3wf9ej9.us-east-2.rds.amazonaws.com -p 5432  -F t traffic_protection_engine_dev > transaction3.tar
export PGPASSWORD='postgres'
pg_restore -h localhost -p 5432 -U postgres --clean --no-owner -d xcoins-traffic-protection-engine transaction3.tar




