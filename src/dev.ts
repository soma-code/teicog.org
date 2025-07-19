import { Hono } from "hono";

// Import routes
import { homeRoute } from "./pages/home.ts";
import { apiRoutes } from "./api/index.ts";

const app = new Hono();

// Development environment configuration
const port = parseInt(Deno.env.get("PORT") || "8000");

// Development logging middleware
app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`🔧 ${c.req.method} ${c.req.url} - ${c.res.status} (${ms}ms)`);
});

// Simple CORS middleware for development
app.use("*", async (c, next) => {
  await next();

  c.res.headers.set("Access-Control-Allow-Origin", "*");
  c.res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  c.res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
});

// Static file serving (simplified)
app.get("/static/*", async (c) => {
  const path = c.req.path;
  const filePath = `./src${path}`;

  try {
    const file = await Deno.readFile(filePath);
    const ext = path.split(".").pop();

    let contentType = "text/plain";
    switch (ext) {
      case "css":
        contentType = "text/css";
        break;
      case "js":
        contentType = "application/javascript";
        break;
      case "html":
        contentType = "text/html";
        break;
      case "json":
        contentType = "application/json";
        break;
      case "png":
        contentType = "image/png";
        break;
      case "jpg":
      case "jpeg":
        contentType = "image/jpeg";
        break;
      case "svg":
        contentType = "image/svg+xml";
        break;
    }

    return new Response(file, {
      headers: { "Content-Type": contentType },
    });
  } catch {
    return c.text("File not found", 404);
  }
});

// Favicon
app.get("/favicon.ico", async (c) => {
  try {
    const file = await Deno.readFile("./src/static/favicon.ico");
    return new Response(file, {
      headers: { "Content-Type": "image/x-icon" },
    });
  } catch {
    return c.text("Favicon not found", 404);
  }
});

// API routes
app.route("/api", apiRoutes);

// Page routes
app.route("/", homeRoute);

// Development health check
app.get("/health", (c) => {
  return c.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: "development",
  });
});

// Hot reload endpoint for development
app.get("/dev/reload", (c) => {
  return c.text("OK");
});

// 404 handler
app.notFound((c) => {
  return c.html(
    `
    <!DOCTYPE html>
    <html>
    <head>
      <title>404 - Page Not Found | teicog.org (Dev)</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { font-family: system-ui; text-align: center; padding: 2rem; background: #f5f5f5; }
        h1 { color: #333; }
        .dev-badge { background: #ff9800; color: white; padding: 0.5rem; border-radius: 4px; display: inline-block; margin-bottom: 1rem; }
        a { color: #0066cc; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="dev-badge">Development Mode</div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">← Back to Home</a>
    </body>
    </html>
  `,
    404,
  );
});

// Error handler with development details
app.onError((err, c) => {
  console.error("Development error:", err);

  return c.html(
    `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Development Error | teicog.org</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { font-family: monospace; padding: 2rem; background: #f5f5f5; }
        .error { background: #ffebee; border: 1px solid #e57373; border-radius: 4px; padding: 1rem; margin: 1rem 0; }
        .dev-badge { background: #ff9800; color: white; padding: 0.5rem; border-radius: 4px; display: inline-block; margin-bottom: 1rem; }
        h1 { color: #d32f2f; }
        pre { background: #333; color: #fff; padding: 1rem; border-radius: 4px; overflow-x: auto; }
        a { color: #0066cc; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="dev-badge">Development Mode</div>
      <h1>Development Error</h1>
      <div class="error">
        <strong>Error:</strong> ${err.message}
      </div>
      <pre>${err.stack || "No stack trace available"}</pre>
      <a href="/">← Back to Home</a>
    </body>
    </html>
  `,
    500,
  );
});

// Start development server
if (import.meta.main) {
  console.log(`🔧 Development server starting on port ${port}`);
  console.log(`🌍 Environment: development`);
  console.log(`🔄 Watch mode enabled`);

  Deno.serve({
    port,
    onListen: ({ port, hostname }) => {
      console.log(
        `✅ Development server running at http://${hostname}:${port}/`,
      );
      console.log(
        `📝 Make changes to files and they will be automatically reloaded`,
      );
    },
  }, app.fetch);
}

export default app;
