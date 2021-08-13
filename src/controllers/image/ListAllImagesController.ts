import { Request, Response } from 'express';

import ListAllImageService from '../../services/image/ListImageService';

class ListAllImagesController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const createImageService = new ListAllImageService();

    const image = await createImageService.execute(id);

    const imageFiltered = {
      id: image.id,
      name: image.name,
      path: image.path,
      create_at: image.created_at,
      updated_at: image.updated_at,
    };

    return res.json(imageFiltered);
  }
}

export default new ListAllImagesController();
