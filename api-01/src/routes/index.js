import express from "express";

/**
 * Import Routes
 */
import userRouter from "./user.router";

const routerAPI = (app) => {
  const router = express.Router();
  app.use("/api", router);

  /**
   * Routes
   */
  router.use("/users", userRouter);
};

export default routerAPI;
