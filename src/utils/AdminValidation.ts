import * as Yup from 'yup';
import { ValidationError } from 'yup';

import IAdminRequest from '../dto/IAdminRequest';

export async function AdminCreateValidation(
  objectPatient: IAdminRequest,
): Promise<void> {
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(6).max(25),
  });

  try {
    await schema.validate(objectPatient, { abortEarly: false });
  } catch (error) {
    throw new ValidationError(error);
  }
}
