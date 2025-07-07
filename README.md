# TypeScript Context Engineering Template

A comprehensive template for getting started with Context Engineering, the discipline of engineering context for AI coding assistants so they have the information necessary to get the job done end to end with TypeScript and Node.js projects.

> **Context Engineering is 10x better than prompt engineering and 100x better than vibe coding.**

## 🙏 Attribution

This TypeScript template is adapted from the original [Context Engineering Intro](https://github.com/coleam00/context-engineering-intro) by [Cole Medin](https://github.com/coleam00). The original Python-based template provided the foundational concepts and workflow that have been adapted here for TypeScript/Node.js development.

**Original Creator:** Cole Medin ([@coleam00](https://github.com/coleam00))  
**Original Repository:** https://github.com/coleam00/context-engineering-intro  
**License:** MIT

Special thanks to Cole for pioneering the Context Engineering methodology and creating the comprehensive workflow system that makes AI-assisted development so much more effective.

## 🚀 Quick Start

```bash
# 1. Clone this template
git clone https://github.com/your-org/typescript-context-engineering-template.git
cd typescript-context-engineering-template

# 2. Set up your project rules (optional - template provided)
# Edit CLAUDE.md to add your project-specific guidelines

# 3. Add examples (highly recommended)
# Place relevant code examples in the examples/ folder

# 4. Create your initial feature request
# Edit INITIAL.md with your feature requirements

# 5. Generate a comprehensive PRP (Product Requirements Prompt)
# In Claude Code, run:
/generate-prp INITIAL.md

# 6. Execute the PRP to implement your feature
# In Claude Code, run:
/execute-prp PRPs/your-feature-name.md
```

## 📚 Table of Contents

- [What is Context Engineering?](#what-is-context-engineering)
- [Template Structure](#template-structure)
- [Step-by-Step Guide](#step-by-step-guide)
- [Writing Effective INITIAL.md Files](#writing-effective-initialmd-files)
- [The PRP Workflow](#the-prp-workflow)
- [Using Examples Effectively](#using-examples-effectively)
- [TypeScript-Specific Best Practices](#typescript-specific-best-practices)
- [Best Practices](#best-practices)

## What is Context Engineering?

Context Engineering represents a paradigm shift from traditional prompt engineering:

### Prompt Engineering vs Context Engineering

**Prompt Engineering:**
- Focuses on clever wording and specific phrasing
- Limited to how you phrase a task
- Like giving someone a sticky note

**Context Engineering:**
- A complete system for providing comprehensive context
- Includes documentation, examples, rules, patterns, and validation
- Like writing a full screenplay with all the details

### Why Context Engineering Matters

1. **Reduces AI Failures**: Most agent failures aren't model failures - they're context failures
2. **Ensures Consistency**: AI follows your project patterns and conventions
3. **Enables Complex Features**: AI can handle multi-step implementations with proper context
4. **Self-Correcting**: Validation loops allow AI to fix its own mistakes

## Template Structure

```
typescript-context-engineering/
├── .claude/
│   ├── commands/
│   │   ├── generate-prp.md     # Generates comprehensive PRPs
│   │   └── execute-prp.md      # Executes PRPs to implement features
│   └── settings.local.json     # Claude Code permissions
├── PRPs/
│   ├── templates/
│   │   └── prp_base.md        # Base template for PRPs
│   └── EXAMPLE_express_api_prp.md  # Example of a complete PRP
├── examples/                   # Your code examples (critical!)
├── CLAUDE.md                  # Global rules for AI assistant
├── INITIAL.md                 # Template for feature requests
├── INITIAL_EXAMPLE.md         # Example feature request
└── README.md                  # This file
```

## Step-by-Step Guide

### 1. Set Up Global Rules (CLAUDE.md)

The `CLAUDE.md` file contains project-wide rules that the AI assistant will follow in every conversation. The template includes:

- **Project awareness**: Reading planning docs, checking tasks
- **Code structure**: File size limits, module organization
- **Testing requirements**: Test patterns, coverage expectations
- **Style conventions**: TypeScript preferences, formatting rules
- **Documentation standards**: JSDoc formats, commenting practices

**You can use the provided template as-is or customize it for your project.**

### 2. Create Your Initial Feature Request

Edit `INITIAL.md` to describe what you want to build:

```markdown
## FEATURE:
[Describe what you want to build - be specific about functionality and requirements]

## EXAMPLES:
[List any example files in the examples/ folder and explain how they should be used]

## DOCUMENTATION:
[Include links to relevant documentation, APIs, or npm packages]

## OTHER CONSIDERATIONS:
[Mention any gotchas, specific requirements, or things AI assistants commonly miss]
```

**See `INITIAL_EXAMPLE.md` for a complete example.**

### 3. Generate the PRP

PRPs (Product Requirements Prompts) are comprehensive implementation blueprints that include:

- Complete context and documentation
- Implementation steps with validation
- Error handling patterns
- Test requirements

They are similar to PRDs (Product Requirements Documents) but are crafted more specifically to instruct an AI coding assistant.

Run in Claude Code:
```bash
/generate-prp INITIAL.md
```

**Note:** The slash commands are custom commands defined in `.claude/commands/`. You can view their implementation:
- `.claude/commands/generate-prp.md` - See how it researches and creates PRPs
- `.claude/commands/execute-prp.md` - See how it implements features from PRPs

The `$ARGUMENTS` variable in these commands receives whatever you pass after the command name (e.g., `INITIAL.md` or `PRPs/your-feature.md`).

This command will:
1. Read your feature request
2. Research the codebase for patterns
3. Search for relevant documentation
4. Create a comprehensive PRP in `PRPs/your-feature-name.md`

### 4. Execute the PRP

Once generated, execute the PRP to implement your feature:

```bash
/execute-prp PRPs/your-feature-name.md
```

The AI coding assistant will:
1. Read all context from the PRP
2. Create a detailed implementation plan
3. Execute each step with validation
4. Run tests and fix any issues
5. Ensure all success criteria are met

## Writing Effective INITIAL.md Files

### Key Sections Explained

**FEATURE**: Be specific and comprehensive
- ❌ "Build a web API"
- ✅ "Build a TypeScript Express REST API with JWT authentication, user management, PostgreSQL integration via Prisma, and comprehensive error handling"

**EXAMPLES**: Leverage the examples/ folder
- Place relevant code patterns in `examples/`
- Reference specific files and patterns to follow
- Explain what aspects should be mimicked

**DOCUMENTATION**: Include all relevant resources
- API documentation URLs
- Library guides
- npm package documentation
- TypeScript-specific resources

**OTHER CONSIDERATIONS**: Capture important details
- Authentication requirements
- Rate limits or quotas
- Common pitfalls
- Performance requirements
- TypeScript-specific gotchas

## The PRP Workflow

### How /generate-prp Works

The command follows this process:

1. **Research Phase**
   - Analyzes your codebase for patterns
   - Searches for similar implementations
   - Identifies conventions to follow

2. **Documentation Gathering**
   - Fetches relevant API docs
   - Includes library documentation
   - Adds gotchas and quirks

3. **Blueprint Creation**
   - Creates step-by-step implementation plan
   - Includes validation gates
   - Adds test requirements

4. **Quality Check**
   - Scores confidence level (1-10)
   - Ensures all context is included

### How /execute-prp Works

1. **Load Context**: Reads the entire PRP
2. **Plan**: Creates detailed task list using TodoWrite
3. **Execute**: Implements each component
4. **Validate**: Runs tests and linting
5. **Iterate**: Fixes any issues found
6. **Complete**: Ensures all requirements met

See `PRPs/EXAMPLE_express_api_prp.md` for a complete example of what gets generated.

## Using Examples Effectively

The `examples/` folder is **critical** for success. AI coding assistants perform much better when they can see patterns to follow.

### What to Include in Examples

1. **Code Structure Patterns**
   - How you organize modules
   - Import conventions
   - Class/function patterns

2. **Testing Patterns**
   - Test file structure
   - Mocking approaches
   - Assertion styles

3. **Integration Patterns**
   - API client implementations
   - Database connections
   - Authentication flows

4. **TypeScript Patterns**
   - Interface definitions
   - Generic usage
   - Type guards
   - Utility types

### Example Structure

```
examples/
├── README.md              # Explains what each example demonstrates
├── express-server.ts      # Express server setup pattern
├── auth/                  # Authentication patterns
│   ├── jwt-middleware.ts  # JWT middleware implementation
│   └── password-utils.ts  # Password hashing utilities
├── database/              # Database patterns
│   └── prisma-client.ts   # Prisma setup and usage
└── __tests__/            # Testing patterns
    ├── auth.test.ts       # Authentication tests
    └── setup.ts           # Test setup configuration
```

## TypeScript-Specific Best Practices

### 1. Type Safety First
- Use strict TypeScript configuration
- Prefer interfaces over types for extensibility
- Use utility types for transformations
- Implement proper error handling with typed errors

### 2. Modern Node.js Patterns
- Use ES modules with proper configuration
- Implement async/await consistently
- Use proper dependency injection
- Follow Node.js best practices for performance

### 3. Validation and Schemas
- Use Zod for runtime validation
- Define schemas for all external inputs
- Implement proper error responses
- Use discriminated unions for complex state

### 4. Testing Strategies
- Unit tests for business logic
- Integration tests for API endpoints
- Mock external dependencies properly
- Use proper TypeScript test utilities

## Best Practices

### 1. Be Explicit in INITIAL.md
- Don't assume the AI knows your preferences
- Include specific requirements and constraints
- Reference examples liberally

### 2. Provide Comprehensive Examples
- More examples = better implementations
- Show both what to do AND what not to do
- Include error handling patterns

### 3. Use Validation Gates
- PRPs include test commands that must pass
- AI will iterate until all validations succeed
- This ensures working code on first try

### 4. Leverage Documentation
- Include official API docs
- Add npm package documentation
- Reference specific documentation sections

### 5. Customize CLAUDE.md
- Add your conventions
- Include project-specific rules
- Define coding standards

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

## Credits

- **Original Context Engineering Concept:** [Cole Medin](https://github.com/coleam00) - [Context Engineering Intro](https://github.com/coleam00/context-engineering-intro)
- **TypeScript Adaptation:** Adapted for TypeScript/Node.js development patterns and tooling
