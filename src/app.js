import Youch from 'youch';
import express from 'express';
import routes from './routes';

import 'dotenv/config';
import './config/database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, _) => {
      if (process.env.NODE_ENV === 'development') {
        const youch = new Youch(err, req);
        return res.status(500).json(await youch.toJSON());
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
