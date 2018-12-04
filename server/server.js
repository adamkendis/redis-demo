const express = require('express');
const responseTime = require('response-time');
const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);

const redis = require('redis');
const client = redis.createClient();

const app = express();
app.use(responseTime());


// Function to query database, write data to Redis, then console.log the data.
const getFromPostgres = (req, res) => {
  let id = req.params.id;
  knex('postgres').where('id', id).first()
    .then(data => {
      // Write key:value to Redis. 
      //        key, value,                expires, 3600 seconds
      client.set(id, JSON.stringify(data), 'EX', 3600);
      console.log('Retrieved from POSTGRES!: ', data);
      res.end();
    })
    .catch(err => console.log('Error retrieving from Postgres: ', err));
};


// Function to query Redis. If not found, query Postgres.
const getFromRedis = (req, res) => {
  let id = req.params.id;
  // Query Redis for key id.
  client.get(id, (err, result) => {
    // If found in Redis
    if (result) {
      // Log the data retrieved from Redis.
      console.log('Retrieved from REDIS!: ', JSON.parse(result));
      res.end();
    } else {
      // If not found in Redis, query Postgres.
      getFromPostgres(req, res);
    }
  });
};


app.get('/:id', getFromRedis);


app.listen(3000, () => {
  console.log('Listening on port 3000');
});