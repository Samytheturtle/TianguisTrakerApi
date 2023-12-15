import { Router } from "express";

const router = Router();

import {methods as tianguis} from "../Controllers/tianguis.js";

router.get("/", tianguis.getHorarioTianguis);
router.get("/getTianguisById/:idTianguis",tianguis.getTianguisById);

module.exports = router;