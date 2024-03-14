import { Request, Response } from 'express';
import { exampleService } from '../services';
import { ApiError } from '../utils/ApiError';

const sendHello = (req: Request, res: Response) => {
  const hi = exampleService.giveHi();

  return res.send(hi);
};

export const exampleController = {
  sendHello,
};
