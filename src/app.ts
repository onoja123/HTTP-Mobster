import express from 'express';
import bodyParser from 'body-parser';
import requestRoutes from './routes/request.route'; 

import { connectDb } from './db/connect';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDb()

// Middleware
app.use(bodyParser.json());

// Use the requestRoutes as middleware
app.use('/api', requestRoutes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
