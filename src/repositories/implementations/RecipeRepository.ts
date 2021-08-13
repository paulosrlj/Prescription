import { EntityRepository, getCustomRepository, Repository } from 'typeorm';

import IRecipeRequest from '../../dto/IRecipeRequest';
import { IMedicineArray } from '../../dto/IMedicineRequest';

import Recipe from '../../entities/Recipe';
import DoctorRepository from './DoctorRepository';
import MedicineRepository from './MedicineRepository';
import PatientRepository from './SQLitePatientRepository';
import ApplicationErrors from '../../errors/ApplicationErrors';
import CardRepository from './CardRepository';

@EntityRepository(Recipe)
class RecipeRepository extends Repository<Recipe> {
  async createRecipe({
    validade,
    cpf_patient,
    doctor_crm,
    medicines,
    due,
  }: IRecipeRequest & IMedicineArray): Promise<Recipe> {
    // Buscar o paciente e cartão do paciente
    const patientRepository = getCustomRepository(PatientRepository);
    const cardRepository = getCustomRepository(CardRepository);
    const patient = await patientRepository.findByCpf(cpf_patient);

    if (!patient) throw new ApplicationErrors('Patient does not exists', 401);
    const { card } = patient;
    card.quantidade_receitas += 1;

    // Buscar o médico
    const doctorRepository = getCustomRepository(DoctorRepository);
    const doctor = await doctorRepository.findByCrm(doctor_crm || '');
    if (!doctor) throw new ApplicationErrors('Doctor does not exists', 401);

    // Criar a receita
    const recipe = this.create({ card, validade, doctor, medicines: [], due });

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
    await cardRepository.save(card);
    return recipe;
  }

  async findAll(): Promise<Recipe[]> {
    return this.find({
      select: ['id', 'validade', 'due'],
      relations: ['medicines', 'doctor'],
    });
  }

  async findById(id: string): Promise<Recipe> {
    return this.findOne(id, {
      select: ['id', 'validade', 'due'],
      relations: ['card', 'medicines', 'doctor'],
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

  async dueRecipe(recipeParams: IRecipeRequest): Promise<void> {
    const recipe = await this.findById(recipeParams.id);
    recipe.due = recipeParams.due;

    await this.save(recipe);
  }
}

export default RecipeRepository;
