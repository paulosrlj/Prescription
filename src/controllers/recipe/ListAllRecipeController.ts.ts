import { Request, Response } from 'express';
import SQLiteRecipeRepository from '../../repositories/implementations/SQLiteRecipeRepository';

import ListAllRecipeService from '../../services/recipe/ListAllRecipeService';
import { handleRecipe } from '../../views/recipesViews';
// import { doctorView } from '../views/recipes.view';

class ListAllRecipeController {
  async handle(req: Request, res: Response) {
    const createRecipeService = new ListAllRecipeService(
      new SQLiteRecipeRepository(),
    );

    const recipes = await createRecipeService.execute();

    const recipesFiltered = recipes.map(r => handleRecipe(r));

    return res.json(recipesFiltered);
  }
}

export default new ListAllRecipeController();
