import { getFinishedUpcomingTrips, getMostVisitedDestination, nextTrip, userLevel } from "../controllers/user-dashboard-controller";
import express, { Router } from "express";

const router: Router = express.Router();

router.get("/finupc/:id", getFinishedUpcomingTrips);
router.get("/mostvisited/:id", getMostVisitedDestination);
router.get("/next/:id", nextTrip);
router.get("/level/:id", userLevel);

export default router;