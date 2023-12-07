import { Router } from "express";
const router = Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { methods as Advertisement} from "../Controllers/advertisement.js";
import {validateToken} from "../Helpers/jwtHelperkey.js"


router.post("/addAdvertisement",validateToken,upload.single('image'),Advertisement.addAdvertisement);
router.post("/addFavoriteAdvertisement",validateToken,Advertisement.addFavoriteProduct);
router.get("/getAdvertisement/:idAnuncioFav",Advertisement.getAdvertisementId);
router.post("/addPulletApartAdvertisement",validateToken,Advertisement.addAdvertisementPulledApart);
router.put("/updateAdvertisementSelled",validateToken,Advertisement.updateAdvertisementSelled);
router.get("/getAdvertisementTianguis/:idTianguisAnuncio",Advertisement.getAdvertisementByTianguis);
router.get("/getAdvertisementCategory/:idCategoriaAnuncio",Advertisement.getAdvertisementByCategory);
router.get("/getAdvertisementBuyer/:idComprador",Advertisement.getAdvertisementPulledApart);

module.exports = router;