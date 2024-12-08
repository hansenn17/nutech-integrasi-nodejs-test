const express = require("express");

const AuthController = require("../controller/auth.controller");
const auth = require("../middleware/auth.middleware");

const router = express.Router();
const authController = new AuthController();

router.post("/login", authController.login);

module.exports = router;
