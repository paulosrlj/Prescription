import * as Yup from 'yup';
import { ValidationError } from 'yup';

import IPatientRequest from '../dto/IPatientRequest';

export async function patientValidation(
  objectPatient: IPatientRequest,
): Promise<void> {
  const schema = Yup.object().shape({
    cpf: Yup.string().required(),
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6).max(25),
    phone: Yup.string().required(),
    birthDate: Yup.date().required(),
  });

  try {
    await schema.validate(objectPatient, { abortEarly: false });
  } catch (error) {
    throw new ValidationError(error);
  }
}
