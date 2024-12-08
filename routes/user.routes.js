const express = require("express");

const UserController = require("../controller/user.controller");

const router = express.Router();
const userController = new UserController();

router.post("/registration", userController.registerUser);

module.exports = router;
