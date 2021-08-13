import { Request, Response } from 'express';
import SQLiteRecipeRepository from '../../repositories/implementations/SQLiteRecipeRepository';

import DueRecipeService from '../../services/recipe/DueRecipeService';

interface IDueType {
  due: boolean;
}

class DueRecipeController {
  async handle(req: Request, res: Response) {
    const dueRecipeService = new DueRecipeService(new SQLiteRecipeRepository());

    const { due } = req.body as unknown as IDueType;
    const crm = req.doctor_crm;
    const { id } = req.params;

    await dueRecipeService.execute({
      due,
      id,
      doctor_crm: crm,
    });

    return res.status(200).json({ message: 'Due updated succefully!' });
  }
}

export default new DueRecipeController();
