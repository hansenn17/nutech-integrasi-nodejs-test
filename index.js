const express = require("express");
const app = express();

require("dotenv").config();

require("./config/database.config");

app.use(express.json());

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
