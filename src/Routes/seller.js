import { Router } from "express";

const router = Router();

import {methods as seller} from "../Controllers/seller.js";
import {validateToken} from "../Helpers/jwtHelperkey.js"

router.post("/registerSeller",seller.addSeller);
router.put("/updateSeller/:idVendedor",validateToken,seller.updateSeller);
router.get("/getSeller/:idVendedor",validateToken,seller.getSeller);
router.get("/getReview/:idVendedor",validateToken,seller.getReview);
router.get("/getSellers",seller.getSellers);

module.exports = router;

