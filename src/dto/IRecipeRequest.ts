export default interface IRecipeRequest {
  validade: Date;
  cpf_patient: string;
  doctor_crm?: string;
  due: boolean;
}
