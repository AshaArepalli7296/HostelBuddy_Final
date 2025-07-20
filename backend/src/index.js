import mongoose from 'mongoose';
import app from './app.js';
import dotenv from 'dotenv';



dotenv.config({ debug: false });

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(' MongoDB connected to HostelBuddy database');
    
  
    mongoose.connection.db.listCollections({ name: 'users' }).next((err, collInfo) => {
      if (err) {
        console.error(' Error checking collections:', err);
        return;
      }
      console.log(collInfo ? ' Users collection exists' : ' Users collection does not exist');
    });
  })
  .catch(err => {
    console.error(' MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';


const server = app.listen(PORT, () => {
  console.log(` Server on http://localhost:${PORT}`);
  console.log(` Frontend URL: ${FRONTEND_URL}`);
});


process.on('unhandledRejection', (err) => {
  console.error(' Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log(' SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log(' Process terminated');
  });
});