import { getCustomRepository, ObjectType } from 'typeorm';

import { recipeUpdateValidation } from '../../utils/recipeValidation';
import ApplicationErrors from '../../errors/ApplicationErrors';
import IRecipeRequest from '../../dto/IRecipeRequest';
import { IMedicineArray } from '../../dto/IMedicineRequest';
import { IRecipeRepository } from '../../repositories/IRecipeRepository';
import { IMedicineRepository } from '../../repositories/IMedicineRepository';

class UpdateRecipeService {
  RecipeRepository: IRecipeRepository;

  MedicineRepository: IMedicineRepository;

  constructor(
    RecipeRepository: IRecipeRepository,
    MedicineRepository: IMedicineRepository,
  ) {
    this.RecipeRepository = RecipeRepository;
    this.MedicineRepository = MedicineRepository;
  }

  async execute(recipeParams: IRecipeRequest & IMedicineArray): Promise<void> {
    const recipeRepository = getCustomRepository(
      this.RecipeRepository as unknown as ObjectType<IRecipeRepository>,
    );
    const medicineRepository = getCustomRepository(
      this.MedicineRepository as unknown as ObjectType<IMedicineRepository>,
    );

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
