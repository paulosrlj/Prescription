import 'reflect-metadata';
import 'express-async-errors';
import path from 'path';
import express, { Express } from 'express';
import cors from 'cors';

import './database';

import { exceptionsHandle } from './middlewares/handleExpeption';

// routes
import adminRoutes from './routes/admin.routes';
import drugstoreRoutes from './routes/drugstore.routes';
import doctorRoutes from './routes/doctor.routes';
import imageRoutes from './routes/image.routes';
import patientRoutes from './routes/patient.routes';
import recipeRoutes from './routes/recipe.routes';
import medicineRoutes from './routes/medicine.routes';

class App {
  app: Express;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();

    this.app.use(exceptionsHandle);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use('/admin', adminRoutes);
    this.app.use('/doctors', doctorRoutes);
    this.app.use('/drugstore', drugstoreRoutes);
    this.app.use('/images', imageRoutes);
    this.app.use('/patients', patientRoutes);
    this.app.use('/recipes', recipeRoutes);
    this.app.use('/medicines', medicineRoutes);
    this.app.use(
      '/uploads',
      express.static(path.join(__dirname, '..', 'uploads')),
    );
  }
}

export default new App().app;
