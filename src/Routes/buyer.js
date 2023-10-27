const express = require("express");
const router = express.Router();

const buyerController = require("../Controllers/buyer.js");

router.post("/addBuyer",buyerController.addBuyer);

module.exports = router;