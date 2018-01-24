var knex = require('knex')({
  client: 'mysql',
  connection: {
    host :  process.env.WAR_DB_HOST,
    user : process.env.WAR_DB_USER,
    password : process.env.WAR_DB_PASS,
    database : process.env.WAR_DB
  }
  // debug: true
});

module.exports = {
  knex
}
