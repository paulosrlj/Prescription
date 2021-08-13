export default interface IMedicine {
  idRegister: string;
  nome?: string;
  categoria?: string;
  classe_terapeutica?: string;
  empresa_detentora?: string;
  dosagem?: string;
}

export interface IMedicineType {
  idRegister: string;
  dosagem: string;
}
export interface IMedicineArray {
  medicines: Array<IMedicineType>;
}
