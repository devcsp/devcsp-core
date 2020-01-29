import { Router } from 'express';
import handle from 'express-async-handler';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import JobController from './app/controllers/JobController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/login', SessionController.store);
routes.get('/jobs', JobController.getJobByStatus);
routes.post('/user', handle(UserController.store));

routes.use(authMiddleware);

routes.get('/user/all', handle(UserController.getAllUsers));
routes.post('/user/:userId', handle(UserController.getById));
routes.delete('/user/:userId', handle(UserController.delete));
routes.put('/user/update/:userId', handle(UserController.update));

export default routes;
