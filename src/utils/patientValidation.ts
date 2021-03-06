import * as Yup from 'yup';
import { ValidationError } from 'yup';

import IPatientRequest from '../dto/IPatientRequest';

export async function patientCreateValidation(
  objectPatient: IPatientRequest,
): Promise<void> {
  const schema = Yup.object().shape({
    cpf: Yup.string().min(11).max(11).required(),
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(6).max(25).required(),
    phone: Yup.string().required(),
    birth_date: Yup.date().required(),
  });

  try {
    await schema.validate(objectPatient, { abortEarly: false });
  } catch (error) {
    throw new ValidationError(error);
  }
}

export async function patientUpdateValidation(
  objectPatient: IPatientRequest,
): Promise<void> {
  const schema = Yup.object().shape({
    cpf: Yup.string().required(),
    name: Yup.string(),
    email: Yup.string().email(),
    password: Yup.string().min(6).max(25),
    phone: Yup.string(),
    birthDate: Yup.date(),
  });

  try {
    await schema.validate(objectPatient, { abortEarly: false });
  } catch (error) {
    throw new ValidationError(error);
  }
}
