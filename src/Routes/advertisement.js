import { Router } from "express";
const router = Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { methods as Advertisement} from "../Controllers/advertisement.js";


router.post("/addAdvertisement",upload.single('image'),Advertisement.addAdvertisement);
router.post("/addFavoriteAdvertisement",Advertisement.addFavoriteProduct);
router.get("/getAdvertisement/:idAnuncioFav",Advertisement.getAdvertisementId);
router.post("/addPulletApartAdvertisement",Advertisement.addAdvertisementPulledApart);
router.put("/updateAdvertisementSelled",Advertisement.updateAdvertisementSelled);
router.get("/getAdvertisementTianguis/:idTianguisAnuncio",Advertisement.getAdvertisementByTianguis);
router.get("/getAdvertisementCategory/:idCategoriaAnuncio",Advertisement.getAdvertisementByCategory);
router.get("/getAdvertisementBuyer/:idComprador",Advertisement.getAdvertisementPulledApart);

module.exports = router;