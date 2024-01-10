## Billing Service 

## Installation
```bash
$ npm i
```

## Running development environment

```bash
$ docker compose up -d postgres
```

## Database Migrations

```bash
# generate new migration
npm run typeorm:generate-migration

# apply existing migrations
npm run typeorm:run-migrations
```

## Running the app on local machine

1. Setup environments variables in `.env` like in `.env-example`

2. In order to properly run the application firstly generate and run migrations and then run 
```bash
$ npm run start
```
3. It is possible also to run all scripts by just one command:

```bash
$ npm run start:prod
```