import { Request, Response } from 'express';

import ListRecipeService from '../../services/recipe/ListRecipeService';

class ListRecipeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const createRecipeService = new ListRecipeService();

    const recipe = await createRecipeService.execute(id);

    const recipeFiltered = {
      id: recipe.id,
      validade: recipe.validade,
      medicines: recipe.medicines,
      doctor: {
        id: recipe.doctor.id,
        name: recipe.doctor.name,
        crm: recipe.doctor.crm,
        email: recipe.doctor.email,
        phone: recipe.doctor.phone,
      },
    };

    return res.json(recipeFiltered);
  }
}

export default new ListRecipeController();
