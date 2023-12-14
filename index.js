require("./db.js");
const express = require("express");
const app = express();
const port = process.env.PORT;

//MiddleWare
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
