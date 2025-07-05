name: "Express REST API with JWT Authentication - TypeScript Implementation"
description: |

## Purpose
Build a production-ready Express.js REST API with JWT authentication, user management, and PostgreSQL database integration using modern TypeScript patterns and best practices.

## Core Principles
1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance

---

## Goal
Create a secure, scalable Express.js API with user authentication, protected routes, and proper error handling that follows TypeScript best practices and production-ready patterns.

## Why
- **Business value**: Provides secure user management foundation for applications
- **Integration**: Serves as base for other microservices and client applications
- **Problems solved**: Eliminates need to build authentication from scratch

## What
A TypeScript Express API with:
- User registration and login endpoints
- JWT-based authentication with refresh tokens
- Protected routes with middleware
- PostgreSQL integration via Prisma
- Input validation using Zod
- Comprehensive error handling
- Rate limiting and security middleware

### Success Criteria
- [ ] Users can register with email/password
- [ ] Users can login and receive JWT tokens
- [ ] Protected routes require valid JWT
- [ ] Database operations are type-safe with Prisma
- [ ] All inputs are validated with Zod schemas
- [ ] Error responses are consistent and secure
- [ ] API includes rate limiting and security headers

## All Needed Context

### Documentation & References
```yaml
# MUST READ - Include these in your context window
- url: https://expressjs.com/en/guide/routing.html
  why: Core routing patterns and middleware setup
  
- url: https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql
  why: Database setup and schema definition patterns
  
- url: https://zod.dev/
  why: Input validation schema patterns
  
- url: https://jwt.io/introduction/
  why: JWT token structure and best practices
  
- file: examples/express-server.ts
  why: Server setup patterns, middleware configuration
  
- file: examples/auth/jwt-middleware.ts
  why: JWT authentication middleware implementation
  
- file: examples/database/prisma-client.ts
  why: Database connection and error handling patterns
```

### Current Codebase tree
```bash
.
├── examples/
│   ├── express-server.ts
│   ├── auth/
│   │   ├── jwt-middleware.ts
│   │   └── password-utils.ts
│   └── database/
│       └── prisma-client.ts
├── CLAUDE.md
├── INITIAL.md
└── package.json
```

### Desired Codebase tree with files to be added
```bash
.
├── src/
│   ├── types/
│   │   ├── index.ts              # Exported types
│   │   ├── user.ts               # User-related types
│   │   └── auth.ts               # Authentication types
│   ├── schemas/
│   │   ├── index.ts              # Zod schema exports
│   │   ├── user.ts               # User validation schemas
│   │   └── auth.ts               # Auth validation schemas
│   ├── middleware/
│   │   ├── index.ts              # Middleware exports
│   │   ├── auth.ts               # JWT authentication middleware
│   │   ├── error-handler.ts      # Global error handling
│   │   └── validation.ts         # Request validation middleware
│   ├── services/
│   │   ├── index.ts              # Service exports
│   │   ├── auth.ts               # Authentication service
│   │   └── user.ts               # User management service
│   ├── controllers/
│   │   ├── index.ts              # Controller exports
│   │   ├── auth.ts               # Auth endpoints
│   │   └── user.ts               # User endpoints
│   ├── routes/
│   │   ├── index.ts              # Route exports
│   │   ├── auth.ts               # Auth routes
│   │   └── user.ts               # User routes
│   ├── utils/
│   │   ├── index.ts              # Utility exports
│   │   ├── jwt.ts                # JWT utilities
│   │   ├── password.ts           # Password hashing
│   │   └── errors.ts             # Custom error classes
│   ├── database/
│   │   ├── index.ts              # Database exports
│   │   └── client.ts             # Prisma client setup
│   ├── config/
│   │   ├── index.ts              # Config exports
│   │   └── environment.ts        # Environment validation
│   └── app.ts                    # Express app setup
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
├── __tests__/
│   ├── auth.test.ts             # Authentication tests
│   ├── user.test.ts             # User management tests
│   └── setup.ts                 # Test setup
├── .env.example                 # Environment variables template
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── jest.config.js              # Jest configuration
└── server.ts                   # Application entry point
```

