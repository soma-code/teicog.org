// Deno Deploy Configuration
// This file contains environment-specific configurations

export interface DeployConfig {
  port: number;
  environment: "development" | "production";
  cors: {
    origins: string[];
    allowMethods: string[];
    allowHeaders: string[];
  };
  static: {
    root: string;
    maxAge?: number;
  };
  compression: boolean;
  logging: boolean;
}

export function getConfig(): DeployConfig {
  const isProduction = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

  return {
    port: parseInt(Deno.env.get("PORT") || "8000"),
    environment: isProduction ? "production" : "development",
    cors: {
      origins: isProduction
        ? ["https://teicog.org", "https://www.teicog.org"]
        : ["http://localhost:8000", "http://127.0.0.1:8000"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
    },
    static: {
      root: "./src/",
      maxAge: isProduction ? 86400 : 0, // 24 hours in production, 0 in dev
    },
    compression: isProduction,
    logging: true,
  };
}

export function validateEnvironment(): void {
  const requiredEnvVars: string[] = [];

  // Add required environment variables here as the project grows
  // e.g., requiredEnvVars.push("DATABASE_URL");

  const missing = requiredEnvVars.filter((name) => !Deno.env.get(name));

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:");
    missing.forEach((name) => console.error(`  - ${name}`));
    Deno.exit(1);
  }
}
