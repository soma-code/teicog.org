# teicog.org

Official website for teicog.org built with Deno, TypeScript, and modern web technologies.

## 🚀 Features

- **Deno Runtime**: Built with Deno for secure, modern JavaScript/TypeScript execution
- **Hono Framework**: Fast, lightweight web framework for edge computing
- **TypeScript**: Full type safety and modern language features
- **Deno Deploy**: Optimized for deployment on Deno Deploy edge network
- **Hot Reloading**: Development server with automatic reload on file changes
- **Production Ready**: Optimized builds and environment-specific configurations

## 🛠️ Development

### Prerequisites

- [Deno](https://deno.land/manual/getting_started/installation) installed on your machine

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/soma-code/teicog.org.git
   cd teicog.org
   ```

2. **Start development server**
   ```bash
   deno task dev
   ```
   
   The development server will start at `http://localhost:8000` with hot reloading enabled.

3. **Build and test**
   ```bash
   deno task build
   ```

### Available Scripts

- `deno task dev` - Start development server with hot reloading
- `deno task start` - Start production server
- `deno task build` - Run build checks and validation
- `deno task preview` - Preview production build locally
- `deno lint` - Lint the codebase
- `deno fmt` - Format the codebase
- `deno check src/deploy.ts` - Type check the deployment entry point

## 🌐 Deployment

### Deno Deploy

This project is configured for automatic deployment to [Deno Deploy](https://deno.com/deploy).

#### Automatic Deployment

1. **GitHub Actions**: Pushes to the `main` branch automatically trigger deployment
2. **Pull Request Previews**: PRs get preview deployments for testing

#### Manual Deployment

1. **Install deployctl**
   ```bash
   deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f https://deno.land/x/deploy/deployctl.ts
   ```

2. **Deploy to Deno Deploy**
   ```bash
   deployctl deploy --project=teicog-org src/deploy.ts
   ```

#### Environment Setup

1. **Create Deno Deploy Project**:
   - Go to [dash.deno.com](https://dash.deno.com)
   - Create a new project named `teicog-org` (or update the name in `.github/workflows/deploy.yml`)

2. **Configure GitHub Secrets** (for manual deployments):
   - Add `DENO_DEPLOY_TOKEN` to repository secrets
   - Get token from Deno Deploy dashboard

### Environment Variables

The application automatically detects the environment:

- **Production**: When `DENO_DEPLOYMENT_ID` is present (set by Deno Deploy)
- **Development**: All other cases

Optional environment variables:
- `PORT`: Server port (default: 8000)

## 📁 Project Structure

```
teicog.org/
├── src/
│   ├── api/           # API routes
│   ├── pages/         # Page routes and components
│   ├── static/        # Static assets
│   ├── config.ts      # Configuration management
│   ├── deploy.ts      # Production entry point
│   └── dev.ts         # Development entry point
├── scripts/
│   └── build.ts       # Build and validation script
├── .github/
│   └── workflows/
│       └── deploy.yml # CI/CD workflow
├── deno.json          # Deno configuration
├── import_map.json    # Import map for dependencies
└── .env.example       # Environment variables template
```

## 🔧 Configuration

### `deno.json`
Contains Deno-specific configuration including:
- Compiler options
- Task definitions
- Linting and formatting rules

### `import_map.json`
Maps import specifiers to URLs for dependency management.

### `.github/workflows/deploy.yml`
GitHub Actions workflow for CI/CD:
- Lints and type-checks code
- Runs build validation
- Deploys to Deno Deploy on successful builds
- Creates preview deployments for PRs

## 🧪 Testing

```bash
# Type check
deno check src/deploy.ts

# Lint code
deno lint

# Format code
deno fmt

# Run build validation
deno task build
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 🔗 Links

- [Deno](https://deno.land/)
- [Deno Deploy](https://deno.com/deploy)
- [Hono](https://hono.dev/)
- [GitHub Repository](https://github.com/soma-code/teicog.org)
