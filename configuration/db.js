const password = require('./secret');
const Pool = require('pg').Pool

// Configuration for the database, is exported as 'config'
const db = new Pool({
  user: 'dlhkwpnu',
  host: 'tyke.db.elephantsql.com',
  database: 'dlhkwpnu',
  password: password,
  port: 5432,
  max: 2,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
})

//db.query("SET search_path TO 'solicitaties';")

db.on('connect', (client) => {
  client.query("SET search_path TO 'solicitaties';")
})


module.exports = db;