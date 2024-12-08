const express = require("express");
const app = express();

const userRouter = require("./routes/user.routes");

require("dotenv").config();

require("./config/database.config");

app.use(express.json());

app.use("/", userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
