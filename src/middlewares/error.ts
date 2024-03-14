import httpStatus  from 'http-status';
import { config } from '../config/config';
import { logger } from '../config/logger';
import { ApiError } from '../utils/ApiError';
import { Request, Response, NextFunction } from 'express';

const errorConverter = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    //@ts-ignore
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    // TODO: change to SequelizeError
    // error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;

    //@ts-ignore
    const message = error.message || httpStatus[statusCode];
    //@ts-ignore
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err: ApiError, req: Request, res: Response, _: NextFunction) => {
  let { statusCode, message, info } = err;

  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    info,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(Number(statusCode)).send(response);
};
