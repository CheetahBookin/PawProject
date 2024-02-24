import { bookTrip, checkout, checkPaymentStatus, cancelReservation } from "../controllers/payment-controller";
import { Router } from "express";

const router = Router();

router.post("/book", bookTrip);
router.post("/checkout", checkout);
router.post("/status", checkPaymentStatus);
router.post("/cancel", cancelReservation);

export default router;