import mongoose from 'mongoose';
//TODO: figure out cleaner way to do this (no use of if statements)
export const connectDB = async () => {
  try {
    if (process.env.NODE_ENV !== 'test') {
      const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@devlogs.qn8c7.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

      const conn = await mongoose.connect(uri);
      console.log('MongoDB Connected: ', conn.connection.host);
    }
  } catch (error) {
    console.error('Something went wrong connecting to MongoDB: ', error);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};
