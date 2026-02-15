import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './config/database'

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

// Start the server immediately (health checks need it to be available)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB in the background (non-blocking)
connectDB().catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  // Don't exit - allow server to run even if DB connection fails initially
  // The server can retry or handle DB errors gracefully
}); 