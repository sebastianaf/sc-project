import sequelize from "../db/sequelize";
import boom from "@hapi/boom";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { encrypt, decrypt } from "../tools/encryption";

import errorCodes from "../config/errorCodes";

const { models } = sequelize;

class UserService {
  constructor() {}

  async createfirstUser() {
    const obj = await models.User.findOne({ where: { alias: "admin" } });

    const firstUser = {
      alias: "admin",
      password: "sim22com",
      idUser: 1,
      name: "Admin",
      role: "admin",
    };
    const salt = await bcryptjs.genSalt(10);
    const encryptedPassword = await bcryptjs.hash(firstUser.password, salt);
    if (obj) {
      return obj.update({
        ...firstUser,
        password: encryptedPassword,
      });
    } else {
      return this.register({
        ...firstUser,
        password: encryptedPassword,
      });
    }
  }

  async login(data) {
    const { alias, password } = data;
    /**
     * 1. Check the alias in the database
     * 2. Compare the password
     * 3. If the password is correct return a token
     */
    let user = await models.User.findOne({ where: { alias } });
    if (user) {
      const correct = await bcryptjs.compare(password, user.password);
      if (correct) {
        user.dataValues.password = undefined;
        let token = jwt.sign({ ...user.dataValues }, process.env.API_TOKEN, {
          expiresIn: process.env.API_TOKEN_EXPIRATION_TIME,
        });
        token = encrypt(token);
        return { token };
      }
    }
    return boom.badRequest("", errorCodes.BAD_USER_OR_PASSWORD);
  }

  async register(data) {
    try {
      const { alias, name, password, role, idUser } = data;
      const salt = await bcryptjs.genSalt(10);
      const encryptedPassword = await bcryptjs.hash(password, salt);
      const newUser = models.User.create({
        password: encryptedPassword,
        alias,
        idUser,
        name,
        role,
      });
      return newUser;
    } catch (error) {
      console.log(error);
      return boom.badRequest(error);
    }
  }

  async check(token) {
    try {
      const decrypted = decrypt(token);
      return decrypted;
    } catch (error) {
      return boom.unauthorized();
    }
  }

  async find() {
    const res = await models.User.findAll();
    return res;
  }
}

export default UserService;
