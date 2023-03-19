import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { Token } from "../models";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const accessToken = req.get("Authorization");

      if (!accessToken) {
        throw new ApiError("No token", 401);
      }

      const tokenInfo = await Token.findById({ accessToken });

      if (!tokenInfo) {
        throw new ApiError("Token not valid", 401);
      }

      req.res.locals.tokenInfo = tokenInfo;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refreshToken = req.get("Authorization");

      if (!refreshToken) {
        throw new ApiError("No token", 401);
      }

      const tokenInfo = await Token.findById({ refreshToken });

      if (!tokenInfo) {
        throw new ApiError("Token not valid", 401);
      }

      req.res.locals.tokenInfo = tokenInfo;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
