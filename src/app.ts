import express from 'express';
import bodyParser from 'body-parser';
import requestRoutes from './routes/request.route';
import { connectDb } from './db/connect';

const app = express();
const PORT = process.env.PORT || 3000;

// Catch uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

// Connect to MongoDB
connectDb();

// Middleware
app.use(bodyParser.json());

// Use the requestRoutes as middleware
app.use('/api', requestRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown for SIGTERM signals
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
    process.exit(0); // Exit gracefully
  });
});
