const secret = require('./secret')
const Pool = require('pg').Pool

// Configuration for the database, is exported as 'config'
const db = new Pool({
  user: secret.username,
  password: secret.password,
  host: 'tyke.db.elephantsql.com',
  database: 'dlhkwpnu',
  port: 5432,
  max: 1,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
  ssl: true
})

db.on('connect', (client) => {
  client.query("SET search_path TO 'sollicitaties'")
})


module.exports = db;