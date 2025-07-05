import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateToken, generateAccessToken, JWTPayload } from '../auth/jwt-middleware';
import { UnauthorizedError } from '../utils/errors';

/**
 * Authentication middleware tests.
 * 
 * This example demonstrates:
 * - Mocking Express request/response objects
 * - Testing middleware functions
 * - JWT token testing patterns
 * - Error handling verification
 */

// Mock the config module
jest.mock('../config/environment', () => ({
  config: {
    JWT_SECRET: 'test-secret',
    JWT_EXPIRES_IN: '1h',
  },
}));

describe('Authentication Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {};
    mockNext = jest.fn();
  });

  describe('authenticateToken', () => {
    it('should authenticate valid token and add user to request', async () => {
      // Arrange
      const userId = 'user123';
      const email = 'test@example.com';
      const token = generateAccessToken(userId, email);
      
      mockRequest.headers = {
        authorization: `Bearer ${token}`,
      };

      // Act
      await authenticateToken(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockNext).toHaveBeenCalledWith();
      expect((mockRequest as any).user).toEqual({
        id: userId,
        email,
      });
    });

    it('should throw UnauthorizedError when no token provided', async () => {
      // Arrange
      mockRequest.headers = {};

      // Act
      await authenticateToken(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockNext).toHaveBeenCalledWith(
        expect.any(UnauthorizedError)
      );
    });

    it('should throw UnauthorizedError when token is invalid', async () => {
      // Arrange
      mockRequest.headers = {
        authorization: 'Bearer invalid-token',
      };

      // Act
      await authenticateToken(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockNext).toHaveBeenCalledWith(
        expect.any(UnauthorizedError)
      );
    });

    it('should throw UnauthorizedError when token is expired', async () => {
      // Arrange
      const expiredToken = jwt.sign(
        { userId: 'user123', email: 'test@example.com' },
        'test-secret',
        { expiresIn: '-1h' } // Expired token
      );

      mockRequest.headers = {
        authorization: `Bearer ${expiredToken}`,
      };

      // Act
      await authenticateToken(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      // Assert
      expect(mockNext).toHaveBeenCalledWith(
        expect.any(UnauthorizedError)
      );
    });
  });

  describe('generateAccessToken', () => {
    it('should generate valid JWT token', () => {
      // Arrange
      const userId = 'user123';
      const email = 'test@example.com';

      // Act
      const token = generateAccessToken(userId, email);

      // Assert
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');

      // Verify token contents
      const payload = jwt.verify(token, 'test-secret') as JWTPayload;
      expect(payload.userId).toBe(userId);
      expect(payload.email).toBe(email);
    });

    it('should generate token with expiration', () => {
      // Arrange
      const userId = 'user123';
      const email = 'test@example.com';

      // Act
      const token = generateAccessToken(userId, email);

      // Assert
      const payload = jwt.verify(token, 'test-secret') as JWTPayload;
      expect(payload.exp).toBeDefined();
      expect(payload.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
    });
  });
});