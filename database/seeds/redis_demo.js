
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('postgres').del()
    .then(function () {
      // Inserts seed entries
      return knex('postgres').insert([
        {id: 1, data: 'Data from row 1'},
        {id: 2, data: 'Data from row 2'},
        {id: 3, data: 'Data from row 3'},
        {id: 4, data: 'Data from row 4'},
        {id: 5, data: 'Data from row 5'},
        {id: 6, data: 'Data from row 6'}, 
        {id: 7, data: 'Data from row 7'},
        {id: 8, data: 'Data from row 8'},
        {id: 9, data: 'Data from row 9'},      
        {id: 10, data: 'Data from row 10'},
        {id: 11, data: 'Data from row 11'},
        {id: 12, data: 'Data from row 12'},
      ]);
    });
};
