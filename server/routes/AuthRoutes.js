import {response, Router} from "express";
import { signupController } from "../auth/AuthController.js";
const router = Router();

router.get("/login", );
router.post("/signup",signupController);

export default router;
