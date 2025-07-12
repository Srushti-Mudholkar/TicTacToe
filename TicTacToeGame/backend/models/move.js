export default (sequelize, DataTypes) => {
  return sequelize.define('Move', {
    cellIndex: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    moveOrder: DataTypes.INTEGER
  });
};
