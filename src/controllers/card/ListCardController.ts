import { Request, Response } from 'express';

import ListCardService from '../../services/card/ListCardService';

class ListCardController {
  async handle(req: Request, res: Response) {
    const listCardService = new ListCardService();

    const cards = await listCardService.execute();

    return res.json(cards);
  }
}

export default new ListCardController();
