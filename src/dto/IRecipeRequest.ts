export default interface IRecipeRequest {
  validade: string;
  cpf_patient?: string;
  doctor_crm?: string;
  due: boolean;
  id?: string;
}
