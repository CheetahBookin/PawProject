import {bestRated} from "../controllers/best-rated-controller";
import express, {Router} from "express";

const router: Router = express.Router()

router.get('/', bestRated)

export default router