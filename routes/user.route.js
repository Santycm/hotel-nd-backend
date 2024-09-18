import {Router} from 'express';
import { UserController } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = Router();

router.post('/register', UserController.register);
router.get('/users', UserController.getAllUsers);
router.post('/login', UserController.login);
router.get('/profile', verifyToken, UserController.profile);
router.post('/createReservation', UserController.createReservation);
router.post('/createSuite', UserController.createSuite);
router.post('/createSuiteAvailability', UserController.createSuiteAvailability);

export default router;