import {Router} from 'express';
import { UserController } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = Router();

/* Method post */
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post("/create-reservation", verifyToken, UserController.createReservation); //create reservation
router.post("/delete-reservation", verifyToken, UserController.deleteReservation); //delete reservation
router.post("/my-reservations", verifyToken, UserController.getReservationsByUser); //get reservations by user
router.post("/verify-available", UserController.verifyAvaliability); //verify available whuile loading the page

//Method get
router.get("/suites", UserController.getSuites);
router.get("/profile", verifyToken, UserController.profile);
router.get("/users", UserController.getAllUsers);
router.post("/suite-info", UserController.getSuiteInfo);

export default router;