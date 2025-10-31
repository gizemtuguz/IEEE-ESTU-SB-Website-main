import { env } from "../config/env.js";

interface RecaptchaResponse {
  success: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
}

export async function verifyRecaptcha(token: string, remoteIp?: string) {
  if (!env.RECAPTCHA_SECRET_KEY) {
    return true;
  }

  const params = new URLSearchParams();
  params.append("secret", env.RECAPTCHA_SECRET_KEY);
  params.append("response", token);
  if (remoteIp) {
    params.append("remoteip", remoteIp);
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString()
  });
  const data = (await response.json()) as RecaptchaResponse;
  return data.success === true && (data.score ?? 0) > 0.4;
}
