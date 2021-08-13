import { Request, Response } from 'express';

import ListAllRecipeService from '../../services/recipe/ListAllRecipeService';
import { doctorView } from '../views/recipes.view';

class ListAllRecipeController {
  async handle(req: Request, res: Response) {
    const createRecipeService = new ListAllRecipeService();

    const recipes = await createRecipeService.execute();

    const recipesFiltered = recipes.map(recipe => {
      const { id, validade, due, medicines, card } = recipe;
      return {
        id,
        validade,
        due,
        medicines,
        card,
        doctor: doctorView(recipe.doctor),
      };
    });

    return res.json(recipesFiltered);
  }
}

export default new ListAllRecipeController();
