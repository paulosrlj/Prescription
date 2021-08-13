import { Request, Response } from 'express';

import ListAllImagesService from '../../services/image/ListAllImagesService';
import { handleManyImages } from '../../views/imagesViews';

class ListAllImagesController {
  async handle(req: Request, res: Response) {
    const listAllImagesService = new ListAllImagesService();

    const images = await listAllImagesService.execute();

    const imagesFiltered = handleManyImages(images);

    return res.json(imagesFiltered);
  }
}

export default new ListAllImagesController();
