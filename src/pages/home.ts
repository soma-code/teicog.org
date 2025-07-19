import { Hono } from "hono";

const homeRoute = new Hono();

// Home page
homeRoute.get("/", (c) => {
  const isProduction = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

  return c.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>teicog.org - Welcome</title>
      <meta name="description" content="Official website for teicog.org built with Deno, TypeScript, and Shadcn/UI">
      <link rel="icon" type="image/x-icon" href="/favicon.ico">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          line-height: 1.6;
          color: #333;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          text-align: center;
        }
        
        .card {
          background: white;
          border-radius: 16px;
          padding: 3rem 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .logo {
          font-size: 3rem;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .tagline {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 2rem;
        }
        
        .tech-stack {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin: 2rem 0;
          flex-wrap: wrap;
        }
        
        .tech-badge {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #64748b;
        }
        
        .status-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
          margin-top: 1rem;
          ${
    isProduction
      ? "background: #dcfce7; color: #166534; border: 1px solid #bbf7d0;"
      : "background: #fef3c7; color: #92400e; border: 1px solid #fde68a;"
  }
        }
        
        .links {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .link {
          color: #667eea;
          text-decoration: none;
          padding: 0.75rem 1.5rem;
          border: 2px solid #667eea;
          border-radius: 8px;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .link:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        .footer {
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #e2e8f0;
          color: #64748b;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }
          
          .card {
            padding: 2rem 1rem;
          }
          
          .logo {
            font-size: 2rem;
          }
          
          .tech-stack {
            gap: 0.5rem;
          }
          
          .links {
            flex-direction: column;
            align-items: center;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <h1 class="logo">teicog.org</h1>
          <p class="tagline">Official website built with modern web technologies</p>
          
          <div class="tech-stack">
            <span class="tech-badge">🦕 Deno</span>
            <span class="tech-badge">📘 TypeScript</span>
            <span class="tech-badge">🔥 Hono</span>
            <span class="tech-badge">🎨 Shadcn/UI</span>
          </div>
          
          <div class="status-badge">
            ${isProduction ? "🚀 Production" : "🔧 Development"} Mode
          </div>
          
          <div class="links">
            <a href="/api/health" class="link">Health Check</a>
            <a href="https://github.com/soma-code/teicog.org" class="link" target="_blank">GitHub</a>
          </div>
          
          <div class="footer">
            <p>Powered by Deno Deploy • Built with ❤️</p>
            <p>Last updated: ${new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

export { homeRoute };
