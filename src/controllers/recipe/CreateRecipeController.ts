import { Request, Response } from 'express';

import IRecipe from '../../dto/IRecipeRequest';
import CreateRecipeService from '../../services/recipe/CreateRecipeService';

import { IMedicineArray } from '../../dto/IMedicineRequest';

interface doctorType {
  doctor_crm: string;
}

class CreateRecipeController {
  async handle(req: Request, res: Response) {
    const { cpf_patient, validade, medicines, due } = req.body as IRecipe &
      IMedicineArray &
      doctorType;
    const { doctor_crm } = req;

    const createRecipeService = new CreateRecipeService();

    const recipe = await createRecipeService.execute({
      cpf_patient,
      validade,
      doctor_crm,
      medicines,
      due,
    });

    return res.json(recipe);
  }
}

export default new CreateRecipeController();
