import { Router } from "express";

const router = Router();

import {methods as buyer} from "../Controllers/buyer.js";

router.post("/",buyer.addBuyer);

module.exports = router;