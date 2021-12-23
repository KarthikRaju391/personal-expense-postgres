const Pool = require('pg').Pool;

const pool = new Pool({
   user: 'postgres',
   password: 'gus7hls18',
   database: 'expense_database',
   host: 'localhost',
   port: 5432
});

module.exports = pool;