import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";
import { UserController } from "../controllers/user.controller.js";
import multer from "multer";

const router = Router();
const storage = multer.memoryStorage(); // Almacenar archivos en memoria
const upload = multer({ storage });

router.post(
  "/createSuite",
  upload.array("image_gallery"),
  AdminController.createSuite
);

router.get("/getAllReservations", AdminController.getAllReservations);

router.post("/admin_delete-reservation", UserController.deleteReservation); //delete reservation

export default router;
