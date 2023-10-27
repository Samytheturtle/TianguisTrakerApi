const express = require("express");
const router = express.Router();

const sellerController = require("../Controllers/seller.js");

router.post("/addSeller",sellerController.addSeller);

module.exports = router;