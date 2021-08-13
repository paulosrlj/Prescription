import { Request, Response } from 'express';

import IRecipe from '../../dto/IRecipeRequest';
import CreateRecipeService from '../../services/recipe/CreateRecipeService';

import { IMedicineArray } from '../../dto/IMedicineRequest';
import SQLiteRecipeRepository from '../../repositories/implementations/SQLiteRecipeRepository';

interface doctorType {
  doctor_crm: string;
}

class CreateRecipeController {
  async handle(req: Request, res: Response) {
    const { cpf_patient, validade, medicines, due } = req.body as IRecipe &
      IMedicineArray &
      doctorType;
    const { doctor_crm } = req;
    const reqImages = req.files as Express.Multer.File[];

    const imagesPath = reqImages.map(image => ({ path: image.filename }));

    const createRecipeService = new CreateRecipeService(
      new SQLiteRecipeRepository(),
    );

    const recipe = await createRecipeService.execute({
      cpf_patient,
      validade,
      doctor_crm,
      medicines,
      due,
      imagesPath,
    });

    return res.json(recipe);
  }
}

export default new CreateRecipeController();
