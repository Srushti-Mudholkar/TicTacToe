import sequelize from '../config/db.js';
import { Sequelize, DataTypes } from 'sequelize';

import PlayerModel from './player.js';
import GameModel from './game.js';
import MoveModel from './move.js';

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Player = PlayerModel(sequelize, DataTypes);
db.Game = GameModel(sequelize, DataTypes);
db.Move = MoveModel(sequelize, DataTypes);

db.Game.belongsTo(db.Player, { as: 'playerX' });
db.Game.belongsTo(db.Player, { as: 'playerO' });
db.Game.belongsTo(db.Player, { as: 'winner' });
db.Game.hasMany(db.Move);

db.Move.belongsTo(db.Game);
db.Move.belongsTo(db.Player);

export default db;
