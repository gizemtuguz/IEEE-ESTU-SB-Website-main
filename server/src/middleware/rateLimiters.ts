import rateLimit from "express-rate-limit";

export const formSubmissionLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: "Too many submissions, please try again later.",
  standardHeaders: true,
  legacyHeaders: false
});
