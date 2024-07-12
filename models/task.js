export default (sequelize, DataTypes) => {
  const Task = sequelize.define("tasks", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    assigneeId: {
      type: DataTypes.BIGINT,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    dueDate: {
      type: DataTypes.DATE,
    }
  });

  return Task;
};
