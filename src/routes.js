import { Router } from 'express';
import handle from 'express-async-handler';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import JobController from './app/controllers/JobController';

// import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/login', handle(SessionController.store));

routes.post('/jobs', handle(JobController.store));
routes.get('/jobs', handle(JobController.getJobByStatus));
routes.get('/jobs/:jobId', handle(JobController.getJobById));
routes.put('/jobs/updateViews/:jobId', handle(JobController.updateJobViews));

// routes.use(authMiddleware);

routes.put('/jobs/:jobId', handle(JobController.updateJob));

routes.post('/user', handle(UserController.store));
routes.get('/user/all', handle(UserController.getAllUsers));
routes.post('/user/:userId', handle(UserController.getById));
routes.delete('/user/:userId', handle(UserController.delete));
routes.put('/user/update/:userId', handle(UserController.update));

export default routes;
