import Doctor from '../entities/Doctor';
import Recipe from '../entities/Recipe';

export interface DoctorResponse {
  id: string;
  crm: string;
  name: string;
  email: string;
  birth_date: Date;
  phone: string;
  recipes: Recipe[];
}

export function handleDoctor(doctor: Doctor): DoctorResponse {
  return {
    id: doctor.id,
    crm: doctor.crm,
    name: doctor.name,
    email: doctor.email,
    birth_date: doctor.birth_date,
    phone: doctor.phone,
    recipes: doctor.recipes,
  };
}
