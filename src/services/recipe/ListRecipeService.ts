import { getCustomRepository, ObjectType } from 'typeorm';
import Recipe from '../../entities/Recipe';
import ApplicationErrors from '../../errors/ApplicationErrors';

import { IRecipeRepository } from '../../repositories/IRecipeRepository';

class ListAllRecipeService {
  RecipeRepository: IRecipeRepository;

  constructor(RecipeRepository: IRecipeRepository) {
    this.RecipeRepository = RecipeRepository;
  }

  async execute(id: string): Promise<Recipe> {
    const recipeRepository = getCustomRepository(
      this.RecipeRepository as unknown as ObjectType<IRecipeRepository>,
    );

    const recipe = await recipeRepository.findById(id);
    if (!recipe) throw new ApplicationErrors('Recipe does not exists', 401);

    return recipe;
  }
}

export default ListAllRecipeService;
