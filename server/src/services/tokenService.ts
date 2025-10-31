import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AdminUser, type AdminUserDoc } from "../models/AdminUser.js";

function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function generateAccessToken(user: AdminUserDoc) {
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN
  });
}

export async function generateRefreshToken(user: AdminUserDoc) {
  const randomPart = crypto.randomBytes(48).toString("hex");
  const token = `${user.id}.${randomPart}`;
  const expiresAt = new Date(
    Date.now() + parseExpiry(env.JWT_REFRESH_EXPIRES_IN ?? "7d")
  );

  user.refreshTokens.push({
    tokenHash: hashToken(token),
    expiresAt,
    createdAt: new Date()
  });

  user.refreshTokens = user.refreshTokens.filter(
    (entry) => entry.expiresAt > new Date()
  );

  await user.save();

  return { token, expiresAt };
}

export async function validateRefreshToken(token: string) {
  const [userId] = token.split(".");
  if (!userId) {
    return null;
  }

  const user = await AdminUser.findById(userId);
  if (!user) {
    return null;
  }

  const tokenHash = hashToken(token);
  const stored = user.refreshTokens.find(
    (entry) => entry.tokenHash === tokenHash && entry.expiresAt > new Date()
  );

  if (!stored) {
    return null;
  }

  return user;
}

export async function revokeRefreshToken(token: string) {
  const [userId] = token.split(".");
  if (!userId) {
    return;
  }

  const user = await AdminUser.findById(userId);
  if (!user) {
    return;
  }
  const tokenHash = hashToken(token);
  user.refreshTokens = user.refreshTokens.filter(
    (entry) => entry.tokenHash !== tokenHash
  );
  await user.save();
}

function parseExpiry(input: string) {
  const match = /^(\d+)([smhd])$/.exec(input);
  if (!match) {
    return 1000 * 60 * 60 * 24 * 7;
  }
  const value = Number.parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    case "d":
      return value * 24 * 60 * 60 * 1000;
    default:
      return value;
  }
}
