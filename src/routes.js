import { Router } from 'express';
import handle from 'express-async-handler';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/login', SessionController.store);

routes.use(authMiddleware);

routes.post('/user', handle(UserController.store));
routes.put('/user/update/:userId', handle(UserController.update));
routes.get('/user/all', handle(UserController.getAllUsers));

export default routes;
