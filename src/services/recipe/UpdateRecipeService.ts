import { getCustomRepository, SimpleConsoleLogger } from 'typeorm';

import { recipeUpdateValidation } from '../../utils/recipeValidation';
import ApplicationErrors from '../../errors/ApplicationErrors';
import IRecipeRequest from '../../dto/IRecipeRequest';
import RecipeRepository from '../../repositories/implementations/RecipeRepository';
import MedicineRepository from '../../repositories/implementations/MedicineRepository';
import { IMedicineArray } from '../../dto/IMedicineRequest';

class UpdateRecipeService {
  async execute(recipeParams: IRecipeRequest & IMedicineArray): Promise<void> {
    const recipeRepository = getCustomRepository(RecipeRepository);
    const medicineRepository = getCustomRepository(MedicineRepository);

    await recipeUpdateValidation(recipeParams);

    // Verificar se a receita existe
    const recipeExists = await recipeRepository.findById(recipeParams.id);
    if (!recipeExists)
      throw new ApplicationErrors('Recipe does not exists', 401);

    // Verificar se o médico existe
    if (!(recipeExists.doctor.crm === recipeParams.doctor_crm))
      throw new ApplicationErrors('Doctor does not owns this recipe', 401);

    // Verificar se os remédios existem
    if (recipeParams.medicines.length > 0)
      recipeParams.medicines.map(async m => {
        const medicine = await medicineRepository.findByIdRegister(
          m.idRegister,
        );
        if (!medicine)
          throw new ApplicationErrors('Medicine does not exists', 401);
      });

    Object.keys(recipeParams).map(
      key => recipeParams[key] === undefined && delete recipeParams[key],
    );

    await recipeRepository.updateById(recipeParams);
  }
}

export default UpdateRecipeService;
