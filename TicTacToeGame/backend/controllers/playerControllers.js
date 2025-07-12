import db from '../models/index.js';

export const createPlayer = async (req, res) => {
  try {
    const { name } = req.body;
    const player = await db.Player.create({ name });
    res.status(201).json(player);
  } catch (e) {
    res.status(500).json({ e : 'Error while creating player' });
  }
};
