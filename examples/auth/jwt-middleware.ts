import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/environment';
import { UnauthorizedError } from '../utils/errors';

/**
 * JWT authentication middleware for protecting routes.
 * 
 * This example demonstrates:
 * - JWT token validation
 * - Request augmentation with user data
 * - Proper error handling
 * - TypeScript typing for Express middleware
 */

export interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

/**
 * Middleware to authenticate JWT tokens.
 * Adds user information to request object if token is valid.
 */
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new UnauthorizedError('No token provided');
    }

    // Verify token
    const payload = jwt.verify(token, config.JWT_SECRET) as JWTPayload;
    
    // Attach user information to request
    (req as AuthenticatedRequest).user = {
      id: payload.userId,
      email: payload.email,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new UnauthorizedError('Invalid token'));
    } else if (error instanceof jwt.TokenExpiredError) {
      next(new UnauthorizedError('Token expired'));
    } else {
      next(error);
    }
  }
};

/**
 * Optional authentication middleware.
 * Adds user information if token is present and valid, but doesn't require it.
 */
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (token) {
      const payload = jwt.verify(token, config.JWT_SECRET) as JWTPayload;
      (req as AuthenticatedRequest).user = {
        id: payload.userId,
        email: payload.email,
      };
    }

    next();
  } catch (error) {
    // For optional auth, we ignore token errors and continue
    next();
  }
};

/**
 * Generate JWT access token.
 */
export const generateAccessToken = (userId: string, email: string): string => {
  return jwt.sign(
    { userId, email },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN }
  );
};

/**
 * Generate JWT refresh token.
 */
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { userId, type: 'refresh' },
    config.JWT_REFRESH_SECRET,
    { expiresIn: config.JWT_REFRESH_EXPIRES_IN }
  );
};