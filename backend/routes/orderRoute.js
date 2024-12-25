import express from "express";
import {
  placeOrder,
  verifyStripe,
  placeOrderStripe,
  placeOrderChapa,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/chapa", authUser, placeOrderChapa);
orderRouter.post("/stripe", authUser, placeOrderStripe);

orderRouter.post("/userorders", authUser, userOrders);

orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
