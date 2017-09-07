import RateLimit from "express-rate-limit";

export default new RateLimit({
  max: 50,
  windowMs: 60 * 1000,  // 1 minute
  delayMs: 0,           // disabled
  message: "Too many requests"
});
