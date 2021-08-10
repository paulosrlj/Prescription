import { getCustomRepository } from 'typeorm';
import Recipe from '../../entities/Recipe';
import ApplicationErrors from '../../errors/ApplicationErrors';

import RecipeRepository from '../../repositories/implementations/RecipeRepository';

class ListAllRecipeService {
  async execute(id: string): Promise<Recipe> {
    const recipeRepository = getCustomRepository(RecipeRepository);

    const recipe = await recipeRepository.findById(id);
    if (!recipe) throw new ApplicationErrors('Recipe does not exists', 401);

    return recipe;
  }
}

export default ListAllRecipeService;
