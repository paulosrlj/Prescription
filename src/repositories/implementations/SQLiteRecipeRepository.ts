import { EntityRepository, getCustomRepository, Repository } from 'typeorm';

import IRecipeRequest from '../../dto/IRecipeRequest';
import { IMedicineArray, IMedicineType } from '../../dto/IMedicineRequest';

import Recipe from '../../entities/Recipe';

import SQLiteDoctorRepository from './SQLiteDoctorRepository';
import SQLiteMedicineRepository from './SQLiteMedicineRepository';
import PatientRepository from './SQLitePatientRepository';
import ApplicationErrors from '../../errors/ApplicationErrors';
import SQLiteCardRepository from './SQLiteCardRepository';
import { IRecipeRepository } from '../IRecipeRepository';
import SQLImageRepository from './SQLiteImageRepository';
import Card from '../../entities/Card';
import Doctor from '../../entities/Doctor';
import Image from '../../entities/Image';

export interface ResponseType {
  medicines: IMedicineType[];
  id: string;
  illness_name: string;
  validade: Date;
  due: boolean;
  card: Card;
  doctor: Doctor;
  created_at: Date;
  updated_at: Date;
  images: Image[];
}

@EntityRepository(Recipe)
class SQLiteRecipeRepository
  extends Repository<Recipe>
  implements IRecipeRepository
{
  async createRecipe(
    recipeParams: IRecipeRequest & IMedicineArray,
  ): Promise<ResponseType> {
    // Buscar o paciente e cartão do paciente
    const {
      cpf_patient,
      doctor_crm,
      medicines,
      validade,
      due,
      images,
      illness_name,
    } = recipeParams;

    const patientRepository = getCustomRepository(PatientRepository);
    const cardRepository = getCustomRepository(SQLiteCardRepository);
    const patient = await patientRepository.findByCpf(cpf_patient);

    if (!patient) throw new ApplicationErrors('Patient does not exists', 401);
    const { card } = patient;
    card.quantidade_receitas += 1;

    // Buscar o médico
    const doctorRepository = getCustomRepository(SQLiteDoctorRepository);
    const doctor = await doctorRepository.findByCrm(doctor_crm || '');
    if (!doctor) throw new ApplicationErrors('Doctor does not exists', 401);

    // Criar a receita
    const recipe = this.create({
      illness_name,
      card,
      validade,
      doctor,
      due,
    });

    const imageRepository = getCustomRepository(SQLImageRepository);
    recipe.images = [];
    // adicionar imagens na receita
    if (images) {
      await Promise.all(
        images.map(async i => {
          const image = await imageRepository.findById(i.id);

          if (!image) throw new ApplicationErrors('Image does not exists', 401);

          recipe.images.push(image);
        }),
      );
    }

    await this.save(recipe);
    await cardRepository.save(card);

    // Buscar e adicionar os remédios
    const medicineRepository = getCustomRepository(SQLiteMedicineRepository);

    await Promise.all(
      medicines.map(async m => {
        // Buscar o remédio
        const medicine = await medicineRepository.findByIdRegister(
          m.idRegister,
        );
        if (!medicine)
          throw new ApplicationErrors('Medicine does not exists', 401);

        await this.query(
          'INSERT INTO recipe_medicine (id, recipeId, medicineIdRegister, dosagem) VALUES (?,?,?,?)',
          [new Date().getTime().toString(), recipe.id, m.idRegister, m.dosagem],
        );
      }),
    );

    return { ...recipe, medicines: [...medicines] };
  }

  async findAll(): Promise<Recipe[]> {
    return this.find({
      relations: ['doctor', 'images', 'card'],
    });
  }

  async findById(id: string): Promise<Recipe> {
    return this.findOne(id, {
      select: ['id', 'validade', 'due'],
      relations: ['card', 'doctor', 'images'],
    });
  }

  async findPatientRecipes(cpf: string): Promise<Recipe[]> {
    const patientRepository = getCustomRepository(PatientRepository);
    const cardRepository = getCustomRepository(SQLiteCardRepository);
    const patient = await patientRepository.findByCpf(cpf);
    const card = await cardRepository.findById(patient.card.id);

    if (!patient) throw new ApplicationErrors('Patient does not exists', 401);

    const recipes = await this.findAll();

    const newRecipes = Promise.all(
      recipes.map(async r => {
        const m = await this.query(
          `SELECT M.id, M.nome, RM.dosagem FROM
        recipe_medicine RM JOIN medicines M ON RM.medicineIdRegister = M.idRegister WHERE RM.recipeId = ? `,
          [r.id],
        );

        return { ...r, medicines: [...m] };
      }),
    );

    return (await newRecipes).filter(r => r.card.id === card.id);
  }

  async updateById(
    recipeParams: IRecipeRequest & IMedicineArray,
  ): Promise<void> {
    const { id } = recipeParams;
    delete recipeParams.doctor_crm;
    delete recipeParams.id;
    delete recipeParams.images;

    await this.update({ id }, recipeParams);
  }

  async dueRecipe(recipeParams: IRecipeRequest): Promise<void> {
    const recipe = await this.findById(recipeParams.id);
    recipe.due = recipeParams.due;

    await this.save(recipe);
  }
}

export default SQLiteRecipeRepository;
