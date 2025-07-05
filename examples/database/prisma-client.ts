import { PrismaClient } from '@prisma/client';
import { config } from '../config/environment';

/**
 * Prisma client setup with connection management and error handling.
 * 
 * This example demonstrates:
 * - Singleton pattern for database connection
 * - Environment-based configuration
 * - Connection lifecycle management
 * - Error handling and logging
 */

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

/**
 * Create and configure Prisma client instance.
 */
const createPrismaClient = (): PrismaClient => {
  return new PrismaClient({
    log: config.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    datasources: {
      db: {
        url: config.DATABASE_URL,
      },
    },
  });
};

/**
 * Get Prisma client instance (singleton pattern).
 * In development, use global to prevent multiple instances during hot reload.
 */
export const prisma = globalThis.__prisma ?? createPrismaClient();

if (config.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

/**
 * Connect to database with retry logic.
 */
export const connectDatabase = async (): Promise<void> => {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      await prisma.$connect();
      console.log('Database connected successfully');
      return;
    } catch (error) {
      retries++;
      console.error(`Database connection attempt ${retries} failed:`, error);
      
      if (retries >= maxRetries) {
        throw new Error(`Failed to connect to database after ${maxRetries} attempts`);
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000));
    }
  }
};

/**
 * Disconnect from database gracefully.
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
    console.log('Database disconnected successfully');
  } catch (error) {
    console.error('Error disconnecting from database:', error);
  }
};

/**
 * Check database health.
 */
export const checkDatabaseHealth = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database health check failed:', error);
    return false;
  }
};

/**
 * Database transaction wrapper with retry logic.
 */
export const withTransaction = async <T>(
  callback: (tx: PrismaClient) => Promise<T>
): Promise<T> => {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      return await prisma.$transaction(callback);
    } catch (error) {
      retries++;
      console.error(`Transaction attempt ${retries} failed:`, error);
      
      if (retries >= maxRetries) {
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * retries));
    }
  }

  throw new Error('Transaction failed after maximum retries');
};

// Handle cleanup on process termination
process.on('SIGINT', async () => {
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectDatabase();
  process.exit(0);
});