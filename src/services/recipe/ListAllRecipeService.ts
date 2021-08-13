import { getCustomRepository, ObjectType } from 'typeorm';
import Recipe from '../../entities/Recipe';

import { IRecipeRepository } from '../../repositories/IRecipeRepository';

class ListAllRecipeService {
  RecipeRepository: IRecipeRepository;

  constructor(RecipeRepository: IRecipeRepository) {
    this.RecipeRepository = RecipeRepository;
  }

  async execute(): Promise<Recipe[]> {
    const recipeRepository = getCustomRepository(
      this.RecipeRepository as unknown as ObjectType<IRecipeRepository>,
    );

    const recipes = await recipeRepository.findAll();

    return recipes;
  }
}

export default ListAllRecipeService;
