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
  async createRecipe({
    validade,
    cpf_patient,
    doctor_crm,
    medicines_array,
  }: IRecipeRequest & IMedicineArray): Promise<Recipe> {
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
    const recipe = this.create({ card, validade, doctor, medicines: [] });

    // Buscar e adicionar os remédios
    const medicineRepository = getCustomRepository(MedicineRepository);

    medicines_array.map(async m => {
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
      select: ['id', 'validade'],
      relations: ['medicines', 'doctor'],
    });
  }

  async findById(id: string): Promise<Recipe> {
    return this.findOne(id, {
      select: ['id', 'validade'],
      relations: ['medicines', 'doctor'],
    });
  }
}

export default RecipeRepository;
