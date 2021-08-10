import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';

import './database';

import { exceptionsHandle } from './middlewares/handleExpeption';

// routes
import patientRoutes from './routes/patient.routes';
import doctorRoutes from './routes/doctor.routes';
import medicineRoutes from './routes/medicine.routes';
import recipeRoutes from './routes/recipe.routes';
import adminRoutes from './routes/admin.routes';
import drugstoreRoutes from './routes/drugstore.routes';

class App {
  app: Express;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();

    this.app.use(exceptionsHandle);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use('/patients', patientRoutes);
    this.app.use('/doctors', doctorRoutes);
    this.app.use('/medicines', medicineRoutes);
    this.app.use('/recipes', recipeRoutes);
    this.app.use('/admin', adminRoutes);
    this.app.use('/drugstore', drugstoreRoutes);
  }
}

export default new App().app;
