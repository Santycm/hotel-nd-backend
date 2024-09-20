import {Router} from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const router = Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, '../public');

router.get("/", (req, res) => {
  res.sendFile(publicPath + "/home.html");
});

router.get('/login', (req, res) => {
  res.sendFile(publicPath + '/login.html');
});

router.get("/register", (req, res) => {
  res.sendFile(publicPath + "/register.html");
});

router.get("/suites", (req, res) => {
  res.sendFile(publicPath + "/suites.html");
});

router.get("/createsuite", (req, res) => {
  res.sendFile(publicPath + "/createSuite.html");
});

router.get("/profile", (req, res) => {
  res.sendFile(publicPath + '/profile.html');
});

export default router;