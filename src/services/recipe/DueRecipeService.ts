import { getCustomRepository } from 'typeorm';

import { recipeUpdateValidation } from '../../utils/recipeValidation';
import ApplicationErrors from '../../errors/ApplicationErrors';
import IRecipeRequest from '../../dto/IRecipeRequest';
import RecipeRepository from '../../repositories/implementations/RecipeRepository';

class DueRecipeService {
  async execute(recipeParams: IRecipeRequest): Promise<void> {
    const recipeRepository = getCustomRepository(RecipeRepository);

    await recipeUpdateValidation(recipeParams);

    // Verificar se a receita existe
    const recipeExists = await recipeRepository.findById(recipeParams.id);
    if (!recipeExists)
      throw new ApplicationErrors('Recipe does not exists', 401);

    // Verificar se o médico existe
    if (!(recipeExists.doctor.crm === recipeParams.doctor_crm))
      throw new ApplicationErrors('Doctor does not owns this recipe', 401);

    await recipeRepository.dueRecipe(recipeParams);
  }
}

export default DueRecipeService;
