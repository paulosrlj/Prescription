import { Request, Response } from 'express';

import IRecipe from '../../dto/IRecipeRequest';
import CreateRecipeService from '../../services/recipe/CreateRecipeService';

import { IMedicineArray } from '../../dto/IMedicineRequest';
import SQLiteRecipeRepository from '../../repositories/implementations/SQLiteRecipeRepository';
import { handleRecipe, RecipeType } from '../../views/recipesViews';

interface doctorType {
  doctor_crm: string;
}

class CreateRecipeController {
  async handle(req: Request, res: Response) {
    const { cpf_patient, validade, medicines, due, images, illness_name } =
      req.body as IRecipe & IMedicineArray & doctorType;
    const { doctor_crm } = req;

    const createRecipeService = new CreateRecipeService(
      new SQLiteRecipeRepository(),
    );

    const recipe = (await createRecipeService.execute({
      illness_name,
      cpf_patient,
      validade,
      doctor_crm,
      medicines,
      due,
      images,
    })) as RecipeType;

    const recipeFiltered = handleRecipe(recipe);

    return res.json(recipeFiltered);
  }
}

export default new CreateRecipeController();
