import 'reflect-metadata';
import express, { Express } from 'express';

import './database';

import routes from './routes';

class App {
  app: Express;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().app;
