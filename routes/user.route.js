import {Router} from 'express';
import { UserController } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = Router();

//Method post
router.post('/register', UserController.register);
router.post('/login', UserController.login);

//Method get
router.get("/suites", UserController.getSuites);
router.get("/profile", verifyToken, UserController.profile);
router.get("/users", UserController.getAllUsers);
router.post("/suiteInfo", UserController.getSuiteInfo);

//Dev TEST

router.post('/createReservation', UserController.createReservation);

export default router;