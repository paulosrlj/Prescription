import { Request, Response } from 'express';

import CreateImageService from '../../services/image/CreateImageService';
import SQLImageRepository from '../../repositories/implementations/SQLiteImageRepository';

class CreateImageController {
  async handle(req: Request, res: Response) {
    const reqImages = req.files as Express.Multer.File[];

    const createImageService = new CreateImageService(new SQLImageRepository());

    const imagesCreated = reqImages.map(async image => {
      return createImageService.execute({
        name: image.originalname,
        path: image.filename,
      });
    });

    Promise.all(imagesCreated).then(images => {
      return res.status(201).json(images);
    });
  }
}

export default new CreateImageController();
