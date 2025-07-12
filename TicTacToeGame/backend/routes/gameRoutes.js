import express from 'express';
import { createGame, recordMove, getGameHistory} from '../controllers/gameControllers.js';

const router = express.Router();

router.post('/', createGame);
router.post('/:id/move', recordMove);
router.get('/history', getGameHistory);

export default router;
