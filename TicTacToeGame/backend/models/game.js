export default (sequelize, DataTypes) => {
  return sequelize.define('Game', {
    currentTurn: DataTypes.STRING,
    isDraw: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
};
