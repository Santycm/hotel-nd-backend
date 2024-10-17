import {Router} from 'express';
import { UserController } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = Router();

/* Method post */
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post("/createReservation", verifyToken, UserController.createReservation); //create reservation
router.post("/verifyAvailable", UserController.verifyAvaliability); //verify available whuile loading the page

//Method get
router.get("/suites", UserController.getSuites);
router.get("/profile", verifyToken, UserController.profile);
router.get("/users", UserController.getAllUsers);
router.post("/suiteInfo", UserController.getSuiteInfo);

export default router;