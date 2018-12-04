// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    version: '10.5',
    connection: {
      host: '127.0.0.1',
      user: '',
      password: '',
      database: 'redis_demo'
    },
    migrations: {
      directory: __dirname + '/database/migrations'
    },
    seeds: {
      directory: __dirname + '/database/seeds/'
    }
  }

};
