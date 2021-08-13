import { IMedicineArray } from '../dto/IMedicineRequest';
import IRecipeRequest from '../dto/IRecipeRequest';
import Recipe from '../entities/Recipe';

export interface IRecipeRepository {
  createRecipe({
    validade,
    cpf_patient,
    doctor_crm,
    medicines,
    due,
  }: IRecipeRequest & IMedicineArray): Promise<Recipe>;
  findAll(): Promise<Recipe[]>;
  findById(id: string): Promise<Recipe | undefined>;
  updateById(recipeParams: IRecipeRequest & IMedicineArray): Promise<void>;
  dueRecipe(recipeParams: IRecipeRequest): Promise<void>;
}
