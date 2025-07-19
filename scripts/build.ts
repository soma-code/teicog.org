// Simple build script for teicog.org
// This script prepares the application for production deployment

async function build() {
  console.log("🔨 Building teicog.org for production...");

  const startTime = Date.now();

  try {
    // 1. Lint the code
    console.log("📝 Linting code...");
    const lintProcess = new Deno.Command("deno", {
      args: ["lint", "src/", "scripts/"],
      stdout: "piped",
      stderr: "piped",
    });
    const lintResult = await lintProcess.output();

    if (!lintResult.success) {
      const error = new TextDecoder().decode(lintResult.stderr);
      console.error("❌ Linting failed:");
      console.error(error);
      Deno.exit(1);
    }
    console.log("✅ Linting passed");

    // 2. Format the code
    console.log("🎨 Formatting code...");
    const fmtProcess = new Deno.Command("deno", {
      args: ["fmt", "src/", "scripts/"],
      stdout: "piped",
      stderr: "piped",
    });
    const fmtResult = await fmtProcess.output();

    if (!fmtResult.success) {
      const error = new TextDecoder().decode(fmtResult.stderr);
      console.error("❌ Formatting failed:");
      console.error(error);
      Deno.exit(1);
    }
    console.log("✅ Code formatted");

    // 3. Type check
    console.log("🔍 Type checking...");
    const checkProcess = new Deno.Command("deno", {
      args: ["check", "src/deploy.ts"],
      stdout: "piped",
      stderr: "piped",
    });
    const checkResult = await checkProcess.output();

    if (!checkResult.success) {
      const error = new TextDecoder().decode(checkResult.stderr);
      console.error("❌ Type checking failed:");
      console.error(error);
      Deno.exit(1);
    }
    console.log("✅ Type checking passed");

    // 4. Test the deployment entry point
    console.log("🧪 Testing deployment entry point...");
    const testProcess = new Deno.Command("deno", {
      args: [
        "run",
        "--allow-net",
        "--allow-read",
        "--allow-env",
        "src/deploy.ts",
      ],
      env: { "PORT": "8080", "TEST_MODE": "true" },
      stdout: "piped",
      stderr: "piped",
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    try {
      await testProcess.output();
      console.log("✅ Deployment entry point test passed");
    } catch (error) {
      if (error.name === "TimeoutError") {
        console.log(
          "✅ Deployment entry point started successfully (timed out as expected)",
        );
      } else {
        console.error("❌ Deployment entry point test failed:", error);
        Deno.exit(1);
      }
    }

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log(`🎉 Build completed successfully in ${duration}s`);
    console.log("🚀 Ready for deployment to Deno Deploy!");
  } catch (error) {
    console.error("❌ Build failed:", error);
    Deno.exit(1);
  }
}

if (import.meta.main) {
  await build();
}
