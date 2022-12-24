const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres', 
    password: 'felixfernando123',
    host: 'localhost',
    port: 5432, 
    database: 'pernauth'
})

module.exports = pool;