const express = require("express");
const router = express.Router();

const login = require("../Controllers/login.js");

router.post("/login",login.loginAccsess);

module.exports = router;