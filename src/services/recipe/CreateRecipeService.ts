import { getCustomRepository, ObjectType } from 'typeorm';

import IRecipeRequest from '../../dto/IRecipeRequest';
import Recipe from '../../entities/Recipe';
import { IMedicineArray } from '../../dto/IMedicineRequest';
import { recipeCreateValidation } from '../../utils/recipeValidation';
import { IRecipeRepository } from '../../repositories/IRecipeRepository';

class CreateRecipeService {
  RecipeRepository: IRecipeRepository;

  constructor(RecipeRepository: IRecipeRepository) {
    this.RecipeRepository = RecipeRepository;
  }

  async execute(
    recipeParams: IRecipeRequest & IMedicineArray,
  ): Promise<Recipe> {
    const recipeRepository = getCustomRepository(
      this.RecipeRepository as unknown as ObjectType<IRecipeRepository>,
    );

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
