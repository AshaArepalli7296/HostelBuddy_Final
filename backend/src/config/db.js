// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    console.log('[DB] Attempting to connect to MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });

    console.log('[DB] Connected to MongoDB. Testing write operations...');
    
    // Test write operation
    const testDoc = await mongoose.connection.db.collection('test').insertOne({
      test: 'write operation test',
      timestamp: new Date()
    });
    
    console.log('[DB] Write test successful. Inserted document ID:', testDoc.insertedId);
    
    // Cleanup test document
    await mongoose.connection.db.collection('test').deleteOne({ _id: testDoc.insertedId });

  } catch (err) {
    console.error('[DB] Connection error:', {
      message: err.message,
      stack: err.stack,
      code: err.code,
      name: err.name
    });
    process.exit(1);
  }
};

export default connectDB;