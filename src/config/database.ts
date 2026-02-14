import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async (): Promise<void> => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
    
    // Log the connection string type (local or Atlas) for debugging
    if (MONGODB_URI.includes('mongodb+srv')) {
      console.log('Connected to MongoDB Atlas');
    } else {
      console.log('Connected to Local MongoDB');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Please check your MongoDB URI in the .env file');
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

export default connectDB; 