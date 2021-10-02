import { Request, Response } from 'express';
import SQLiteRecipeRepository from '../../repositories/implementations/SQLiteRecipeRepository';

import ListPatientRecipesService from '../../services/recipe/ListPatientRecipes';
import { handleRecipes, RecipeType } from '../../views/recipesViews';
// import { doctorView } from '../views/recipes.view';

class ListPatientRecipes {
  async handle(req: Request, res: Response) {
    const { cpf } = req.params;

    const createRecipeService = new ListPatientRecipesService(
      new SQLiteRecipeRepository(),
    );

    const recipes = (await createRecipeService.execute(cpf)) as RecipeType[];
    const filteredRecipes = handleRecipes(recipes);

    return res.status(201).json(filteredRecipes);
  }
}

export default new ListPatientRecipes();
