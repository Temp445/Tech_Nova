import mongoose from 'mongoose';

const MONGODB_URI = process.env.DB_URL!;

export default async function dbConnect() {
  try {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}
