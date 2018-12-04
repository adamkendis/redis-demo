const express = require('express');
const responseTime = require('response-time');
const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);

const redis = require('redis');
const client = redis.createClient();

const app = express();

// Middleware that attaches X-Response-Time header on responses. 
// With the server running, visit localhost:3000/<1 through 12>
// In Chrome Devtools Network tab, view the GET request Headers for X-Response-Time
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


// With Redis caching
app.get('/:id', getFromRedis);


// Without Redis caching
// app.get('/:id', (req, res) => {
//   // http://localhost:3000/25   ->   id = 25
//   let id = req.params.id;
//   // Query table 'postgres' for id.
//   knex('postgres').where('id', id).first()
//     .then(data => {
//       // Log the data retrieved from Postgres.
//       console.log('Retrieved from POSTGRES: ', data);
//       res.end();
//     })
//     .catch(err => console.log('Error: ', err))
// });


app.listen(3000, () => {
  console.log('Listening on port 3000');
});