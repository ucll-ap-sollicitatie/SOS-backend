const password = require('./secret');

// Configuration for the database, is exported as 'config'
const Pool = require('pg').Pool
const db = new Pool({
  user: 'dlhkwpnu',
  host: 'tyke.db.elephantsql.com',
  database: 'dlhkwpnu',
  password: password,
  port: 5432,
  max: 20,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
})

db.query("SET search_path TO 'solicitaties';")

module.exports = db;