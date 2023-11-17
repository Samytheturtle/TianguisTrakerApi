import { Router } from "express";

const router = Router();

import { methods as Advertisement} from "../Controllers/advertisement.js";

router.post("/addAdvertisement",Advertisement.addAdvertisement);

module.exports = router;