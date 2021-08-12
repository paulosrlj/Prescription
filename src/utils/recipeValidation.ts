import * as Yup from 'yup';
import { ValidationError } from 'yup';

import IRecipeRequest from '../dto/IRecipeRequest';

export async function recipeCreateValidation(
  objectRecipe: IRecipeRequest,
): Promise<void> {
  const schema = Yup.object().shape({
    cpf_patient: Yup.string().required(),
    validade: Yup.date()
      .required()
      .min(new Date().toLocaleDateString())
      .max(new Date('2099-12-31')),
    medicines_array: Yup.array().of(
      Yup.object().shape({
        dosagem: Yup.string().required(),
        idRegister: Yup.string().required(),
      }),
    ),
    doctor_crm: Yup.string().required().min(6).max(25),
    due: Yup.boolean().required(),
  });

  try {
    await schema.validate(objectRecipe, { abortEarly: false });
  } catch (error) {
    throw new ValidationError(error);
  }
}

export async function recipeUpdateValidation(
  objectRecipe: IRecipeRequest,
): Promise<void> {
  const schema = Yup.object().shape({
    validade: Yup.date()
      .min(new Date().toLocaleDateString())
      .max(new Date('2099-12-31')),
    medicines_array: Yup.array().of(
      Yup.object().shape({
        dosagem: Yup.string(),
        idRegister: Yup.string(),
      }),
    ),
    doctor_crm: Yup.string().required().min(6).max(25),
    due: Yup.boolean(),
  });

  try {
    await schema.validate(objectRecipe, { abortEarly: false });
  } catch (error) {
    throw new ValidationError(error);
  }
}
