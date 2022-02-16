const password = require('./secret')
const Pool = require('pg').Pool

// Configuration for the database, is exported as 'config'
const db = new Pool({
  user: 'r0790938',
  host: 'databanken.ucll.be',
  database: 'probeer',
  password: password,
  port: 52122,
  max: 20,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
})

db.on('connect', (client) => {
  client.query("SET search_path TO 'sollicitaties'")
})


module.exports = db;