import { User, UserSchema } from "./user.model";

const setupModels = (sequelize) => {
  User.init(UserSchema, User.config(sequelize));
  /**
   * 
   * Here the other models
   * 
   */
};

export { setupModels };
