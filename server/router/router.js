/* eslint-disable */
const express = require("express");
const Route = express.Router();
const userRoute = require("./userRoute");

Route.use("/", userRoute);

module.exports = Route;
