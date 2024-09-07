import {Router} from 'express';
import path from 'path';

const router = Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicPath = path.join(__dirname, '../public');

router.get('/login', (req, res) => {
  res.sendFile(publicPath + '/login.html');
});

router.get("/profile", (req, res) => {
  res.sendFile(publicPath + '/profile.html');
});

export default router;