export default (sequelize, DataTypes) => {
  return sequelize.define('Player', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
