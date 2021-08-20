import { Request, Response } from 'express';
import SQLiteRecipeRepository from '../../repositories/implementations/SQLiteRecipeRepository';

import ListRecipeService from '../../services/recipe/ListRecipeService';
import { handleRecipe } from '../../views/recipesViews';
// import { doctorView } from '../views/recipes.view';

class ListRecipeController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const createRecipeService = new ListRecipeService(
      new SQLiteRecipeRepository(),
    );

    const recipe = await createRecipeService.execute(id);

    // const { validade, due, medicines, card, images } = recipe;

    // console.log(recipe);
    // return res.json({
    //   id,
    //   validade,
    //   due,
    //   medicines,
    //   card,
    //   // doctor: doctorView(recipe.doctor),
    //   images,
    // });

    const filteredRecipe = handleRecipe(recipe);

    return res.status(201).json(filteredRecipe);
  }
}

export default new ListRecipeController();
