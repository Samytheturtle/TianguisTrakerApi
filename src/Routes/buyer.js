import { Router } from "express";

const router = Router();
import {validateToken} from "../Helpers/jwtHelperkey.js"

import {methods as buyer} from "../Controllers/buyer.js";


router.post("/registerBuyer",buyer.addBuyer);
router.put("/updateBuyer/:idComprador",validateToken,buyer.updateBuyer);
router.post("/addReview",validateToken,buyer.addReview);
router.get("/getBuyer/:idComprador",validateToken,buyer.getBuyerById);

module.exports = router;