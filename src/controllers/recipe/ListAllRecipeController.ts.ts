import { Request, Response } from 'express';

import ListAllRecipeService from '../../services/recipe/ListAllRecipeService';

class ListAllRecipeController {
  async handle(req: Request, res: Response) {
    const createRecipeService = new ListAllRecipeService();

    const recipes = await createRecipeService.execute();

    const recipesFiltered = recipes.map(recipe => {
      return {
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
    });

    return res.json(recipesFiltered);
  }
}

export default new ListAllRecipeController();
