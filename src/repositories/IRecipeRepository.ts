import { IMedicineArray } from '../dto/IMedicineRequest';
import IRecipeRequest from '../dto/IRecipeRequest';
import Recipe from '../entities/Recipe';

export interface IRecipeRepository {
  createRecipe(recipeParams: IRecipeRequest & IMedicineArray): Promise<Recipe>;
  findAll(): Promise<Recipe[]>;
  findById(id: string): Promise<Recipe | undefined>;
  findPatientRecipes(cpf: string): Promise<Recipe[]>;
  updateById(recipeParams: IRecipeRequest & IMedicineArray): Promise<void>;
  dueRecipe(recipeParams: IRecipeRequest): Promise<void>;
}
