import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AdminUser } from "../models/AdminUser.js";
import {
  generateAccessToken,
  generateRefreshToken,
  revokeRefreshToken,
  validateRefreshToken
} from "./tokenService.js";
import { env } from "../config/env.js";

export async function authenticateAdmin(email: string, password: string) {
  const user = await AdminUser.findOne({ email: email.toLowerCase() });
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return null;
  }

  user.lastLoginAt = new Date();
  await user.save();

  const accessToken = generateAccessToken(user);
  const refresh = await generateRefreshToken(user);

  return {
    user,
    accessToken,
    refreshToken: refresh.token,
    refreshTokenExpiresAt: refresh.expiresAt
  };
}

export async function refreshTokens(refreshToken: string) {
  const user = await validateRefreshToken(refreshToken);
  if (!user) {
    return null;
  }

  const accessToken = generateAccessToken(user);
  const newRefresh = await generateRefreshToken(user);
  return {
    user,
    accessToken,
    refreshToken: newRefresh.token,
    refreshTokenExpiresAt: newRefresh.expiresAt
  };
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as {
    sub: string;
    email: string;
    role: "super" | "editor";
  };
}

export async function logoutAdmin(refreshToken: string) {
  await revokeRefreshToken(refreshToken);
}
