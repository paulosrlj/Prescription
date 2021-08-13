import { Request, Response } from 'express';

import ListRecipeService from '../../services/recipe/ListRecipeService';
import { doctorView } from '../views/recipes.view';

class ListRecipeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const createRecipeService = new ListRecipeService();

    const recipe = await createRecipeService.execute(id);

    const { validade, due, medicines, card } = recipe;

    return res.json({
      id,
      validade,
      due,
      medicines,
      card,
      doctor: doctorView(recipe.doctor),
    });
  }
}

export default new ListRecipeController();
