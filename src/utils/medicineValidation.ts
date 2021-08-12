import * as Yup from 'yup';
import { ValidationError } from 'yup';

import IMedicine from '../dto/IMedicineRequest';

export async function medicineCreateValidation(
  objectMedicine: IMedicine,
): Promise<void> {
  const schema = Yup.object().shape({
    idRegister: Yup.string().required(),
    nome: Yup.string().required(),
    categoria: Yup.boolean().required(),
    classe_terapeutica: Yup.string().required(),
    empresa_detentora: Yup.string().required(),
  });

  try {
    await schema.validate(objectMedicine, { abortEarly: false });
  } catch (error) {
    throw new ValidationError(error);
  }
}