### Known Gotchas & Library Quirks
```typescript
// CRITICAL: Express middleware order matters - auth before protected routes
// CRITICAL: Prisma requires database connection before any operations
// CRITICAL: JWT secrets must be strong and from environment variables
// CRITICAL: bcrypt async methods only - never use sync versions
// CRITICAL: Zod parse vs safeParse - safeParse for user input validation
// CRITICAL: Express error handlers must have 4 parameters to work
// CRITICAL: CORS must be configured before routes to work properly
```

## Implementation Blueprint

### Data models and structure

```typescript
// Core types for the application
interface User {
  id: string;
  email: string;
  password: string; // hashed
  createdAt: Date;
  updatedAt: Date;
}

interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

interface AuthResponse {
  user: Omit<User, 'password'>;
  accessToken: string;
  refreshToken: string;
}

// Zod schemas for validation
const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100)
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});
```

### List of tasks to be completed

```yaml
Task 1: Project Setup and Configuration
CREATE package.json:
  - Add TypeScript, Express, Prisma, Jest dependencies
  - Configure scripts for dev, build, test, migrate
  - Set up ESLint and Prettier configs

CREATE tsconfig.json:
  - Enable strict mode and modern ES features
  - Configure paths for clean imports
  - Set up build output directory

CREATE .env.example:
  - Database connection string
  - JWT secret and expiration
  - Port configuration

Task 2: Database Schema and Connection
CREATE prisma/schema.prisma:
  - Define User model with proper constraints
  - Set up PostgreSQL provider
  - Configure client generation

CREATE src/database/client.ts:
  - Initialize Prisma client with proper error handling
  - Add connection health check
  - Configure connection pooling

Task 3: Type Definitions and Validation
CREATE src/types/:
  - Define all interfaces and types
  - Export through barrel files
  - Use proper TypeScript utility types

CREATE src/schemas/:
  - Define Zod validation schemas
  - Create reusable validation patterns
  - Export through barrel files

Task 4: Utility Functions
CREATE src/utils/:
  - JWT token generation and verification
  - Password hashing with bcrypt
  - Custom error classes with proper inheritance
  - Export through barrel files

Task 5: Core Services
CREATE src/services/:
  - Authentication service with register/login logic
  - User service with CRUD operations
  - Use dependency injection pattern
  - Proper error handling and logging

Task 6: Middleware Implementation
CREATE src/middleware/:
  - JWT authentication middleware
  - Request validation middleware using Zod
  - Global error handler with proper logging
  - Rate limiting and security middleware

Task 7: Controllers and Routes
CREATE src/controllers/:
  - Auth controller with register/login endpoints
  - User controller with protected operations
  - Use async/await with proper error handling

CREATE src/routes/:
  - Define route handlers with middleware
  - Group related routes logically
  - Apply authentication where needed

Task 8: Application Setup
CREATE src/app.ts:
  - Configure Express with middleware
  - Set up CORS, helmet, rate limiting
  - Configure routes and error handling
  - Add health check endpoint

CREATE server.ts:
  - Application entry point
  - Database connection initialization
  - Graceful shutdown handling

Task 9: Testing Suite
CREATE __tests__/:
  - Unit tests for services and utilities
  - Integration tests for API endpoints
  - Mock database operations
  - Test authentication flows

Task 10: Documentation and README
CREATE README.md:
  - Installation and setup instructions
  - API endpoint documentation
  - Environment configuration
  - Development workflow
```

### Per task pseudocode

