import { Request, Response } from 'express';
import SQLiteCardRepository from '../../repositories/implementations/SQLiteCardRepository';

import ListCardService from '../../services/card/ListCardService';

class ListCardController {
  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const listCardService = new ListCardService(new SQLiteCardRepository());

    const token = await listCardService.execute(id);

    return res.status(201).json(token);
  }
}

export default new ListCardController();
