import { getCustomRepository } from 'typeorm';

import RecipeRepository from '../../repositories/implementations/RecipeRepository';
import IRecipeRequest from '../../dto/IRecipeRequest';
import Recipe from '../../entities/Recipe';
import { IMedicineArray } from '../../dto/IMedicineRequest';

class CreateRecipeService {
  async execute({
    cpf_patient,
    validade,
    doctor_crm,
    medicines_array,
  }: IRecipeRequest & IMedicineArray): Promise<Recipe> {
    const recipeRepository = getCustomRepository(RecipeRepository);

    const recipe = await recipeRepository.createRecipe({
      cpf_patient,
      validade,
      doctor_crm,
      medicines_array,
    });

    return recipe;
  }
}

export default CreateRecipeService;
