import express, { Router } from "express";
import { postFavorite, getFavorites, removeFavorite, getFavoritesHotels } from "../controllers/favorites-controller";

const router: Router = express.Router();

router.post("/", postFavorite);
router.get("/hotels/:id", getFavoritesHotels);
router.get("/favs/:id", getFavorites);
router.delete("/", removeFavorite);

export default router;