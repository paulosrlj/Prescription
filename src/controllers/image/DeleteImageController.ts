import { Request, Response } from 'express';

import DeleteImageService from '../../services/image/DeleteImageService';

class DeleteImageController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const deleteImageService = new DeleteImageService();

    await deleteImageService.execute(id);

    return res.status(200).json({ message: 'Image removed' });
  }
}

export default new DeleteImageController();
