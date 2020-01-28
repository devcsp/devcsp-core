import Youch from 'youch';
import express from 'express';
import routes from './routes';

import 'express-async-error';
import 'dotenv/config';
import './config/database';

class App {
  constructor() {
    this.server = express();

    this.routes();
    this.middlewares();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json({ errors });
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
