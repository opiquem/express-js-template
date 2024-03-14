import morgan from 'morgan';
import { Request, Response } from "express";
import { logger } from "./logger";

morgan.token('message', (req: Request, res: Response) => res.locals.errorMessage || '');

const getIpFormat = () => ('');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message: string) => logger.error(message.trim()) },
});

export {
  errorHandler, successHandler
};

