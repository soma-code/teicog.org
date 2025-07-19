# teicog.org

Official website for teicog.org built with Deno, TypeScript, and Shadcn/UI

## 🚀 Quick Start

### Prerequisites

- [Deno](https://deno.land/) 2.0+ installed

### Installation

1. Clone the repository:
```bash
git clone https://github.com/soma-code/teicog.org.git
cd teicog.org
```

2. Run the development server:
```bash
deno task dev
```

3. Open your browser and navigate to `http://localhost:8000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Button.ts       # Example button component
├── lib/                # Utility functions and helpers
│   └── utils.ts        # Common utility functions
├── tests/              # Test files and testing infrastructure
│   ├── setup.ts        # Test utilities and helpers
│   └── example.test.ts # Example test cases
└── main.ts             # Main application entry point
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
deno task test

# Run tests in watch mode
deno task test:watch

# Run specific test file
deno test src/tests/example.test.ts
```

### Testing Infrastructure

The project includes a comprehensive testing infrastructure with:

- **Test Utilities** (`src/tests/setup.ts`):
  - Mock request/response helpers
  - Spy functions for tracking calls
  - Custom assertions for common test patterns
  - Test data generators

- **Example Tests** (`src/tests/example.test.ts`):
  - Component testing examples
  - Utility function tests
  - Integration test patterns
  - Mock usage demonstrations

### Writing Tests

Tests should be placed in the `src/tests/` directory with the `.test.ts` suffix. Import test utilities from `setup.ts`:

```typescript
import { TestUtils, TestData, assertEquals, assertExists } from "./setup.ts";

Deno.test("example test", () => {
  // Your test code here
  const result = someFunction();
  assertEquals(result, expectedValue);
});
```

## 🛠️ Development

### Available Commands

```bash
# Start development server with hot reload
deno task dev

# Start production server
deno task start

# Run tests
deno task test

# Run tests in watch mode
deno task test:watch

# Format code
deno task fmt

# Lint code
deno task lint

# Type check
deno task check
```

### Code Quality

The project is configured with:

- **TypeScript** strict mode for type safety
- **Deno fmt** for consistent code formatting
- **Deno lint** for code quality checks
- **Testing** infrastructure for reliability

### Adding Components

1. Create a new component in `src/components/`
2. Export the component class with proper TypeScript types
3. Add corresponding tests in `src/tests/`
4. Follow the existing patterns for consistency

### Adding Utilities

1. Add utility functions to `src/lib/utils.ts`
2. Include proper TypeScript types and JSDoc comments
3. Write comprehensive tests for all utility functions
4. Ensure functions are pure and reusable

## 🏗️ Architecture

### Design Principles

- **Clean Architecture**: Separation of concerns with clear boundaries
- **Testing First**: Comprehensive testing infrastructure and examples
- **Type Safety**: Full TypeScript support with strict mode
- **Modern Standards**: Latest Deno and web standards
- **Component-Based**: Reusable UI components with proper encapsulation

### Technology Stack

- **Runtime**: [Deno](https://deno.land/) 2.0+
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.8+
- **Testing**: Deno's built-in testing framework
- **HTTP Server**: Deno's standard library
- **Future**: Shadcn/UI components (to be integrated)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
