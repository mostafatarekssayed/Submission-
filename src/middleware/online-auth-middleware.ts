import { NextFunction, Request, Response } from "express";
import api from "../api-client/api";
import { AuthUser } from "../types/auth-user.type";
import { status_code } from "../status-codes";
import { NOT_AUTHORIZED } from "../error-msgs";

const subRoute = "auth/me";
const onlineAuthMiddleware = async function (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const authToken = req.get("authorization");
    api
      .get<AuthUser>(subRoute, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        req.user = response?.data;
        next();
        resolve()
      })
      .catch((error) => {
        res.status(status_code.NOT_AUTHORIZED).send(NOT_AUTHORIZED);
        resolve()
      });
  });
};
export default onlineAuthMiddleware;
