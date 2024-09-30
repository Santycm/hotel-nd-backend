import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";
import multer from "multer";

const router = Router();
const storage = multer.memoryStorage(); // Almacenar archivos en memoria
const upload = multer({ storage });

router.post(
  "/createSuite",
  upload.array("image_gallery"),
  AdminController.createSuite
);

export default router;
