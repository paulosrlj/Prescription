import { Request, Response } from 'express';

import IImageRequest from '../../dto/IImageRequest';
import CreateImageService from '../../services/image/CreateImageService';

class CreateImageController {
  async handle(req: Request, res: Response) {
    const { id, name } = req.body as IImageRequest;

    const reqImages = req.files as Express.Multer.File[];

    const path = reqImages.map(image => ({ path: image.destination }));
    const imagesPath = reqImages.map(image => ({ path: image.filename }));

    const createImageService = new CreateImageService();

    const image = await createImageService.execute({
      id,
      name,
      path,
      imagesPath,
    });

    return res.json(image);
  }
}

export default new CreateImageController();
