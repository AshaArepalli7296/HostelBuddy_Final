import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import apiRouter from './routes/api.routes.js'; // ✅ Import added
import errorHandler from './middleware/errorHandler.js';


const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Mount core routes
app.use('/api/v1/auth', authRouter);
app.use(apiRouter); // ✅ This line enables students/complaints routing

app.use(errorHandler);

export default app;
