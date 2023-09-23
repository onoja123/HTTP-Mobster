import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import RequestModel, { IRequest } from '../models/request.model';


/**
 * @description Get all logged requests from the database
 * @route GET /api
 * @access Public
 * @type GET
 */
export const getAllRequests = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requests: IRequest[] = await RequestModel.find();

    if (!requests || requests.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'No requests found.',
      });
    }

    res.status(200).json({
      status: true,
      data: requests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
});

/**
 * @description Log a new request and save it to the database
 * @route POST /api/log
 * @access Public
 * @type POST
 */
export const newRequest = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { method, path } = req.body;

  try {
    if (!method || !path) { 
      return res.status(400).json({
        status: false,
        message: 'Please provide both method and path.',
      });
    }

    const request = new RequestModel({ method, path });

    await request.save();

    res.status(201).json({
      status: true,
      message: 'Logged request successfully.',
      data: request,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
});


/**
 * @description Get a specific logged request by its requestId from the database
 * @route GET /api/:requestId
 * @access Public
 * @type GET
 */
export const getOneRequest = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { requestId } = req.params;
  try {
    const request: IRequest | null = await RequestModel.findById(requestId);

    if (!request) {
      return res.status(404).json({ 
        status: false,
        message: 'Request not found.',
      });
    }

    res.status(200).json({
      status: true,
      data: request,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
});
