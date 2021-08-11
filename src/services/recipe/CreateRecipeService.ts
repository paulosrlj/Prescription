import { getCustomRepository } from 'typeorm';

import RecipeRepository from '../../repositories/implementations/RecipeRepository';
import IRecipeRequest from '../../dto/IRecipeRequest';
import Recipe from '../../entities/Recipe';
import { IMedicineArray } from '../../dto/IMedicineRequest';
import { recipeCreateValidation } from '../../utils/recipeValidation';

interface doctorType {
  doctor_crm: string;
}

class CreateRecipeService {
  async execute(
    recipeParams: IRecipeRequest & IMedicineArray & doctorType,
  ): Promise<Recipe> {
    const recipeRepository = getCustomRepository(RecipeRepository);

    await recipeCreateValidation(recipeParams);

    const recipe = await recipeRepository.createRecipe(recipeParams);

    return recipe;
  }
}

export default CreateRecipeService;
