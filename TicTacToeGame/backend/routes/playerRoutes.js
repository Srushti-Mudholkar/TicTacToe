import express from 'express';
import { createPlayer } from '../controllers/playerControllers.js';
const router = express.Router();

router.post('/', createPlayer);

export default router;
