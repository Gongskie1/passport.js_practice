import { Router } from "express";
const router = Router();
import UserController from "./controller/User.js";

router.get("/createAccount", UserController.createAccount);

export default router