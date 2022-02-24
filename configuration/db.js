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

if (process.env.NODE_ENV == "production") {
  db.on("connect", (client) => {
    client.query("SET search_path TO prod;");
  });
} else {
  db.on("connect", (client) => {
    client.query("SET search_path TO dev;");
  });
}

db.on("connect", (client) => {
  if (process.env.NODE_ENV == "production") {
    client.query("SET search_path TO prod;");
  } else {
    client.query("SET search_path TO dev;");
  }
});

module.exports = db;
