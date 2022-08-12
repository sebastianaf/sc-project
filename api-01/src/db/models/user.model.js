import { Model, DataTypes, Sequelize } from "sequelize";

const USER_TABLE = "users";

const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },

  alias: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },

  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  
  role: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  idUser: {
    allowNull: false,
    field: "id_user",
    type: DataTypes.INTEGER,
  },

  createAt: {
    allowNull: true,
    field: "created_at",
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

export { USER_TABLE, UserSchema, User };
