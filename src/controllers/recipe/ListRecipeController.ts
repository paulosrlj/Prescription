import { Request, Response } from 'express';
import SQLiteRecipeRepository from '../../repositories/implementations/SQLiteRecipeRepository';

import ListRecipeService from '../../services/recipe/ListRecipeService';
import { handleRecipe, RecipeType } from '../../views/recipesViews';
// import { doctorView } from '../views/recipes.view';

class ListRecipeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const createRecipeService = new ListRecipeService(
      new SQLiteRecipeRepository(),
    );

    const recipe = (await createRecipeService.execute(id)) as RecipeType;

    const filteredRecipe = handleRecipe(recipe);

    return res.status(201).json(filteredRecipe);
  }
}

export default new ListRecipeController();
