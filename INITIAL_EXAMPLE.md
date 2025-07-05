## FEATURE:

- TypeScript Express REST API with JWT authentication
- User registration and login endpoints
- Protected routes with middleware
- PostgreSQL database integration with Prisma ORM
- Input validation using Zod schemas
- Error handling with custom error classes
- Rate limiting and CORS configuration

## EXAMPLES:

In the `examples/` folder, there is a README for you to read to understand what each example demonstrates and how to structure your own code when you create the above feature.

- `examples/express-server.ts` - use this as a template for the Express server setup
- `examples/auth/` - read through all files here to understand JWT implementation, middleware patterns, and user authentication flow
- `examples/database/` - understand Prisma setup, schema definition, and database connection patterns
- `examples/validation/` - see how to use Zod for request validation and error handling

Don't copy any of these examples directly, as they are for a different project entirely. But use them as inspiration and for best practices.

## DOCUMENTATION:

- Express.js documentation: https://expressjs.com/
- Prisma documentation: https://www.prisma.io/docs/
- Zod documentation: https://zod.dev/
- JWT documentation: https://jwt.io/introduction/
- bcrypt documentation: https://www.npmjs.com/package/bcrypt
- TypeScript Express types: https://www.npmjs.com/package/@types/express

## OTHER CONSIDERATIONS:

- Include a `.env.example` file with all required environment variables
- README should include database setup instructions (PostgreSQL installation, migration commands)
- Use proper TypeScript types for all request/response objects
- Implement proper error handling middleware that doesn't leak sensitive information
- Environment variables should be validated at startup using Zod
- Use proper HTTP status codes and consistent API response format
- Include rate limiting to prevent abuse
- Set up proper CORS configuration for production
- Use bcrypt for password hashing with appropriate salt rounds
- JWT tokens should have reasonable expiration times
- Database queries should use proper error handling and connection pooling