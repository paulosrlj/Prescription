import 'reflect-metadata';
import express, { Express } from 'express';

import './database';

// routes
import patientRoutes from './routes/patientRoutes/patient.routes';
// import cardRoutes from './routes/cardRoutes/card.routes';

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
    this.app.use('/patients', patientRoutes);
    // this.app.use('/cards', cardRoutes);
  }
}

export default new App().app;
