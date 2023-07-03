import { RateLimiter } from "limiter";

export const authLimiter = new RateLimiter({
    tokensPerInterval: 5,
    interval: "hour"
});
