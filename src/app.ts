import express, { Express, NextFunction } from 'express';
import cors from 'cors';
import tasksRoutes from './routes/taskRoutes';
import { Request, Response } from 'express';
// Create Express app
const app: Express = express();

// Middleware
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) {
      return callback(null, true);
    }

    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:4173',
      'http://localhost:4174',
      'https://dynammastech-frontend-ew2g.vercel.app',
    ];

    // Check if origin is in allowed list or is a Vercel deployment
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))
// Regular JSON parsing for other routes
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health check endpoint (doesn't require DB connection)
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});

// Root endpoint for basic health checks
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

app.use('/api', tasksRoutes);

interface ErrorWithCode extends Error {
  code?: string;
  status?: number;
}

app.use((err: ErrorWithCode, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File size exceeded. Maximum allowed size is 10 MB.',
    });
  }
  _next(err);
});

export default app;