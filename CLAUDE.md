### 🔄 Project Awareness & Context
- **Always read `PLANNING.md`** at the start of a new conversation to understand the project's architecture, goals, style, and constraints.
- **Check `TASK.md`** before starting a new task. If the task isn't listed, add it with a brief description and today's date.
- **Use consistent naming conventions, file structure, and architecture patterns** as described in `PLANNING.md`.
- **Use the project's package manager** (npm/yarn/pnpm) as specified in `package.json` for all operations.

### 🧱 Code Structure & Modularity
- **Never create a file longer than 300 lines of code.** If a file approaches this limit, refactor by splitting it into modules or helper files.
- **Organize code into clearly separated modules**, grouped by feature or responsibility.
  For applications this looks like:
    - `src/` - Main source code
    - `src/types/` - Type definitions and interfaces
    - `src/utils/` - Utility functions and helpers
    - `src/services/` - Business logic and external API integrations
    - `src/controllers/` - Route handlers (for Express/Fastify apps)
    - `src/middleware/` - Express/Fastify middleware
- **Use barrel exports** (`index.ts` files) to create clean import paths.
- **Use absolute imports** when configured in `tsconfig.json` paths.
- **Use environment variables** with proper validation (zod, joi, or similar).

### 🧪 Testing & Reliability
- **Always create tests for new features** using the project's testing framework (Jest, Vitest, etc.).
- **After updating any logic**, check whether existing tests need to be updated. If so, do it.
- **Tests should live in a `__tests__` folder** next to the code they test, or in a separate `tests/` directory.
  - Include at least:
    - 1 test for expected behavior
    - 1 edge case test
    - 1 error handling test
- **Use proper mocking** for external dependencies and APIs.

### ✅ Task Completion
- **Mark completed tasks in `TASK.md`** immediately after finishing them.
- Add new sub-tasks or TODOs discovered during development to `TASK.md` under a "Discovered During Work" section.

### 📎 Style & Conventions
- **Use TypeScript** with strict mode enabled.
- **Follow the project's ESLint and Prettier configurations**.
- **Use modern TypeScript features**: utility types, branded types, const assertions, etc.
- **Prefer `const` over `let`**, and avoid `var` entirely.
- **Use `async/await` over Promises** for better readability.
- **Write JSDoc comments for all public functions and classes**:
  ```typescript
  /**
   * Brief description of what the function does.
   * 
   * @param param1 - Description of the parameter
   * @param param2 - Description of the parameter
   * @returns Description of what is returned
   * @throws {ErrorType} Description of when this error is thrown
   */
  function example(param1: string, param2: number): Promise<Result> {
    // implementation
  }
  ```
- **Use proper error handling** with custom error classes when appropriate.
- **Prefer composition over inheritance** and favor functional programming patterns.

### 🔧 TypeScript Specific Rules
- **Always use strict type checking** - no `any` types unless absolutely necessary.
- **Use `unknown` instead of `any`** when the type is truly unknown.
- **Define proper interfaces and types** for all data structures.
- **Use generic types** to create reusable, type-safe components.
- **Leverage discriminated unions** for complex state management.
- **Use `readonly` for immutable data** and `const assertions` where appropriate.
- **Prefer type guards and assertion functions** over type assertions.

### 📚 Documentation & Explainability
- **Update `README.md`** when new features are added, dependencies change, or setup steps are modified.
- **Comment complex logic** and ensure everything is understandable to a mid-level developer.
- **When writing complex logic, add a `// Reason:` comment** explaining the why, not just the what.
- **Keep `package.json` scripts up to date** with proper descriptions.

### 🧠 AI Behavior Rules
- **Never assume missing context. Ask questions if uncertain.**
- **Never hallucinate libraries or packages** – only use known, verified npm packages.
- **Always confirm file paths and module names** exist before referencing them in code or tests.
- **Never delete or overwrite existing code** unless explicitly instructed to or if part of a task from `TASK.md`.
- **Always run linting and type checking** before marking tasks complete.
- **Use the correct package manager** as specified in the project (check `package-lock.json`, `yarn.lock`, or `pnpm-lock.yaml`).

### 🔍 Validation Commands
- **Type checking**: `npx tsc --noEmit` or `npm run type-check`
- **Linting**: `npx eslint src/` or `npm run lint`
- **Testing**: `npm test` or `npm run test`
- **Building**: `npm run build`
- **Always run these commands** before considering a task complete.