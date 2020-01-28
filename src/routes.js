import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/login', SessionController.store);

routes.use(authMiddleware);

routes.post('/user', UserController.store);
routes.put('/user/update', UserController.update);
routes.get('/user/all', UserController.getAllUsers);

export default routes;
