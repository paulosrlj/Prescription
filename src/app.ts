import 'reflect-metadata';
import express, { Express } from 'express';

import './database';

// routes
import patientRoutes from './routes/patient.routes';
import doctorRoutes from './routes/doctor.routes';
// import cardRoutes from './routes/cardRoutes/card.routes';
import pointRoutes from './routes/point.routes';

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
    this.app.use('/doctors', doctorRoutes);
    // this.app.use('/cards', cardRoutes);
    this.app.use('/drugstore', pointRoutes);
  }
}

export default new App().app;
