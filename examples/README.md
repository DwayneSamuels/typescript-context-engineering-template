# Examples Directory

This directory contains code examples and patterns that demonstrate best practices for TypeScript/Node.js development. These examples serve as reference implementations for the Context Engineering workflow.

## How to Use These Examples

1. **Study the patterns** - Understand the structure and conventions used
2. **Reference in INITIAL.md** - Point to specific examples when describing features
3. **Adapt, don't copy** - Use these as inspiration for your own implementations
4. **Add your own** - Place project-specific examples here for future reference

## Example Categories

### 1. Express Server Setup (`express-server.ts`)
Demonstrates:
- Basic Express server configuration
- Middleware setup and ordering
- Environment variable handling
- Graceful shutdown patterns

### 2. Authentication (`auth/`)
Demonstrates:
- JWT token generation and validation
- Password hashing with bcrypt
- Authentication middleware patterns
- Protected route implementations

### 3. Database Integration (`database/`)
Demonstrates:
- Prisma client setup and configuration
- Database connection management
- Query patterns and error handling
- Migration and seeding strategies

### 4. API Design (`api/`)
Demonstrates:
- RESTful endpoint structure
- Request/response typing
- Input validation with Zod
- Error response standardization

### 5. Testing (`__tests__/`)
Demonstrates:
- Unit test patterns
- Integration test setup
- Mocking strategies
- Test utilities and helpers

## Adding New Examples

When adding new examples:

1. **Create descriptive filenames** - Use clear, specific names
2. **Include comprehensive comments** - Explain the why, not just the what
3. **Follow TypeScript best practices** - Use proper typing throughout
4. **Add to this README** - Document what each example demonstrates
5. **Keep examples focused** - Each example should demonstrate one concept well

## TypeScript-Specific Patterns

These examples showcase:

- **Strict typing** - No `any` types, proper interface definitions
- **Modern syntax** - Use of async/await, destructuring, optional chaining
- **Utility types** - Proper use of `Partial`, `Pick`, `Omit`, etc.
- **Error handling** - Custom error classes and proper exception handling
- **Configuration** - Environment-based configuration with validation

## Integration with Context Engineering

These examples are designed to work seamlessly with the Context Engineering workflow:

1. **Reference in INITIAL.md** - Point to specific examples for patterns to follow
2. **Cited in PRPs** - Generated PRPs will reference these examples
3. **Implementation guidance** - Use these as templates during feature development
4. **Validation patterns** - Examples include proper testing and validation approaches

Remember: The goal is to provide comprehensive context that enables AI assistants to generate production-ready code that follows your project's conventions and best practices.