import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import httpStatus from 'http-status';
import { logger } from './config/logger';
import { errorHandler, successHandler } from './config/morgan';
import routes from './routes';
import { ApiError } from './utils/ApiError';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(successHandler);
app.use(errorHandler);

app.use((req, res, next) => {
  express.json()(req, res, next);
});

app.use(
  cors({
    origin: function (origin, callback) {
      // Expected format is "url[,| ,]url..."
      const whitelist = process.env.ORIGINS_WHITELIST?.split(/,\s|,/).map(
        (origin) => {
          return origin.replace(/\/$/, '');
        }
      );

      // Undefined env variable case
      if (!whitelist) {
        callback(null, true);
        return;
      }

      // Empty env variable case
      if (whitelist.length === 1 && !whitelist[0]) {
        callback(null, true);
        return;
      }

      if (
        typeof origin === 'string' &&
        (whitelist.indexOf(origin) !== -1 || !origin)
      ) {
        callback(null, true);
        return;
      }

      logger.error(`Origin not allowed: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.options('*', cors());

app.use('/', routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.listen(port, () => {
  logger.info(`Server is Fire at http://localhost:${port}`);
});
