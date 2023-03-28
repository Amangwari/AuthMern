const express = require("express");

const con = require("./db/conn");
const app = express();
const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser");
const port = 8009;


con();
app.use(express.json());
app.use(cookiParser());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`server start at port no: ${port}`);
});
