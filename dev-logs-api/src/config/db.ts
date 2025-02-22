import mongoose from 'mongoose';
export const connectDB = async () => {
  try {
    // TODO: Get actual version from mongodb directly and tweak this accordingly
    const uri = 'mongodb+srv://xxx';
    const conn = await mongoose.connect(uri);
    console.log('MongoDB Connected: ', conn.connection.host);
  } catch (error) {
    console.error('Something went wrong connecting to MongoDB: ', error);
    process.exit(1);
  }
};

