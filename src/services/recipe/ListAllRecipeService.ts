import { getCustomRepository } from 'typeorm';
import Recipe from '../../entities/Recipe';

import RecipeRepository from '../../repositories/implementations/RecipeRepository';

class ListAllRecipeService {
  async execute(): Promise<Recipe[]> {
    const recipeRepository = getCustomRepository(RecipeRepository);

    const recipes = await recipeRepository.findAll();

    return recipes;
  }
}

export default ListAllRecipeService;
