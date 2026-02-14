import express, { Express, NextFunction } from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
import tasksRoutes from './routes/taskRoutes';
import { Request, Response } from 'express';
// Create Express app
const app: Express = express();
const server = http.createServer(app);

// Middleware
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:4174',
  ],
  credentials: true,
}

app.use(cors(corsOptions))
// Regular JSON parsing for other routes
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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
  _next(err?.message);
});

export default server;