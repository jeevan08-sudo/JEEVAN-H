# Deployment Guide

This document outlines the steps to deploy the portfolio to Vercel and how the CI/CD pipeline works.

## Deployment to Vercel

### via Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Link the project: `vercel link`
3. Deploy: `vercel --prod`

### via Vercel Dashboard
1. Push your code to a GitHub repository.
2. Import the repository in the Vercel Dashboard.
3. Configure the following Environment Variables:
   - `DATABASE_URL`: Your PostgreSQL connection string (optional, defaults to MemStorage if missing).
   - `NODE_ENV`: `production`

## CI/CD Pipeline

The project includes a GitHub Action in `.github/workflows/production.yml` that automatically:
- Installs dependencies.
- Runs TypeScript type checks.
- Runs the production build.
- Verifies build artifacts.

This ensures that every push to the `main` branch is validated before deployment.

## Production Architecture
- **Frontend**: Served as static assets from `dist/public`.
- **Backend**: Express API running as Vercel Serverless Functions via `api/index.ts`.
- **Storage**: Automatically switches between PostgreSQL and In-Memory fallback based on `DATABASE_URL` availability.
