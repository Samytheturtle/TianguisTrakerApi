import { Router } from "express";

const router = Router();
import {validateToken} from "../Helpers/jwtHelperkey.js"

import {methods as buyer} from "../Controllers/buyer.js";


router.post("/registerBuyer",buyer.addBuyer);
router.put("/updateBuyer/:idComprador",validateToken,buyer.updateBuyer);
router.post("/addReview",validateToken,buyer.addReview);

module.exports = router;