import express from 'express';
import exampleRoute from './example.route';

const router = express.Router();

const routes = [{ path: '/example', route: exampleRoute }];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;