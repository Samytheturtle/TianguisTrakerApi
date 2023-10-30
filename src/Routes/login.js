import { Router } from "express";

const router = Router();

import {methods as login} from "../Controllers/login.js";

router.post("/",login.loginAuth);

module.exports = router;