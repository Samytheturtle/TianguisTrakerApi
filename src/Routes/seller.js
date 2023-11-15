import { Router } from "express";

const router = Router();

import {methods as seller} from "../Controllers/seller.js";

router.post("/registerSeller",seller.addSeller);
router.put("/updateSeller",seller.updateSeller);

module.exports = router;