```typescript
// Task 5: Authentication Service
class AuthService {
  async register(email: string, password: string): Promise<AuthResponse> {
    // PATTERN: Validate input with Zod first
    const validated = RegisterSchema.parse({ email, password });
    
    // GOTCHA: Check if user exists before creating
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email }
    });
    
    if (existingUser) {
      throw new ConflictError('User already exists');
    }
    
    // CRITICAL: Hash password with proper salt rounds
    const hashedPassword = await bcrypt.hash(validated.password, 12);
    
    // PATTERN: Use transaction for data consistency
    const user = await prisma.user.create({
      data: {
        email: validated.email,
        password: hashedPassword
      }
    });
    
    // PATTERN: Generate tokens after successful creation
    const accessToken = generateAccessToken(user.id, user.email);
    const refreshToken = generateRefreshToken(user.id);
    
    return {
      user: omit(user, 'password'),
      accessToken,
      refreshToken
    };
  }
}

// Task 6: JWT Middleware
const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // PATTERN: Extract token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    
    if (!token) {
      throw new UnauthorizedError('No token provided');
    }
    
    // CRITICAL: Verify token with proper error handling
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
    
    // GOTCHA: Check if user still exists in database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId }
    });
    
    if (!user) {
      throw new UnauthorizedError('Invalid token');
    }
    
    // PATTERN: Attach user to request object
    req.user = omit(user, 'password');
    next();
  } catch (error) {
    next(error); // Let error handler deal with it
  }
};
```

### Integration Points
```yaml
DATABASE:
  - migration: "npx prisma migrate dev --name init"
  - seed: "npx prisma db seed"
  
CONFIG:
  - add to: src/config/environment.ts
  - pattern: "export const JWT_SECRET = process.env.JWT_SECRET || throwError('JWT_SECRET required')"
  
ROUTES:
  - add to: src/app.ts
  - pattern: "app.use('/api/auth', authRoutes)"
  
TYPES:
  - add to: src/types/express.d.ts
  - pattern: "declare global { namespace Express { interface Request { user?: User } } }"
```

## Validation Loop

### Level 1: Syntax & Style
```bash
# Run these FIRST - fix any errors before proceeding
npm run lint                     # ESLint with auto-fix
npm run type-check              # TypeScript compilation

# Expected: No errors. If errors, READ and fix.
```

### Level 2: Unit Tests
```typescript
// __tests__/auth.test.ts
describe('AuthService', () => {
  it('should register new user successfully', async () => {
    const result = await authService.register('test@example.com', 'password123');
    expect(result.user.email).toBe('test@example.com');
    expect(result.accessToken).toBeDefined();
  });

  it('should throw ConflictError for existing user', async () => {
    await authService.register('test@example.com', 'password123');
    await expect(
      authService.register('test@example.com', 'password123')
    ).rejects.toThrow(ConflictError);
  });

  it('should authenticate user with valid credentials', async () => {
    await authService.register('test@example.com', 'password123');
    const result = await authService.login('test@example.com', 'password123');
    expect(result.user.email).toBe('test@example.com');
  });
});
```

```bash
# Run and iterate until passing:
npm test
# If failing: Read error, understand root cause, fix code, re-run
```

### Level 3: Integration Test
```bash
# Start the service
npm run dev

# Test registration
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Expected: {"user": {...}, "accessToken": "...", "refreshToken": "..."}

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Test protected route
curl -X GET http://localhost:3000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Expected: {"id": "...", "email": "...", ...}
```

## Final Validation Checklist
- [ ] All tests pass: `npm test`
- [ ] No linting errors: `npm run lint`
- [ ] No type errors: `npm run type-check`
- [ ] Build succeeds: `npm run build`
- [ ] Database migrations work: `npx prisma migrate dev`
- [ ] Registration endpoint works
- [ ] Login endpoint works
- [ ] Protected routes require authentication
- [ ] Error responses are consistent
- [ ] Environment variables are validated
- [ ] README includes setup instructions

---

## Anti-Patterns to Avoid
- ❌ Don't store passwords in plain text - always hash
- ❌ Don't use weak JWT secrets - generate strong random strings
- ❌ Don't skip input validation - always validate with Zod
- ❌ Don't ignore database connection errors
- ❌ Don't leak sensitive information in error messages
- ❌ Don't use synchronous bcrypt methods - use async only
- ❌ Don't forget to handle token expiration properly

## Confidence Score: 9/10

High confidence due to:
- Clear documentation and examples provided
- Well-established patterns for Express + TypeScript
- Comprehensive validation gates
- Strong typing throughout
- Production-ready security practices

Minor uncertainty on specific PostgreSQL setup steps, but Prisma documentation provides clear guidance.