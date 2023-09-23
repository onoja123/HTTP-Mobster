import express, { Router } from 'express';
import { newRequest, getAllRequests, getOneRequest } from '../controllers/request.controller';

const router: Router = express.Router();


// Route to get all logged requests
router.get('/', getAllRequests);

// Route to log a new request
router.post('/log', newRequest);

// Route to get one request by ID
router.get('/:requestId', getOneRequest);

export default router;
