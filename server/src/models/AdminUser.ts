import { Schema, model, type Document } from "mongoose";

export type AdminRole = "super" | "editor";

interface StoredRefreshToken {
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface AdminUserDoc extends Document {
  email: string;
  passwordHash: string;
  role: AdminRole;
  lastLoginAt?: Date;
  refreshTokens: StoredRefreshToken[];
  createdAt: Date;
  updatedAt: Date;
}

const adminUserSchema = new Schema<AdminUserDoc>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["super", "editor"], default: "editor" },
    lastLoginAt: { type: Date },
    refreshTokens: {
      type: [
        new Schema<StoredRefreshToken>(
          {
            tokenHash: { type: String, required: true },
            expiresAt: { type: Date, required: true },
            createdAt: { type: Date, default: Date.now }
          },
          { _id: false }
        )
      ],
      default: []
    }
  },
  { timestamps: true }
);

export const AdminUser = model<AdminUserDoc>("AdminUser", adminUserSchema);
