import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import connectDB from './config/database'

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

// Connect to MongoDB
connectDB().then(() => {
  // Start the server after successful database connection
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
}); 