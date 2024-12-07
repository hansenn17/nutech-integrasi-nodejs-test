const pg = require("pg");
const { Client } = pg;

require("dotenv").config();

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

client.connect((err) => {
  if (err) {
    console.error("error connecting to database: ", err.message);
  }
  console.info("connection to database success");
});

module.exports = client;
