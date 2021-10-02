import { getCustomRepository, ObjectType } from 'typeorm';
import Recipe from '../../entities/Recipe';
import ApplicationErrors from '../../errors/ApplicationErrors';

import { IRecipeRepository } from '../../repositories/IRecipeRepository';

class ListPatientRecipes {
  RecipeRepository: IRecipeRepository;

  constructor(RecipeRepository: IRecipeRepository) {
    this.RecipeRepository = RecipeRepository;
  }

  async execute(cpf: string): Promise<Recipe[]> {
    const recipeRepository = getCustomRepository(
      this.RecipeRepository as unknown as ObjectType<IRecipeRepository>,
    );

    const recipes = await recipeRepository.findPatientRecipes(cpf);
    if (!recipes) throw new ApplicationErrors('There is no recipes', 401);
    return recipes;
  }
}

export default ListPatientRecipes;
