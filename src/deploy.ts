import { Hono } from "hono";

// Import routes
import { homeRoute } from "./pages/home.ts";
import { apiRoutes } from "./api/index.ts";

const app = new Hono();

// Environment configuration
const isProduction = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;
const port = parseInt(Deno.env.get("PORT") || "8000");

// Simple logging middleware
app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${c.req.method} ${c.req.url} - ${c.res.status} (${ms}ms)`);
});

// Simple CORS middleware
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

// Health check endpoint for deployment
app.get("/health", (c) => {
  return c.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: isProduction ? "production" : "development",
  });
});

// 404 handler
app.notFound((c) => {
  return c.html(
    `
    <!DOCTYPE html>
    <html>
    <head>
      <title>404 - Page Not Found | teicog.org</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { font-family: system-ui; text-align: center; padding: 2rem; }
        h1 { color: #333; }
        a { color: #0066cc; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <a href="/">← Back to Home</a>
    </body>
    </html>
  `,
    404,
  );
});

// Error handler
app.onError((err, c) => {
  console.error("Application error:", err);

  if (isProduction) {
    return c.html(
      `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error | teicog.org</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: system-ui; text-align: center; padding: 2rem; }
          h1 { color: #d32f2f; }
          a { color: #0066cc; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>Something went wrong</h1>
        <p>We're experiencing technical difficulties. Please try again later.</p>
        <a href="/">← Back to Home</a>
      </body>
      </html>
    `,
      500,
    );
  }

  return c.text(`Error: ${err.message}`, 500);
});

// Start server
if (import.meta.main) {
  console.log(`🚀 Server starting on port ${port}`);
  console.log(`🌍 Environment: ${isProduction ? "production" : "development"}`);

  Deno.serve({
    port,
    onListen: ({ port, hostname }) => {
      console.log(`✅ Server running at http://${hostname}:${port}/`);
    },
  }, app.fetch);
}

export default app;
