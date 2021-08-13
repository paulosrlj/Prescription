import { EntityRepository, getCustomRepository, Repository } from 'typeorm';

import IRecipeRequest from '../../dto/IRecipeRequest';
import { IMedicineArray } from '../../dto/IMedicineRequest';

import Recipe from '../../entities/Recipe';
import DoctorRepository from './DoctorRepository';
import MedicineRepository from './MedicineRepository';
import PatientRepository from './PatientRepository';
import ApplicationErrors from '../../errors/ApplicationErrors';

@EntityRepository(Recipe)
class RecipeRepository extends Repository<Recipe> {
  async createRecipe(
    recipeParams: IRecipeRequest & IMedicineArray,
  ): Promise<Recipe> {
    const { cpf_patient, doctor_crm, medicines } = recipeParams;

    // Buscar o paciente e cartão do paciente
    const patientRepository = getCustomRepository(PatientRepository);
    const patient = await patientRepository.findByCpf(cpf_patient);

    if (!patient) throw new ApplicationErrors('Patient does not exists', 401);
    const { card } = patient;

    // Buscar o médico
    const doctorRepository = getCustomRepository(DoctorRepository);
    const doctor = await doctorRepository.findByCrm(doctor_crm || '');
    if (!doctor) throw new ApplicationErrors('Doctor does not exists', 401);

    // Criar a receita
    const recipe = this.create(recipeParams);

    // Buscar e adicionar os remédios
    const medicineRepository = getCustomRepository(MedicineRepository);

    medicines.map(async m => {
      // Buscar o remédio
      const medicine = await medicineRepository.findByIdRegister(m.idRegister);
      if (!medicine)
        throw new ApplicationErrors('Medicine does not exists', 401);

      medicine.dosagem = m.dosagem;
      recipe.medicines.push(medicine);
    });

    await this.save(recipe);

    return recipe;
  }

  async findAll(): Promise<Recipe[]> {
    return this.find({
      select: ['id', 'validade', 'due'],
      relations: ['medicines', 'doctor', 'imagesPath'],
    });
  }

  async findById(id: string): Promise<Recipe> {
    return this.findOne(id, {
      select: ['id', 'validade', 'due'],
      relations: ['card', 'medicines', 'doctor', 'imagesPath'],
    });
  }

  async updateById(
    recipeParams: IRecipeRequest & IMedicineArray,
  ): Promise<void> {
    const { id } = recipeParams;
    delete recipeParams.doctor_crm;
    delete recipeParams.id;

    await this.update({ id }, recipeParams);
  }
}

export default RecipeRepository;
