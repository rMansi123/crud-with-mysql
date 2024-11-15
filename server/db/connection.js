/* eslint-disable */
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to mysql", err);
    return;
  }
  console.log("Connecting to mysql database");
});

module.exports = connection;
