const secret = require('./secret')
const Pool = require('pg').Pool

// Configuration for the database, is exported as 'config'
const db = new Pool({
  user: secret.credentials.username,
  password: secret.credentials.password,
  host: '193.191.177.196',
  database: 'soc',
  port: 5432
})

// process.on('exit', db.client.)


module.exports = db;