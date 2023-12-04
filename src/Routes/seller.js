import { Router } from "express";

const router = Router();

import {methods as seller} from "../Controllers/seller.js";

router.post("/registerSeller",seller.addSeller);
router.put("/updateSeller/:idVendedor",seller.updateSeller);
router.get("/getSeller/:idVendedor",seller.getSeller);
router.get("/getReview/:idVendedor",seller.getReview);

module.exports = router;

