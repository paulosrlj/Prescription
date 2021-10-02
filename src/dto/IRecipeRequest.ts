import Image from '../entities/Image';

export default interface IRecipeRequest {
  illness_name?: string;
  validade?: string;
  cpf_patient?: string;
  doctor_crm?: string;
  due?: boolean;
  id?: string;
  images?: Image[];
}
