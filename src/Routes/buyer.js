import { Router } from "express";

const router = Router();

import {methods as buyer} from "../Controllers/buyer.js";

router.post("/registerBuyer",buyer.addBuyer);
router.put("/updateBuyer/:idComprador",buyer.updateBuyer);
router.post("/addReview",buyer.addReview);

module.exports = router;