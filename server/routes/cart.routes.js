import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cart.controller.js";
import { validateCartItem } from "../middlewares/cart.middleware.js";

const CartRouter = Router();
CartRouter.use(verifyToken);
CartRouter.post("/add", validateCartItem, addToCart);
CartRouter.get("/:userId", getCart);
CartRouter.put("/update", validateCartItem, updateCartItem);
CartRouter.delete("/:productId/:size", removeCartItem);
CartRouter.delete("/clear", clearCart);

export default CartRouter;
