import { getCustomRepository } from 'typeorm';

import RecipeRepository from '../../repositories/implementations/SQLiteRecipeRepository';
import IRecipeRequest from '../../dto/IRecipeRequest';
import Recipe from '../../entities/Recipe';
import { IMedicineArray } from '../../dto/IMedicineRequest';
import { recipeCreateValidation } from '../../utils/recipeValidation';

class CreateRecipeService {
  async execute(
    recipeParams: IRecipeRequest & IMedicineArray,
  ): Promise<Recipe> {
    const recipeRepository = getCustomRepository(RecipeRepository);

    await recipeCreateValidation(recipeParams);

    // Formatar a data
    recipeParams.validade = new Date(
      recipeParams.validade,
    ).toLocaleDateString();

    const recipe = await recipeRepository.createRecipe(recipeParams);

    return recipe;
  }
}

export default CreateRecipeService;
