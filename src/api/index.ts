import { Hono } from "hono";

const apiRoutes = new Hono();

// API health check
apiRoutes.get("/health", (c) => {
  const isProduction = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

  return c.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: isProduction ? "production" : "development",
    deno: {
      version: Deno.version.deno,
      v8: Deno.version.v8,
      typescript: Deno.version.typescript,
    },
    deployment: {
      id: Deno.env.get("DENO_DEPLOYMENT_ID") || "local",
      region: Deno.env.get("DENO_REGION") || "local",
    },
  });
});

// API info endpoint
apiRoutes.get("/info", (c) => {
  return c.json({
    name: "teicog.org API",
    version: "1.0.0",
    description: "Official API for teicog.org",
    endpoints: {
      health: "/api/health",
      info: "/api/info",
    },
    documentation: "https://github.com/soma-code/teicog.org",
  });
});

export { apiRoutes };
