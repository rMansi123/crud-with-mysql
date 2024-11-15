/* eslint-disable  */
const express = require("express");
const {
  getPeoples,
  addPeople,
  deletePeople,
  updatePeople,
} = require("../userController/userController");
const Route = express.Router();

Route.get("/users", getPeoples);
Route.post("/add-people", addPeople);
Route.delete("/delete-people/:id", deletePeople);
Route.put("/update-people", updatePeople);

module.exports = Route;
