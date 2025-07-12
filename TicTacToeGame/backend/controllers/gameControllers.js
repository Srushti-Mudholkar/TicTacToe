import db from '../models/index.js';

export const createGame = async (req, res) => {
  try {
    const { playerXId, playerOId } = req.body;
    const game = await db.Game.create({
      currentTurn: 'X',
      playerXId,
      playerOId
    });
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create game.' });
  }
};

export const recordMove = async (req, res) => {
  try {
    const gameId = req.params.id;
    const { playerId, cellIndex, symbol, moveOrder } = req.body;

    const game = await db.Game.findByPk(gameId);
    if (!game) return res.status(404).json({ error: 'Game not found' });

    const isPlayerX = Number(playerId) === Number(game.playerXId);
    const isPlayerO = Number(playerId) === Number(game.playerOId);

    
    if ((symbol === 'X' && !isPlayerX) || (symbol === 'O' && !isPlayerO)) {
      return res.status(400).json({ error: 'Incorrect symbol for this player.' });
    }

    // Validate turn
    if ((game.currentTurn === 'X' && !isPlayerX) || (game.currentTurn === 'O' && !isPlayerO)) {
      return res.status(400).json({ error: 'Not your turn' });
    }

    // Validate cell availability
    const existingMove = await db.Move.findOne({
      where: { GameId: gameId, cellIndex }
    });
    if (existingMove) {
      return res.status(400).json({ error: 'Cell already taken' });
    }

    // Validate move count
    const moveCount = await db.Move.count({ where: { GameId: gameId } });
    if (moveCount >= 9) {
      return res.status(400).json({ error: 'Game already finished' });
    }

    // Create move
    const move = await db.Move.create({
      GameId: gameId,
      PlayerId: playerId,
      cellIndex,
      symbol,
      moveOrder
    });

    // Build board
    const moves = await db.Move.findAll({
      where: { GameId: gameId },
      order: [['moveOrder', 'ASC']]
    });

    const board = Array(9).fill(null);
    moves.forEach(m => {
      board[m.cellIndex] = m.symbol;
    });

    // Check winner
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    let winnerSymbol = null;
    for (let [a, b, c] of winningCombos) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winnerSymbol = board[a];
        break;
      }
    }

    if (winnerSymbol) {
      game.winnerId = winnerSymbol === 'X' ? game.playerXId : game.playerOId;
    } else if (moves.length === 9) {
      game.isDraw = true;
    } else {
      game.currentTurn = symbol === 'X' ? 'O' : 'X';
    }

    await game.save();

    return res.status(201).json({ move, board, winner: winnerSymbol || null });

  } catch (e) {
    return res.status(500).json({ error: 'Failed to record move', details: e.message });
  }
};

export const getGameHistory = async (req, res) => {
  try {
    const games = await db.Game.findAll({
      include: [
        { model: db.Player, as: 'playerX' },
        { model: db.Player, as: 'playerO' },
        { model: db.Player, as: 'winner' }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch game history.' });
  }
};
