import { Request, Response } from 'express';

import UpdateRecipeService from '../../services/recipe/UpdateRecipeService';

import IRecipeRequest from '../../dto/IRecipeRequest';
import { IMedicineArray } from '../../dto/IMedicineRequest';

class UpdateRecipeController {
  async handle(req: Request, res: Response) {
    const updateRecipeService = new UpdateRecipeService();

    const { due, validade, medicines } = req.body as IRecipeRequest &
      IMedicineArray;
    const crm = req.doctor_crm;
    const { id } = req.params;

    await updateRecipeService.execute({
      due,
      id,
      doctor_crm: crm,
      validade,
      medicines,
    });

    return res.status(200).json({ message: 'Recipe updated succefully!' });
  }
}

export default new UpdateRecipeController();
