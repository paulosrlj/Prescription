import { Request, Response } from 'express';

import CreateImageService from '../../services/image/CreateImageService';
import SQLImageRepository from '../../repositories/implementations/SQLiteImageRepository';

class CreateImageController {
  async handle(req: Request, res: Response) {
    const { recipe } = req.body;
    const reqImages = req.files as Express.Multer.File[];

    const createImageService = new CreateImageService(new SQLImageRepository());

    reqImages.map(async image => {
      await createImageService.execute({
        name: image.originalname,
        path: image.filename,
        recipe,
      });
    });

    return res.status(201).json({ message: 'Ok' });
  }
}

export default new CreateImageController();
