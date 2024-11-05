// src/middleware/rate-limit.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { rateLimit } from 'express-rate-limit';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    statusCode: 429, // Custom status code for rate limit
    headers: true, // Enable headers to show rate limit status
  });

  use(req: Request, res: Response, next: NextFunction) {
    // Use the configured rate limiter
    this.limiter(req, res, next);
  }
}
