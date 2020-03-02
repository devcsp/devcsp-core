import { Router } from 'express';
import handle from 'express-async-handler';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import JobController from './app/controllers/JobController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('core/login', handle(SessionController.store));

routes.post('core/jobs', handle(JobController.store));
routes.get('core/jobs', handle(JobController.getJobByStatus));
routes.get('core/jobs/:jobId', handle(JobController.getJobById));
routes.put('core/jobs/updateViews/:jobId', handle(JobController.updateJobViews));

// routes.use(authMiddleware);

routes.put('core/jobs/:jobId', handle(JobController.updateJob));

routes.post('core/user', handle(UserController.store));
routes.get('core/user/all', handle(UserController.getAllUsers));
routes.post('core/user/:userId', handle(UserController.getById));
routes.delete('core/user/:userId', handle(UserController.delete));
routes.put('core/user/update/:userId', handle(UserController.update));

export default routes;
