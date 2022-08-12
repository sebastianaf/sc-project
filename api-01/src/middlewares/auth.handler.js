/**
 * 1. Verify if the request is public
 * 2. Verify if the token exist
 * 3. If token exist check the token
 * 4. If token is ok then proceed
 */
import { decrypt } from "../tools/encryption";
import boom from "@hapi/boom";
import publicRoutes from "../config/publicRoutes.js";

const authHandler = (req, res, next) => {
  try {
    let token = req.headers.token;
    if (publicRoutes.some((e) => e === req.url)) {
      next();
    } else {
      token = decrypt(token);
      if (token) {
        next();
      } else {
        res.status(403).send(boom.unauthorized());
        next(boom.unauthorized());
      }
    }
  } catch (error) {
    res.status(403).send(boom.unauthorized());
    next(boom.unauthorized());
  }
};

export default authHandler;
