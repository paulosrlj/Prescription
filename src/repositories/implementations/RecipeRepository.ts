import { EntityRepository, Repository } from 'typeorm';

import IRecipe from '../../dto/IRecipeRequest';
import Recipe from '../../entities/Recipe';

@EntityRepository(Recipe)
class DoctorRepository extends Repository<Recipe> {
  async createRecipe({ validade }: IRecipe): Promise<Recipe> {
    const recipe = this.create({
      validade,
    });

    await this.save(recipe);

    return recipe;
  }
}

export default DoctorRepository;
