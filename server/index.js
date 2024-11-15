/* eslint-disable  */
const express = require("express");
const app = express();
const cors = require("cors");
const route = express.Router();
const Route = require("./router/router")
const PORT = 9000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["set-cookie"],
  })
);
app.use("/", Route);
route.get("/", (req, res) => {
  res.json("Hello World");
});
app.listen(PORT, () => {
  console.log(`port ${PORT} Running`);
});
