
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('postgres', (table) => {
      table.integer('id').primary();
      table.text('data');
    })
  ])
};

exports.down = function(knex, Promise) {
  
};
