import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import { exampleController } from '../controllers';
import { exampleMiddleware } from '../middlewares/exampleMiddleware';

const router = express.Router();

router.get('/sayHi', [exampleMiddleware], exampleController.sendHello);

export default router;
