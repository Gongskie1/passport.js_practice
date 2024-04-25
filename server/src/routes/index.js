import { Router } from "express";
import user_routes from "../user/route.js";
const router = Router();


router.use(user_routes);


export default router;