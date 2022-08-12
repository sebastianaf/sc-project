import express from "express";

import UserService from "../services/user.service";
import {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
  loginUserSchema,
} from "../schemas/user.schema";
import validatorHandler from "../middlewares/validator.handler";

const router = express.Router();
const service = new UserService();

router.get("/", async (req, res, next) => {
  try {
    const users = await service.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  validatorHandler(createUserSchema, `body`),
  async (req, res, next) => {
    try {
      const newUser = await service.register(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  validatorHandler(loginUserSchema, `body`),
  async (req, res, next) => {
    try {
      const loginData = await service.login(req.body);
      res.send(loginData);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/check", async (req, res, next) => {
  try {
    const checkedData = await service.check(req.headers.token);
    res.send(checkedData);
  } catch (error) {
    next(error);
  }
});

export default router;
