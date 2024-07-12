export default (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  });

  User.associcate = (models) => {
    User.belongsTo(models.Task, { foreignKey: 'assigneeId' })
  }

  return User;
};
