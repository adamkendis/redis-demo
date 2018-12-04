# Project Name

> Redis-demo

## Usage

1. Install Postgres.
   - brew update
   - brew install postgresql
   - brew services start postgresql (can be stopped with brew services stop postgresql)

2. Create 'redis_demo' database in Postgres.
   - psql
   - CREATE DATABASE redis_demo; (You should see 'CREATE DATABASE' appear on the next line)
   - \q (to quit psql prompt)

2. Install Redis.
   - brew install redis
   - brew services start redis (can be stopped with brew services stop redis)

3. Install dependencies. From project root directory:
   - npm install

4. Create 'postgres' table in Postgres.
   - npm run migrate

5. Seed 'postgres' table.
   - npm run seed

6. Start server on localhost:3000.
   - npm start

7. To clear Redis cache (or wait 60 minutes, or set the cache time lower)
   - redis-cli
   - DEL 1 2 3 4 5 6 7 8 9 10 11 12

## Requirements

A PostgreSQL database titled "redis_demo" must be running locally. See knexfile.js for database connection details.