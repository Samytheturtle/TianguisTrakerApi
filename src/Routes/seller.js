import { Router } from "express";

const router = Router();

import {methods as seller} from "../Controllers/seller.js";

router.post("/",seller.addSeller);

module.exports = router;