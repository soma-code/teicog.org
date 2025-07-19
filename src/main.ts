/**
 * Main entry point for teicog.org
 */

import { serve } from "https://deno.land/std@0.220.0/http/server.ts";

interface AppConfig {
  port: number;
  hostname: string;
}

class App {
  private config: AppConfig;

  constructor(config: AppConfig) {
    this.config = config;
  }

  private createHandler() {
    return (request: Request): Response => {
      const url = new URL(request.url);

      // Basic routing
      switch (url.pathname) {
        case "/":
          return new Response(this.getHomePage(), {
            headers: { "content-type": "text/html" },
          });
        case "/health":
          return new Response(
            JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }),
            {
              headers: { "content-type": "application/json" },
            },
          );
        default:
          return new Response("Not Found", { status: 404 });
      }
    };
  }

  private getHomePage(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>teicog.org</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            border-bottom: 1px solid #eee;
            padding-bottom: 2rem;
            margin-bottom: 2rem;
        }
        .status {
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 0.5rem;
            padding: 1rem;
            margin: 1rem 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>teicog.org</h1>
        <p>Official website built with Deno, TypeScript, and Shadcn/UI</p>
    </div>
    
    <div class="status">
        <h2>🚀 Project Status</h2>
        <p>Initial project structure has been set up with:</p>
        <ul>
            <li>✅ Deno configuration</li>
            <li>✅ TypeScript setup</li>
            <li>✅ Testing infrastructure</li>
            <li>✅ Component architecture</li>
        </ul>
    </div>
    
    <div>
        <h2>Available Endpoints</h2>
        <ul>
            <li><a href="/">/ - Home page</a></li>
            <li><a href="/health">/health - Health check</a></li>
        </ul>
    </div>
</body>
</html>
    `.trim();
  }

  async start(): Promise<void> {
    const handler = this.createHandler();

    console.log(`🚀 Server starting on http://${this.config.hostname}:${this.config.port}`);

    await serve(handler, {
      hostname: this.config.hostname,
      port: this.config.port,
    });
  }
}

// Main execution
if (import.meta.main) {
  const config: AppConfig = {
    port: parseInt(Deno.env.get("PORT") || "8000"),
    hostname: Deno.env.get("HOSTNAME") || "localhost",
  };

  const app = new App(config);
  await app.start();
}

export { App, type AppConfig };
