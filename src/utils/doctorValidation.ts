import * as Yup from 'yup';
import { ValidationError } from 'yup';

import IDoctorRequest from '../dto/IDoctorRequest';

export async function doctorCreateValidation(
  objectDoctor: IDoctorRequest,
): Promise<void> {
  const schema = Yup.object().shape({
    crm: Yup.string().required(),
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6).max(25),
    phone: Yup.string().required(),
    birthDate: Yup.date().required(),
  });

  try {
    await schema.validate(objectDoctor, { abortEarly: false });
  } catch (error) {
    throw new ValidationError(error);
  }
}

export async function doctorUpdateValidation(
  objectDoctor: IDoctorRequest,
): Promise<void> {
  const schema = Yup.object().shape({
    crm: Yup.string().required(),
    name: Yup.string(),
    email: Yup.string().email(),
    password: Yup.string().min(6).max(25),
    phone: Yup.string(),
    birthDate: Yup.date(),
  });

  try {
    await schema.validate(objectDoctor, { abortEarly: false });
  } catch (error) {
    throw new ValidationError(error);
  }
}
