import Doctor from '../entities/Doctor';
import { handleDoctorRecipe, RecipeResponse } from './recipesViews';

export interface DoctorResponse {
  id: string;
  crm: string;
  name: string;
  email: string;
  birth_date: Date;
  phone: string;
  recipes: RecipeResponse[];
}

export function handleDoctor(doctor: Doctor): DoctorResponse {
  const recipesFiltered = doctor.recipes.map(r => handleDoctorRecipe(r));

  return {
    id: doctor.id,
    crm: doctor.crm,
    name: doctor.name,
    email: doctor.email,
    birth_date: doctor.birth_date,
    phone: doctor.phone,
    recipes: recipesFiltered,
  };
}
