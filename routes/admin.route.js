import { Router } from "express";
import {AdminController} from "../controllers/admin.controller.js";

const router = Router();


router.post("/createSuite", AdminController.createSuite);

export default router;