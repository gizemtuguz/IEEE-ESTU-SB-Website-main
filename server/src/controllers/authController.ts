import type { Request, Response } from "express";
import {
  authenticateAdmin,
  logoutAdmin,
  refreshTokens
} from "../services/authService.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { env, isProd } from "../config/env.js";

const REFRESH_COOKIE = "ieee_refresh";

function setRefreshCookie(res: Response, token: string, expiresAt: Date) {
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    expires: expiresAt,
    path: "/api/auth/refresh"
  });
}

function clearRefreshCookie(res: Response) {
  res.clearCookie(REFRESH_COOKIE, {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    path: "/api/auth/refresh"
  });
}

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const result = await authenticateAdmin(email, password);

  if (!result) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  setRefreshCookie(res, result.refreshToken, result.refreshTokenExpiresAt);

  res.json({
    accessToken: result.accessToken,
    user: {
      id: result.user.id,
      email: result.user.email,
      role: result.user.role
    },
    expiresIn: env.JWT_ACCESS_EXPIRES_IN
  });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const bodyToken = (req.body as { refreshToken?: string })?.refreshToken;
  const cookieToken = req.cookies?.[REFRESH_COOKIE] as string | undefined;
  const token = bodyToken ?? cookieToken;

  if (!token) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  const result = await refreshTokens(token);
  if (!result) {
    clearRefreshCookie(res);
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  setRefreshCookie(res, result.refreshToken, result.refreshTokenExpiresAt);

  res.json({
    accessToken: result.accessToken,
    user: {
      id: result.user.id,
      email: result.user.email,
      role: result.user.role
    },
    expiresIn: env.JWT_ACCESS_EXPIRES_IN
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const cookieToken = req.cookies?.[REFRESH_COOKIE] as string | undefined;
  if (cookieToken) {
    await logoutAdmin(cookieToken);
  }
  clearRefreshCookie(res);
  res.status(204).send();
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json({ user: req.user });
});
