const Pool = require("pg").Pool;
require("dotenv").config();

// Configuration for the database, is exported as 'config'
const db = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DB,
  port: 5432,
});

// Sets the search_path to the correct schema, depending on environment.
db.on("connect", (client) => {
  if (process.env.NODE_ENV == "production") {
    client.query("SET search_path TO prod;");
  } else {
    client.query("SET search_path TO dev;");
  }
});

module.exports = db;
