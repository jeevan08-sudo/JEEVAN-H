import express from "express";
import { createServer } from "http";
import { registerRoutes } from "../server/routes";
import { serveStatic } from "../server/static";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create a dummy server object for registerRoutes if needed
// registerRoutes expects a Server object but we only need the app for Vercel
const httpServer = createServer(app);

(async () => {
    await registerRoutes(httpServer, app);

    // In production (Vercel), we serve static files via vercel.json rewrites 
    // or via express if configured. Vercel's static-build handles /dist/public.
    if (process.env.NODE_ENV === "production") {
        serveStatic(app);
    }
})();

export default app;
