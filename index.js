const express = require("express");

const app = express();

const userRouter = require("./routes/user.routes");
const authRouter = require("./routes/auth.routes");

require("dotenv").config();

require("./config/database.config");

app.use(express.json());

app.use("/", userRouter);
app.use("/", authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
