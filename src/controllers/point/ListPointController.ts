import { Request, Response } from 'express';

import ListPointService from '../../services/point/ListPointService';

class ListPointController {
  async handle(req: Request, res: Response) {
    const listPointService = new ListPointService();

    const points = await listPointService.execute();

    return res.json(points);
  }
}

export default new ListPointController();
