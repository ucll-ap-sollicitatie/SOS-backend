const Pool = require("pg").Pool;
require("dotenv").config();

// Configuration for the database, is exported as 'config'
const db = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  host: "193.191.177.196",
  database: "soc",
  port: 5432,
});

module.exports = db;
